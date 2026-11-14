---
title: Testing an API endpoint with Deno
date: 2023-10-08
description: A method for testing an HTTP endpoint using Deno without testing implementation details.
---

[Deno](https://deno.com/) has become one of my favorite tools for web development. It’s refreshing to have all of the essential features readily available without needing to reach for third-party libraries. Recently, I’ve been working on an API-first version of [Waveformr](https://waveformr.com/) and landed on a way to test the endpoints that I’d like to share.

## The endpoint

For the purposes of this article, I’m going to set up a basic HTTP `GET` endpoint using Deno and [Hono](https://hono.dev/). But note, Deno and Hono here are implementation details. I’m only using them because they are easy to set up, but the tests won’t care what we’re using to implement the endpoint.

The endpoint implementation will look like this:

```typescript
import { Hono } from "https://deno.land/x/hono/mod.ts";

const app = new Hono();

// The "database"
const books = new Map();

// Post a book with a name to create it
app.post("/book", async (c) => {
  const body = await c.req.json<{ name: string }>();
  const { name } = body;
  const book = {
    id: crypto.randomUUID(),
    name,
  };

  books.set(book.id, book);
  return c.json({ status: "ok", id: book.id });
});

// Look up a book by id
app.get("/book/:id", (c) => {
  const book = books.get(c.req.param("id"));
  if (book) {
    return c.json({ status: "ok", book });
  } else {
    return c.json({ status: "error", message: "not found" }, 404);
  }
});

export function run() {
  return Deno.serve(app.fetch);
}

// Run this immediately if this is the entrypoint to the program
// Useful for testing because we can import this file and run it
// with a function call when we're ready
if (import.meta.main) {
  run();
}
```

## The test

The test code looks like this:

```typescript
import { assert } from "https://deno.land/std@0.202.0/assert/assert.ts";
import { run } from "./main.ts";
import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";

const PORT = 8000;
const url = (path: string) => new URL(`http://localhost:${PORT}/${path}`);

Deno.test("POST a new book", async (t) => {
  // Pass an `AbortController` so that we can abort the server when we're done
  const controller = new AbortController();
  run({
    port: PORT,
    signal: controller.signal,
  });

  const resp = await fetch(url("book"), {
    method: "POST",
    body: JSON.stringify({
      name: "The Great Gatsby",
    }),
  });

  assertEquals(resp.status, 200);

  const { id, status } = await resp.json();
  assertEquals(status, "ok");
  assert(typeof id === "string");

  const newBookResp = await fetch(url(`book/${id}`));
  assertEquals(newBookResp.status, 200);
  const newBookJson = await newBookResp.json();
  assertEquals(newBookJson.book.name, "The Great Gatsby");

  controller.abort();
});
```

Running the tests will give an output that looks a bit like this:

```sh
Check file:///Users/nickball/code/deno-endpoint-testing/main_test.ts
running 1 test from ./main_test.ts
POST a new book ...
------- output -------
Listening on http://localhost:8000/
----- output end -----
POST a new book ... ok (8ms)

ok | 1 passed | 0 failed (26ms)
```

What I like about this method is that we’re hitting the endpoint like a real user would and using standard Web APIs. Deno has this all built in, so it feels very natural. One note here is that we’re passing an `AbortController` into the server so that we can manually kill the server after we’re done testing it.

That’s it!
