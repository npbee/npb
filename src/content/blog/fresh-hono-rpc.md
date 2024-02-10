---
title: Fresh with a Type-safe Hono API
date: 2024-02-10
description: Create a type-safe API with Fresh and Hono’s rpc
---

[Fresh](https://fresh.deno.dev/) is a full-stack framework from [Deno](https://deno.com/). Because it’s full-stack, you can build API endpoints directly into the framework using [custom handlers](https://fresh.deno.dev/docs/getting-started/custom-handlers).

```ts
// routes/api/random-uuid.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req) {
    const uuid = crypto.randomUUID();
    return new Response(JSON.stringify(uuid), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
```

The `/api/random-uuid` route is now a JSON endpoint exposed with your app. No need to set up a separate service for your API application.

There have been times, though, that I’ve wanted a bit more separation between my web and API surfaces. Recently I found [this](https://github.com/Rykuno/fullstack-example) repository that shows using Hono within a SvelteKit app and it seemed like exactly what I was looking for. Since Fresh, like SvelteKit, operates on `Request` and `Response` primitives, we should be able to achieve something similar. Let’s try!

Example repo set up [here](https://github.com/npbee/fresh-hono-rpc).

## Setup

Start with a bare Fresh app:

```sh
deno run -A -r https://fresh.deno.dev
```

In an `api` directory, we can stub out a basic Hono app following their [documentation](https://hono.dev/guides/rpc#using-with-larger-applications):

```ts
// api/mod.ts
import { Hono } from "npm:hono";

const booksApp = new Hono()
  .get("/", (c) => c.json("list books"))
  .post("/", (c) => c.json("create a book", 201))
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export const app = new Hono();

const routes = app.route("/books", booksApp);
export type AppType = typeof routes;
```

On its own, this won’t do anything yet because Fresh doesn’t know about it. In order to make use of this Hono app, we have to set up a route in the `routes` directory. In our case, we want _all_ routes on the `/api` path to be routed to our Hono app. We can do that with a wildcard route:

```ts
// routes/api/[...all].ts
import { app } from "@/api/mod.ts";

export const handler = (req: Request) => app.fetch(req);
```

> P.S. You can get the fancy `@/api/mod.ts` import paths with an import alias in your `deno.json` like `”@/“: “./“`

Now, every `/api` route will route back to our Hono app. Except it’s not quite working yet. If you start your Fresh app and try to hit `/api/books` you’ll get a 404. That’s because Hono doesn’t know about the `/api` segment in the path. We can adjust our Hono app with a base path to fix this:

```ts
// api/mod.ts
// ...

export const app = new Hono().basePath("/api");

// ...
```

Now when you go to `/api/books` you should get back a response from your Hono app!

This by itself is neat. You could stop right here and have a Hono-powered API app within Fresh.

## Using Your Own API

If we were building an API-first application, we might want to bake in most of our business logic into the API itself and have our web app use the API for CRUD actions. In this sense, our Fresh web routes will be a client of our Hono API app. We can use Hono’s [RPC](https://hono.dev/guides/rpc) guide to make this type safe.

We can start by making a client:

```ts
// api/mod.ts
import { hc } from "npm:hono/client";

// ...

// We need to pass a full URL here.
export const client = hc<AppType>("http://localhost:8000");
```

One snag you’ll notice is that we need to pass the full URL of our application. We’ll come back to that in a minute.

In our root route, we can now use our client:

```tsx
// routes/index.tsx
import { client } from "@/api/mod.ts";

export default async function Home() {
  const bookResponse = await client.api.books.$get();
  const json = await bookResponse.json();
  return <pre>{json}</pre>;
}
```

Notice that you get type hints with the client:

![TypeScript LSP type hints with a Hono client](/posts/fresh-hono-client-types.png)

This is nice, but we can improve it. One thing to realize with this setup is that we’re actually making _two_ HTTP calls: one to `/` and another to `/api/books`. We can prove that with a quick logging middleware:

```ts
// routes/_middleware.ts
import { Handler } from "$fresh/server.ts";

export const handler: Array<Handler> = [loggingMiddleware()];

function loggingMiddleware(): Handler {
  return (req, ctx) => {
    if (ctx.destination !== "route") {
      return ctx.next();
    }
    console.log(`${req.method}  ${req.url}`);
    return ctx.next();
  };
}
```

When loading the root route in the browser, you will see two HTTP calls:

```sh
 🍋 Fresh ready
    Local: http://localhost:8000/

GET  http://localhost:8000/
GET  http://localhost:8000/api/books
```

This is not a huge deal, but since we’re on the same server it feels a little unnecessary because we can just call our route handler directly. If you’re using SvelteKit, you get a `fetch` [helper](https://kit.svelte.dev/docs/load#making-fetch-requests) that does this for you. And if you’ve ever tried to call your own API route on Deno Deploy, you may be met with with a `Loop Detected` [error](https://github.com/denoland/deploy_feedback/issues/187).

As a workaround for the above Deno Deploy issue and a general performance improvement, we can wire up our Hono client to have a custom `fetch` handler. To do that, we’ll turn our `client` into a `createClient` function.

```ts
// api/mod.ts
import { ClientRequestOptions, Hono } from "npm:hono";
//...

export function createClient(url: string, options?: ClientRequestOptions) {
  return hc<AppType>(url, options);
}
```

We’ll pass in the `url` here to avoid hard-coding. Back in our root route, we can set up the client like so:

```tsx
import { createClient } from "@/api/mod.ts";
import { handler } from "@/routes/api/[...all].ts";

export default async function Home() {
  const client = createClient("http://localhost:8000", {
    fetch: (...params: Parameters<typeof fetch>) => {
      const req = new Request(...params);
      return handler(req);
    },
  });
  const bookResponse = await client.api.books.$get();
  const json = await bookResponse.json();
  return <pre>{json}</pre>;
}
```

Now you should just see a single HTTP request when loading the root route because we are calling the API handler directly instead of fetching:

```sh
 🍋 Fresh ready
    Local: http://localhost:8000/

GET  http://localhost:8000/
```

To avoid setting up the client each time, you probably want to move that into a function:

```ts
// lib/api.ts
import { createClient } from "@/api/mod.ts";
import { handler } from "@/routes/api/[...all].ts";

const client = createClient("http://localhost:8000", {
  fetch: (...params: Parameters<typeof fetch>) => {
    const req = new Request(...params);
    return handler(req);
  },
});

export const api = client.api;
```

```tsx
// routes/index.tsx
import { api } from "@/lib/api.ts";

export default async function Home() {
  const bookResponse = await api.books.$get();
  const json = await bookResponse.json();
  return <pre>{json}</pre>;
}
```

## Closing Thoughts

I think this is a pretty neat pattern. One caveat here is that calling the route handler directly **will not** execute any Fresh middleware you have set up for the `api` directory. All middleware logic for the API would have to be moved to Hono. And generally, I’d want to keep an eye on any hidden couplings between Fresh and Hono since they are only superficially separated here. I wouldn’t want to go to split out my Hono app later and realize I was relying on a specific header or request parameter coming from Fresh.

Thanks for reading!
