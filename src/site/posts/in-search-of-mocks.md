---
title: In Search of Mocks
date: 2020-06-15
description: A journey through various data mocking techniques for testing React apps (and GraphQL)
---

# In Search of Mocks

An obsession of mine lately has been figuring out a good way for my teammates and I test React components that rely on server data.
Specifically, I'm looking for ways to:

- Setup a test that relies on server data with minimal ceremony. I'm talking one function call if possible.
- When doing that setup, be able to only specify specifically which pieces of data I need for that test and nothing more so it's clear what's important for the test.
- Assert what was sent to the server during my test. In some cases for us, this is the only way to really assert that something worked.
- Easiy mock one-off errors in tests.
- Have a good base of mocks with realistic data that can be overridden

Our particular app uses GraphQL, so that factors in my search as well.
I've made a lot of stops in this journey, including:

- **Mocking abstraction layers** - At which layer do you apply the mock?
- **Mocked _data_ vs. mocked \_responses\_\_** - What's the difference?
- **Mocking your entire backend in tests _and_ the browser** - E.g. [MSW](https://mswjs.io/) or [MirageJS](https://miragejs.com/)

This will be a brain dump of some learnings from my research for my specific scenarios, so I don't expect it to apply to everyone but I wanted to write it down anyways.

## Mocking Layer

See: [Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch) by Kent C. Dodds.

Before going further, I will say that I very much subscribe to the [Kent C. Dodds](https://kentcdodds.com/) method of testing React components.
Specifically, I like to test as few implementation details as possible and minimize mocking so that I can have high confidence that things are working.
I'm less concerned with what "kind" of test I'm writing (unit, integration, etc.).

So knowing that, my first point of research was around figuring out which point to start mocking.
Let's use this code for all of the examples:

```jsx
function CreateLabel(props) {
  let { api } = props;
  let [value, setValue] = React.useState("");
  let [msg, setMsg] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    // This is simplified for the sake of the example
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

### Dependency Injection

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

If you're testing a component that deals with the network, I see the layers of potential mocking as:

1. Dependency Injection (e.g. passing in a mock API)
2. Network _client_ (e.g. mocking fetch or axios)
3. Network

### Dependency Injection

For example:

```jsx
// In the app...
function MyComponent({ api }) {
  React.useEffect(() => {
    api.get("/url").then(/* ... */);
  }, [api]);

  // ...
}

// In the test...
test("MyComponent", () => {
  let mockApi = {
    get(url) {
      return Promise.resolve({ some: "data" });
    },
  };

  render(<MyComponent api={mockApi} />);
});
```

### Client Mocking

```jsx
// In the app...
function MyComponent({ api }) {
  React.useEffect(() => {
    api.get("/url").then(/* ... */);
  }, [api]);

  // ...
}

// In the test...
test("MyComponent", () => {
  fetch.mockImplementationOnce(/* ... */);

  render(<MyComponent />);
});
```

Both of these approaches have tradeoffs, but suffice it to say that I'm on the side of the last choice: Mocking at the network level.
For more reasons on this: see [Kent's article](https://kentcdodds.com/blog/stop-mocking-fetch).

## Specifying only what is needed

One particular thing I really like to have in tests is the ability to specify _only_ what I need in the data mock without breaking the component.
Here's what I mean:

```jsx
function UserComponent(props) {
  let [data] = useQuery(/* Fetch user */)

  return <div>
    <label htmlFor"name">
      Name
    </label>
    <input id="name" value={data.name} />
    <div>
      Is Public: {data.config.isPublic}
    </div>
  </div>
}

// In the test
test("MyComponent renders the name input", () => {
  // Pretend this is mocking the network call
  mockData({
    name: "Test Name"
  })

  // This test will fail because I haven't mocked `config` in the data. I
  // don't need this for my test, but I have to mock it so the component
  // doesn't throw an error
  render(<MyComponent />)
})
```

A common solution to this is to use something like [`test-data-bot`](https://github.com/jackfranklin/test-data-bot) to have "factories" or "builders" that build out your data for you.
So with something like this, we could do:

```jsx
// In the test
test("UserComponent renders the name input", () => {
  // Pretend this is mocking the network call
  // I didn't need to specify everything in my mock so it's clear what is
  // important to the test. The `builder` will fill out any missing properties
  // the need to be there
  mockData(
    builder({
      name: "Test Name",
    })
  );

  // Ok!
  render(<MyComponent />);
});
```

This is all well and good, but if you are dealing with a GraphQL API, then even a 'builder' solution feels like too much boilerplate.

```jsx
// Why am I specifying all of these fields?
// My GraphQL schema already lists out each field and their types...
const userBuilder = build("User", {
  fields: {
    name: fake(f => f.name.findName()),
    config: {
      isPublic: true,
    },
  },
});
```

Further, many GraphQL clients work against assumptions that GraphQL backends will return responses in particular way.
For example, the [`urql`](https://formidable.com/open-source/urql/) client will handle caching for you as long as your backend returns `__typename` values for each entity.
This is not something you typically have to deal with in the client code, but if you want your tests to work correctly, they need to be a part of your mocked responses.

```jsx
// Why am I specifying all of these fields?
// My GraphQL schema already lists out each field and their types...
const userBuilder = build("User", {
  fields: {
    __typename: "User",
    name: fake(f => f.name.findName()),
    config: {
      isPublic: true,
    },
  },
});
```

## Asserting API arguments and auto-save

Providing the correct data shape in your mocks is good, but we typically also need to check what arguments were sent _to_ our backend.
This is especially true in the case of an auto-saving UI, where you may have a component that holds its own local state and sends off data to the backend as a side-effect.
In this scenario, there's nothing on the screen that you can use to assert that your API call was made correctly.

```jsx
function UserComponent(props) {
  let [mutate] = useMutation(/* UpdateUserName */);
  let [state, setState] = React.useState(props.name);
  function onChange(evt) {
    setState(evt.target.value)
  }

  // Pretend this is debounced...
  React.useEffect(() => {

    // A trival example, but say there is some logic that happens _before_ the
    // data is sent to the server. We need to assert what we sent here because
    // result is not printed to the screen
    mutate({ name: state.trim() })
  }, [state])

  return <div>
    <label htmlFor"name">
      Name
    </label>
    <input id="name" value={data.name} onChange={onChange} />
  </div>
}
```

## MSW + GraphQL Tools

What I've found to be a good mix of practicality and flexibility has been combining [`msw`](https://github.com/mswjs/msw) and [`graphql-tools`](https://www.graphql-tools.com/).
Having `msw` intercept the request, but then having GraphQL Tools fill in the remaining GraphQL response allows for the schema to provide mocking power to our tests.

```js
// Local test utils
import { graphql } from "test/utils";

// In the test
test("MyComponent", () => {
  let testPost = {
    id: 1,
    title: "THE TITLE",
  };

  // By making this a jest mock, I can make assertions on it
  let resolve = jest.fn(() => ({
    post: testPost,
  }));

  server.use(graphql.query("Post", resolve));

  render(<MyComponent />);

  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith({ id: testPost.id });

  //...
});
```

```js
// Test utils
import { graphql as mswGraphql, context } from "msw";
import { graphql as gql } from "graphql";
import { schema } from "../mocks/graphql";

export let graphql = {
  async resolve(req, res, ctx, createMockData) {
    let { query, variables } = req.body;

    // Get the full query response for this from our mocked schema
    let response = await gql(schema, query, {}, {}, variables);

    // Create the mock response for this particular request
    let mockData = createMockData(variables);

    // Merge the two together with the mock data taking precendence
    let finalResponse = merge(
      {},
      response,
      // Assume we want a `data` response if it wasn't part of the return
      // value
      mockData.data ? mockData : { data: mockData }
    );

    return res(context.json(finalResponse));
  },

  query(operationName, testResolver) {
    return mswGraphql.query(operationName, async (req, res, ctx) => {
      return graphql.resolve(req, res, ctx, testResolver);
    });
  },
  mutation(operationName, testResolver) {
    return mswGraphql.mutation(operationName, async (req, res, ctx) => {
      return graphql.resolve(req, res, ctx, testResolver);
    });
  },
};
```

## Looking Back

I think this is a pretty decent setup, but it's a _lot_ of abstraction.
There's probably some arguments to be made that there's too much logic in the test framework, but I take comfort in the fact that everything in GraphQL is strongly typed and based on a well-defined AST.
Letting the GraphQL schema provide tooling is one of the main benefits in my opinion.
