---
title: In Search of Mocks
date: 2020-06-15
description: A journey through various data mocking techniques for testing React apps (and GraphQL)
---

# In Search of Mocks

An obsession of mine lately has been figuring out a good way for my teammates and I test React components that rely on server requests.
Specifically, I'm looking for ways to:

- Setup a test with the _least_ amount of ceremony possible. Less ceremony means less friction for choosing to write a test or not.
- When doing that setup, be able to only specify specifically which pieces of data I need for that test and nothing more so it's clear what's important for the test.
- Assert what was sent to the server during my test. In some cases, this is the only way to really verify that something worked as expected.
- Easily mock one-off errors in tests.
- Have a good base of mocks with realistic data that can be overridden per test as needed

We're full in on the testing philosophies of [React Testing Library](We've already gone full ahead with the
) and [Kent C. Dodds](https://kentcdodds.com), but how far do you take it?

This will be a brain dump of some of my learnings along the way for my specific scenarios, so I don't expect it to apply to everyone but I wanted to write it down anyways.
Some things I'll be talking about:

- **Mocking abstraction layers** - At which layer do you apply the mock?
- **Mocked _data_ vs. mocked \_responses\_\_** - What's the difference?
- **Mocking your entire backend in tests _and_ the browser** - E.g. [MSW](https://mswjs.io/) or [MirageJS](https://miragejs.com/)

At the end of the day, I've concluded that a tool like [MirageJS](https://miragejs.com/) or [Mock Service Worker](https://mswjs.io/), plus some sort of in-memory database really capture everything I need.

## Mocking Layers

> See: [Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch) by Kent C. Dodds.

As I mentioned above, I very much subscribe to the [Kent C. Dodds](https://kentcdodds.com/) method of testing React components.
Specifically, I like to test as few implementation details as possible and minimize mocking so that I can have high confidence that things are working and easily swap out implementation details.
In my position at work, we're constantly rebuilding and trying new experiments, so it's important to me to be able to write tests that will survive those changes.
I'm generally less concerned with what "kind" of test I'm writing (unit, integration, etc.).

So knowing that, my first point of research was around figuring out which point to start mocking out server responses.
And at this point I've (again) agreed with Kent that mocking at the _network_ layer is the way to go.
Kent's article above lays out a lot of this really well, but here's my own take.

Let's use this code for all of the examples:

```jsx
function CreateLabel(props) {
  let { api } = props;
  let [value, setValue] = React.useState("");
  let [msg, setMsg] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    // Simplified for the sake of the example
    api
      .post("/label", {
        data: value,
      })
      .then(id => {
        setMsg(`Success! Created label with id ${id}`);
      }, err => {
        setMsg("Error!")
      }));
  }

  return (
    <div>
      {msg}
      <form onSubmit={handleSubmit}>
        <label htmlForm="label">Label</label>
        <input
          id="label"
          value={value}
          onChange={evt => setValue(evt.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

A pseudo-component that shows an input and a submit button, posts to a theoretical API on submit, and then prints a message to the screen.
And we'll that the theoretical API looks like this:

```js
export let api = {
  post(url, config) {
    // Does some manipulation and then calls out to `fetch`
    return fetch(url, config);
  },
};
```

There are different points at which we could mock out the network call for this component.
I see them roughly like this:

- **Dependency Injection** - Test injects a mock `api` value. Network client is never hit
- **Mocked Client** - Test mocks the network client. Environment call is never hit (`fetch` or `xhr`)
- **Mocked Environment** - Test mocks at the environment level. Client is hit but the real `fetch` is never called
- **Network Intercept** - Test intercepts actual network requests and allows for custom response. Real `fetch` is called and the test asserts on custom responses. (Example: Nock, MSW, Mirage)
- **Network Intercept + Mocked data layer** - Test intercepts network requests, but requests are handled with actual logic mimicking production code and write to an in-memory database. Tests assert on the database. (Example: Mirage JS)

![Mocking layer](/static/posts/mock-layer.png)

### Dependency Injection / Mocking `fetch`

For a long time I really only considered two ways of mocking this component: Dependency injection or mocking the client.
Dependency injection would look like this:

> I'm using [React Testing Library](https://testing-library.com/docs/react-testing-library) here.

```jsx
test("CreateLabel can create a label", async () => {
  // In a test
  let mockApi = {
    post: jest.fn(() => Promise.resolve(123)),
  };
  render(<CreateLabel api={mockApi} />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(mockApi.post).toHaveBeenCalledTimes(1));

  // Assert we called our mocked API _with_ the value we typed
  expect(mockApi.post).toHaveBeenCalledWith("/label", { data: "Home" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
```

We're passing in a mocked API so that we can make a direct assertion on what was called.
This is kind of nice because everything is in one spot and there aren't many abstraction layers, so things are easy to follow.

However, as stated in Kent's article above, this strategy has some downsides as well:

- It doesn't exercise the logic in the `api` at all. A separate test is needed for that.
- It ties your API implementation details to your component. In your test, you have to know that your component calls `api.post`. If you later change this logic, you'll have to update your test.
- Further on the last point, your response from your mock API is hard-coded. If you later change your API response to return an object like `{ id: 1}`, you'll have to update your test.

A closely related strategy to this is mocking one level up at the `fetch` level.
That might look like this:

```jsx
test("CreateLabel can create a label", async () => {
  fetch.mockImplementationOnce(() => Promise.resolve(123))

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Assert we called our mocked API _with_ the value we typed
  expect(fetch).toHaveBeenCalledWith("/label", { data: "Home" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
```

This is better than dependency injection because we're now excercising our `api` logic and removing some implementation details in our test.
But, we still have the issue of hard-coding the response from the API _and_ we can also see another implementation detail: `fetch`!
The fact that we're mocking `fetch` means that we're not actually testing that we're calling `fetch` with the correct arguments.

To move further up the mocking layer, let's talk about some other things first.

## Mocked Responses vs. Mocked Data

So let's say you're convinced that mocking at the `environment` isn't the best solution.
The next layer for mocking would be to call the APIs in the environment that make network calls, but intercept those calls so they don't actually hit the network.
This is where something like [`msw`](https://mswjs.io/) comes in:

```jsx
import { rest } from 'msw';
import { server } from './test/server';

test("CreateLabel can create a label", async () => {

  // Tell our "server" to intercept POST requests to `/label` and respond
  // with this specific response
  server.use(
    rest.post('/label', (req, res, ctx) => res(ctx.text(123)))
  )

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
```

This is interesting because there's no mocking of `fetch` anywhere.
We could theoretically switch our entire client layer to use `xhr` if we wanted and this test would still pass.

You may have noticed that we're no longer asserting what we called our API with.
We could still do that here by making the response a mocked function.

```jsx
import { rest } from 'msw';
import { server } from './test/server';

test("CreateLabel can create a label", async () => {

  // Tell our "server" to intercept POST requests to `/label` and respond
  // with this specific response

  // Use a mock function that we can assert on later
  let handler = jest.fn((req, res, ctx) => res(ctx.text(123)))

  server.use(rest.post('/label', handler))

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));

  // Assert things about the last call. This will be a bit cumbersome because
  // it's the full request. Likely could create a helper like:
  expect(getLastRequestBody(handler)).toHaveBeenCalledWith({
    data: "Home"
  })

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
```

This is pretty good!
But, there are still a few short-comings with this:

- The test is still coupled to the network API details through the URL of the request. If we want to change the endpoint this component hits, we'll have to update our test. This could be a perfectly fine trade-off depending on your needs.
- We're still hard-coding the response payload in the test. If we have other tests that hit this endpoint, we'd be hard-coding that data there as well. If the payload changes, we'd need to update all places that use it.

Another interesting short-coming is that as things get more complicated in your app, you essentially have to implicitly implement your backend logic through your mocks.
Here's an example of what I mean:

Say that our example above actually makes _two_ network calls: One that posts to create the label, and then another that refetches all labels to get the latest data:

```jsx
function CreateLabel(props) {
  /* ... */

  function handleSubmit(evt) {
    evt.preventDefault();

    // This is simplified for the sake of the example
    api
      .post("/label", {
        data: value,
      })
      .then(id => {
        setMsg(`Success! Created label with id ${id}`);

        // Refetch all labels so we have the latest data
        return refetchAllLabels()
      }, err => {
        setMsg("Error!")
      }));
  }

  /* ... */
}
```

Assuming we want to assert something about that refetching in our tests, we have to set that up in our mocks;

```jsx
import { rest } from "msw";
import { server } from "./test/server";

test("CreateLabel can create a label", async () => {
  // Tell our "server" to intercept POST requests to `/label` and respond
  // with this specific response

  // Use a mock function that we can assert on later
  let handler = jest.fn((req, res, ctx) => res(ctx.text(123)));

  server.use(
    rest.post("/label", handler),

    // Intercept this request too and ensure we're returning the same data
    // that our mocked post handler did
    rest.get("/labels", (req, res, ctx) => res(ctx.data([123])))
  );

  render(<CreateLabel />);

  // ...
});
```

We have to intercept two requests now and line up each response so that they return related data, so in a sense we're doing what our backend would be doing with these requests.
You could say that this is unnecessary to do because the tests don't _really_ care that the same data exists in both responses, they just care that your response is what you said it would be.
This is fair, but in my opinion I think it also dilutes the readability of the test.
I think it's helpful to see in my test that, yes, this the endpoint returns the data that was created in this other endpoint because they are related and that's how the real thing works.
By encoding this information into mocks, you have this info spread through all of your tests.

So let's go one step further...

## Mocking Your Entire Backend

Instead of mocking individual requests, we can actual mock the _handlers_ of those requests and write to a mocked in-memory database.
The difference here is subtle, but interesting.
It's mostly easily demonstrated in the udpated test:

```jsx
import { rest } from 'msw';
import { server, db } from './test/server';

test("CreateLabel can create a label", async () => {
  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(db.getLabels()).toHaveLength(1))

  let label = db.getLabels()[0]

  expect(label.title).toBe('Home')

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText(`Success! Created label with id ${label.id}`)).toBeInTheDocument()
});
```

A couple of interesting things to point out:

- We don't mock each individual response, so the test is a lot shorter.
- We don't assert the arguments of the request, we _assert_ the result of the database.
- We're asserting _less_ about our implementation details. This may feel uncomfortable.

If you've ever written or peered into a backend test, it probably looks a lot like this.
You set up some things for the tests, perform an action, and then assert on the database.
The fact that our frontend test does this same thing is nice because I think it helps solidify the mental model of what's actually happening.

Setting this up with `msw` would depend on how you're making requests.
In my case, I'm typically using GraphQL so I'll show that as an example.
GraphQL is especially interesting because there's really only one endpoint and all of the logic is in the resolvers.

```js
// test/server.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import schema from './my-schema.graphql';

let db = /* ... */

let root = {
  createPost(args, { db }) {
    let { title } = args;

    // Make a new 'post' in our database
    let newPost = db.create('post', { title })
    return newPost;
  },
  posts(_args, { db }) {
    // Return all of the posts in our db
    return db.get('post');
  }
}

export let server = setupServer(
  rest.post('/api/graphql', async (req, res, ctx) => {
    // Get the query and variables from the body
    let { query, variables } = req.body;
    let context = { db };

    // Make a real query against our schema!
    let response = await graphql(schema, query, root, context, variables);

    return res(ctx.delay(500), ctx.status(200), ctx.json(response));
  })
)
```

As for the "database", it can be just about as simple or complicated as you want.

```js
let data = {
  post: {},
};

export let db = {
  create(model, attrs) {
    let id = makeId();

    let thing = {
      id,
      ...attrs,
    };

    data[model][id] = thing;

    return thing;
  },
};
```

Positives of this type of test are:

- All of your 'backend' mocking logic lives in one spot. It can be updated here and all tests will get the udpates.
- It removes _all_ implementation details from your test. Not even which endpoints you are calling are part of the test.
- It's (in theory) very close to how the real system works
- In the case of GraphQL, it's making a real query against your real schema. It can catch if you are returning responses that don't match the schema, which ensures your test data always resembles production.

Downsides are:

- There's a lot more abstraction. It's now harder to see in your test everything that's in your component under test
- More test logic in the request handlers. The test is actually asserting on the test database logic, which can have its own bugs.

All together, this pattern essentially does what [MirageJS](https://miragejs.com/) does but I wanted to show that it can be done with msw as well.
The interesting thing about both of these tools, is that you can use both of them in the browser as well!
So you now have a way to develop new features against real data using the same production-like data you use in your tests.

## Slippery Slope

One argument I'm primed to take on with my co-workers is that this is essentially rebuilding our backend on the frontend.
In this simple example, the resolvers are easy, but in a real app things are complicated.
There are relationships between models and service calls to be made, etc.
That's all true and I think a trade off to be made for each team.
But at the end of the day, I think if you think of it as a development tool first, it will always be helpful.
The point is not to faithfully recreate exactly what your backend is doing, but to give an approximation of it and to have all of the logic in one place.
Remember, it's only a slight extension of doing this at the request level.
And ultimately, being able to hop down to mock out the request level should be the escape hatch.
If you have a test that's asserting on a complicated backend response, write a one-off request mock.
Use your shared database for mocks that are easy and can be reused across tests.
Writing my tests like a backend test with a database feels very strange at first, but I've found that it actually solidifies my understading of features _more_.

## Wrap Up

I'm still exploring all of this, but so far I'm pretty happy with this setup.
It ticks all of my boxes and feels like the right trade offs have been made...for now.
To sum up my current ideal setup, I've created a repo: [https://github.com/npbee/msw-jest-graphql](https://github.com/npbee/msw-jest-graphql).
