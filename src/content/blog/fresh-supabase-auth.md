---
title: Supabase Auth with Deno Fresh
date: 2024-01-05
description: Using Supabase's new SSR auth with Deno's Fresh framework
---

Supabase recently released an updated package for handling authentication outside of client-only environments. Most of the docs are geared around popular full-stack frameworks like NextJS or Remix, so I thought I’d try out setting up in [Fresh](https://fresh.deno.dev/). Turns out, it works pretty well!

> Disclaimer - I’m fairly new to both Supabase and Fresh.

I've set up an example repo [here](https://github.com/npbee/fresh-supabase-auth).

## Setup Supabase

You’ll need to set up a [Supabase](https://supabase.com/) project to get started. Alternatively, you can set up the [CLI](https://supabase.com/docs/guides/cli) for local development which will spin up a local Supabase project in a Docker container.

If you are using local development, you’ll need to update the `supabase/config.toml` file to contain the correct URLs. Here’s an example with Fresh’s defaults:

```toml
[auth]
enabled = true
# ...

# HERE -> Update to match Fresh's localhost URL
site_url = "http://127.0.0.1:8000"

# ...

[auth.email]
# ...

# Here -> Set this to `true` to use the PKCE flow locally
enable_confirmations = true

```

You’ll also need to make sure your `.env` file has the correct key values:

```sh
# .env
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
```

## Grab the NPM packages

Since Deno can run npm packages now, we can put those in our `deno.json` file like so:

```jsonc
{
  // ...
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@1.6.1/",
    // ...
    "@supabase/ssr": "npm:@supabase/ssr",
    "@supabase/supabase-js": "npm:@supabase/supabase-js"
  }
  // ...
}
```

## Fresh Plugin

I found it cleanest to set up a Fresh [plugin](https://fresh.deno.dev/docs/concepts/plugins) called `auth.ts` to contain every related to auth. It’s primarily middleware involved, so there is flexibility in how this is setup.

```ts
// plugins/auth.ts
import type { Plugin } from "$fresh/server.ts";

export const authPlugin: Plugin = {
  name: "auth",
  middlewares: [
    // Coming up...
  ],
};
```

Add the plugin to your Fresh config:

```ts
import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { authPlugin } from "./plugins/auth.ts";

// Set up some types we'll reference later
export type SignedInState = {
  session: Session;
};

export type SignedOutState = {
  session?: null;
};

export type AuthState = SignedInState | SignedOutState;

export default defineConfig({
  plugins: [authPlugin, tailwind()],
});
```

## Set up the client

The Supabase client will be a “server” client specifically for handling cookie-based authentication. It works with standard `Request` and `Response` objects. It took me a minute to wrap my head around how it works, but the gist is that you pass it `Request` and `Response` objects and the client will update the `Response` you passed with the necessary cookies for authentication. You can then use that response to render the page.

```ts
// plugins/auth.ts
import type { FreshContext, Plugin } from "$fresh/server.ts";
import { createServerClient, parse, serialize } from "@supabase/ssr";
import { assert } from "$std/assert/assert.ts";

export function createSupabaseClient(req: Request, resp: Response) {
  const cookies = parse(req.headers.get("Cookie") || "");

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

  assert(SUPABASE_URL, "SUPABASE_URL is not set");
  assert(ANON_KEY, "SUPABASE_ANON_KEY is not set");

  return createServerClient(SUPABASE_URL, ANON_KEY, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        const cookie = serialize(key, value, options);
        // If the cookie is updated, update the cookies for the response
        resp.headers.append("Set-Cookie", cookie);
      },
      remove(key, options) {
        const cookie = serialize(key, "", options);
        // If the cookie is removed, update the cookies for the response
        resp.headers.append("Set-Cookie", cookie);
      },
    },
  });
}
```

## Set up session refresh

There needs to be a middleware that runs on every request to ensure the session is in the correct state.

```ts
// plugins/auth.ts
import type { Plugin } from "$fresh/server.ts";

export const authPlugin: Plugin = {
  name: "auth",
  middlewares: [
    // For every route, we ensure the session state is updated
    {
      path: "/",
      middleware: {
        handler: setSessionState,
      },
    },
  ],
};
```

The middleware handler is a little goofy because we have to set up an empty `Response` object that the Supabase client will attach cookies to and then copy over those cookies to the real `Response`. We do this because we don’t want to call `await ctx.next()` before we’ve updated the session state.

```ts
// ...

async function setSessionState(req: Request, ctx: FreshContext) {
  if (ctx.destination !== "route") return await ctx.next();

  // Sanity check - start without a session
  ctx.state.session = null;

  // Create an empty response object here. We want to make sure we do this
  // session refresh before going further down the middleware chain
  const resp = new Response();
  const supabase = createSupabaseClient(req, resp);

  // Refresh session if expired
  const { data } = await supabase.auth.getSession();

  // Stash this on context for later...
  ctx.state.session = data.session;

  // Continue down the middleware chain
  const nextResp = await ctx.next();

  // Copy over any headers that were added by Supabase
  for (const [key, value] of resp.headers) {
    nextResp.headers.set(key, value);
  }

  return nextResp;
}
```

## Guard Protected Routes

Now that we have an accurate session state, we can start guarding any routes we want to be logged in. We can set up another middleware for a `/dashboard` route:

```ts
// plugins/auth.ts

// A little helper for redirects. We will write this a lot...
import { redirect } from "../utils.ts";

// ...

export const authPlugin: Plugin = {
  name: "auth",
  middlewares: [
    // ...

    // For the dashboard route, we ensure the user is signed in
    {
      path: "/dashboard",
      middleware: {
        handler: ensureSignedIn,
      },
    },
  ],
};

function ensureSignedIn(_req: Request, ctx: FreshContext) {
  if (!ctx.state.session) {
    return redirect(
      "/auth/signin?message=You must be signed in to access this page",
    );
  }

  return ctx.next();
}
```

## Dashboard Route

Let’s set up the `/dashboard` route so we have a place to land authenticated users.

```tsx
// routes/dashboard/index.tsx
import { FreshContext } from "$fresh/server.ts";
import { Container } from "../../components/Container.tsx";
import { SignedInState } from "../../plugins/auth.ts";

// Make this an `async` function so we can get the full context
export default async function DashboardPage(
  _req: Request,
  ctx: FreshContext<SignedInState>,
) {
  const { session } = ctx.state;
  const { user } = session;
  return (
    <Container>
      <h1 class="text-xl">Dashboard</h1>
      <p>Hello, {user.email}</p>
    </Container>
  );
}
```

## Sign up

For signing up users we will use the PKCE flow described [here](https://supabase.com/blog/supabase-auth-sso-pkce). This will send a link to a user’s email that will send them back to our app and exchange a one-time code for a session.

Let’s first set up the callback route users will land on from their email:

```tsx
import { Handlers } from "$fresh/server.ts";
import { redirect } from "../../utils.ts";
import { createSupabaseClient } from "../../plugins/auth.ts";

export const handler: Handlers = {
  async GET(req) {
    const requestUrl = new URL(req.url);
    // Set up a successful response
    const resp = redirect("/dashboard");
    const code = requestUrl.searchParams.get("code");
    const supabase = createSupabaseClient(req, resp);

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }

    return resp;
  },
};
```

Now we can set up a sign up page:

```tsx
// routes/auth/signup.tsx
import { Handlers } from "$fresh/server.ts";
import { assert } from "$std/assert/assert.ts";
import { createSupabaseClient } from "../../plugins/auth.ts";

export const handler: Handlers = {
  async POST(req) {
    // Set up the response we want to return if successful
    const resp = new Response(null, {
      headers: {
        location: "/auth/signup?message=Check your email for the sign in link",
      },
      status: 303,
    });

    // Do whatever we need to grab the login details
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    assert(email, "email is required");
    assert(password, "password is required");

    // Setup the supabase client
    const supabase = createSupabaseClient(req, resp);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: new URL("/auth/callback", req.url).toString(),
      },
    });

    if (error) {
      return new Response(null, {
        headers: { location: "/auth/signup?message=Could not sign up" },
      });
    }

    // Return the response. Supabase client will have added cookies
    return resp;
  },
};

export default function Page(req: Request) {
  const message = new URL(req.url).searchParams.get("message");
  return (
    <div>
      <form method="post">
        <label for="email">Email</label>
        <input id="email" type="email" name="email" />

        <label for="password">Password</label>
        <input id="password" type="password" name="password" />

        <button type="submit">Sign up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
```

If you’re using local Supabase development, you should see an email in your “Inbucket” that looks like this:

![Image of the local development inbox ](/posts/inbucket.png)

## Sign In

The sign in page will look similar:

```tsx
// routes/auth/signin.tsx
import { Handlers } from "$fresh/server.ts";
import { assert } from "$std/assert/assert.ts";
import { createSupabaseClient } from "../../plugins/auth.ts";
import { redirect } from "../../utils.ts";

export const handler: Handlers = {
  async POST(req) {
    const resp = redirect("/dashboard");
    const supabase = createSupabaseClient(req, resp);
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    assert(email, "email is required");
    assert(password, "password is required");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/auth/signin?message=Error signing up");
    }

    return resp;
  },
};

export default function Page(req: Request) {
  const message = new URL(req.url).searchParams.get("message");

  return (
    <div>
      <h1>Sign in</h1>
      <form method="post">
        <label for="email">Email</label>
        <input id="email" type="email" name="email" />

        <label for="password">Password</label>
        <input id="password" type="password" name="password" />

        <button type="submit">Sign in</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
```

## Sign out

Sign out is even simpler:

```tsx
import { Handlers } from "$fresh/server.ts";
import { createSupabaseClient } from "../../plugins/auth.ts";
import { redirect } from "../../utils.ts";

export const handler: Handlers = {
  async GET(req) {
    const resp = redirect("/auth/signin");
    const supabase = createSupabaseClient(req, resp);

    await supabase.auth.signOut();

    return resp;
  },
};
```

## Summing Up

If everything worked out, you should be able sign up/out/in users and get to a dashboard page that looks like this:

![Image of a logged-in dashboard page](/posts/dashboard.png)

Did I miss something? Do something wrong? Let me know!
