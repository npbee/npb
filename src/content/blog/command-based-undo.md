---
title: Command-based undo for JS apps
date: 2023-10-23
description: A brain dump of research into non-trivial undo implementations
---

I’ve always been fascinated by undo/redo in web applications. It’s a useful addition to nearly any app and arguably expected in complex ones. If it’s there, it becomes integral to how the product is used, like search or a command palette. And it’s invisible! Users can’t “see” it, but they generally have a good idea of what should happen when they use it. And as an implementor, it can be mind-melting.

If you’re dealing with a single component or a smaller-scoped project, there are libraries available for implementing undo that you can and should be using. If you’re building an _app_ on the scale of something like Figma or TLDraw, then undo stops being a “feature” and starts becoming part of your architecture. Implementing undo is less about installing the right library and more about following the right patterns.

The command pattern is one that I’ve found to be the most flexible for robust undo implementation, but it’s been challenging to find practical examples to learn from. I always seem to first land on the simple examples and then jump straight to CRDTs without anything in between. I wanted to dig into this pattern more and see how it could be applied using everyday, “boring” frontend tooling. This is admittedly a bit of a brain dump for my later self, but hopefully others will find it useful.

If you're interested in going straight into some code, check out the [repository](https://github.com/npbee/undo-redo-playground) and [demo](https://undo-redo-playground.pages.dev/).

## The memento pattern

First, a quick primer on the memento pattern. It’s a _state-based_ approach that deals with undo/redo from the perspective of state changes. The idea is save a snapshot of the undoable state for every change made. Undoing means restoring a previous state. If you’ve built a lot of Redux apps, this approach will feel familiar. It’s a straightforward and generalizable approach and it’s the [official recommendation](https://redux.js.org/usage/implementing-undo-history) from the Redux docs. I’ve used this approach with good success. If it works for you I’d recommend it.

```typescript
{
  counter: {
    past: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    present: 10,
    future: []
  }
}
```

There’s a couple of downsides with this pattern though:

1. You need to store your undoable state for every change, which could get excessively large. In practice, I’ve never had an issue with this. If you’re following Redux/React typical best practices, you are likely performing immutable updates and achieving some structural sharing.
2. You’re forced to store all of your undoable state in a single object. If your application state is spread around to multiple stores like Jotai atoms or Tanstack query cache, this may not work for you.
3. After an undo, you might need to persist a save to the backend in a format that’s _different_ from your undoable state shape. Knowing the state snapshot is not enough information to persist the change.
4. You might need to attach other metadata to the change to perform side effects. For example, re-focusing an input element after undoing an edit. Another example might be providing a human-readable description of a change.
5. It’s all-or-nothing. Every action has to be undoable. If you perform an action on the state that is _not_ undoable, you have to clear the undo stack.

## The command pattern

Contrasted with the state-based approach above, the command pattern is more _action-based_. Undo/redo is handled by defining commands that can execute and undo a change.

```typescript
const myCommand = {
  exec() {
    // ...
  },
  undo() {
    // ...
  },
};
```

To make a change on the system, a command is dispatched to a central handler to call the `exec` or `undo` functions and move the command between an undo stack and a redo stack.

```typescript
function dispatch(command) {
  command.exec();
  undoStack.push(command);
}

function undo() {
  const command = undoStack.pop();
  if (command) {
    command.undo();
    redoStack.push(command);
  }
}

function redo() {
  const command = redoStack.pop();
  if (command) {
    command.exec();
    undoStack.push(command);
  }
}
```

This approach is more flexible, but less generalizable. Ultimately, the command pattern is not a pattern specific to undo implementations, it’s more of a general architectural pattern. This is where we veer off into “how do I build undo” to “how do I build an event-driven, command-based architecture (that also has undo)?” It’s hard to describe a command-based undo system that’s _just_ focused on undo because it has an effect on your whole system.

## Keeping a history log

The state-based approach and the action-based approach are different in how they approach undo, but they share a common pattern: keeping a log. This seems obvious to point out, but to undo a change you have to know that a change occurred and you have to know a few details about how it happened. The entries in the log are what we use to derive the current state from past user actions. How the entries in the log are structured can vary, but typically you have an `undoStack` and a `redoStack`. You might also see these named as `past` and `future`.

In the memento pattern, it’s a log of state snapshots. The log isn't concerned with _how_ the snapshots were created, only the end result. This is nice because the _how_ doesn’t inject its way into the rest of the architecture. It can be contained to a single component or service and you can fairly easy "upgrade" a piece of state to be undoable.

In the command pattern, the log holds instances of commands, but I prefer to think of them as just "events" or "entries". The events contain any information you might need to execute or undo an action. This could be functions to make state like `.exec()` or `.undo()` or any other plain data you want to attach to the event.

```typescript
const undoStack = [
  {
    params: {
      id: "xxx",
      previous: "foo",
      next: "bar",
    },
    exec() {
      state[params.id].value === params.next;
    },
    undo() {
      state[params.id].value === params.previous;
    },
  },
];
```

In contrast to the memento pattern, commands do care about how the state changes are applied. The `exec` and `undo` functions on a command typically need to work together for the implementation to work as expected.

## Using Patches

One way to retain some of the advantages of the memento pattern could be to use patches in your event log. Patches can be a more compact way to describe state changes without needing to store the entire state. Using a library like Immer, you could build something like this:

```typescript
import { produceWithPatches, applyPatches } from "immer";

const myCommand = {
  params: {
    id: "xxx",
    previous: "foo",
    next: "bar",
  },
  exec(params) {
    const [nextState, patches, inversePatches] = produceWithPatches((state) => {
      state[params.id].value === params.next;
    });

    setState(nextState);

    // Return this for the `undo` call
    return { patches, inversePatches };
  },
  undo(logEntry) {
    // Apply the inverse patches to revert the `exec` function
    const nextState = applyPatches(state, logEntry.inversePatches);
    setState(nextState);
  },
};

function dispatch(command) {
  const payload = command.exec(command.params);
  const entry = {
    commmand,
    payload,
  };
  undoStack.push(entry);
}

function undo() {
  const entry = undoStack.pop();
  if (entry) {
    entry.command.undo(entry);
    // TODO: What's the redoStack here?
  }
}
```

In this example, there’s a new thing called an “entry” that represents a command that’s been executed. Another name might be a “transaction”. The command `exec` function returns the `patches` and `inversePatches` that can be used later to undo it. If you can constrain all of your commands to adhere to this pattern, you can abstract this even more to make commands very succinct.

Beware, though, that there’s an implicit parameter with patches though and that’s the “base” that we’re applying the patches against. You don’t want to apply patches to the wrong base object, otherwise you’ll end up at the wrong result.

<for example>

## Data Mutation Strategy

When building frontend apps, there’s always the challenge of how the UI state will be synced to the source of truth. In a typical app, you may have a few different flavors:

1. A _local-first_ approach where updates are applied to the UI state immediately then synced to the source of truth later
2. A _server-first_ approach where the app waits for a response from the backend before updating the UI.
3. An _optimistic_ approach where the backend call and UI updates happen simultaneously, assuming the backend call will succeed.

In a typical app, you can co-locate the data mutation strategy with the action in the place that it originated and you can mix and match strategies throughout the app to taste. Here's an example from the [Remix](https://remix.run/docs/en/main/discussion/pending-ui) docs on pending UI:

```typescript
import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { useNavigation } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const project = await createRecord({
    name: formData.get("name"),
    owner: formData.get("owner"),
  });
  return redirect(`/projects/${project.id}`);
}

export default function CreateProject() {
  const navigation = useNavigation();

  // important to check you're submitting to the action
  // for the pending UI, not just any action
  const isSubmitting = navigation.formAction === "/create-project";

  return (
    <Form method="post" action="/create-project">
      <fieldset disabled={isSubmitting}>
        <label>
          Name: <input type="text" name="projectName" />
        </label>
        <label>
          Owner: <UserSelect />
        </label>
        <button type="submit">Create</button>
      </fieldset>
      {isSubmitting ? <BusyIndicator /> : null}
    </Form>
  );
}
```

In contrast, a command-based system has in a single handler that works against a generalized command structure so the data mutation strategy has to be encoded into the command. Saying that this command is "server-first" and this other command is "local-first" means that your command handler implementation needs to know how to handle that. It’s much easier to implement a command-based system that has a single agreed-upon approach to how data mutations should occur. This applies to how you structure your application state as well. The more unified your application state is, the simpler the undo implementation can be. If your application state is a single global store that can be updated with patches which can be sent to the server for persistence, you can make a streamlined undo system. If your state is in multiple stores and you have unique endpoints for every mutation, then you’ll have more tedious command definitions.

Additionally, undo and redo operations are almost always best suited for immediate updates. Since undo operations typically have no UI associated with them, there’s not a good spot to put any pending UI to indicate that something is happening. Users are probably looking at the thing that they want to undo, so if nothing happens when that mash `⌘+z`, it won't be a good experience.

All this is to say that a general rule could be that **anything that goes into your undo or redo stacks should be able to be applied immediately**. This implies that your system needs to know how to apply local state updates immediately and then “sync” them to the source of truth optimistically. This comes with all of the challenges of optimistic UI but it's harder because it's generalized and not co-located with the original user action.

This strategy will come with trade offs. Anything that cannot be applied immediately can happen “out of band” in an isolated modal experience. For example, take the creation of a new entity where the `id` must be supplied by the backend. The “undo” of a create is a delete, but true deleting would also require going to the backend. To make the undo optimistic, we need to define a property that represents a “soft delete” state so we can filter those out from the UI.

In practice, this might look like this in a command structure:

```typescript
function CreateForm() {
  <form
    onSubmit={(evt) => {
      const formData = new FormData(evt.target);

      // Go to the server first to create the entity
      const serverResult = await fetch("/api/create", {
        title: formData.get("title"),
      }).then((res) => res.json());

      // Now create a new command entry
      dispatch(
        createEntity({
          entity: serverResult.data,
        }),
      );
    }}
  >
    <input name="title" />
    <button>Submit</button>
  </form>;
}

const createEntity = (entity) => ({
  // The `exec` command could be async to allow for setups.
  exec(params) {
    updateUI((state) => {
      state[entity.id] = entity;
    });

    // Maybe we return a payload we will want later in the `undo`
    // operation
    return {
      type: "exec",
      id: entity.id,
    };
  },
  undo(entry) {
    updateUI((state) => {
      state[entry.payload.id].isArchived = true;
    });

    return {
      id: entry.payload.id,
      type: "undo",
    };
  },
  redo(entry) {
    updateUI((state) => {
      state[entry.payload.id].isArchived = false;
    });
    return {
      id: entry.payload.id,
      type: "undo",
    };
  },

  syncToBackend(entry) {
    if (entry.type === "exec") {
      // Nothing to do here because we already created the entity
    }

    if (entry.type === "undo") {
      fetch("/api/markArchived", {
        method: "POST",
        body: JSON.stringify({
          id: entry.payload.id,
        }),
      });
    }
  },
});

function dispatch(command, params) {
  const payload = command.exec(params);
  const transaction = createTransaction(command, payload);
  syncQueue.push(transaction);
  undoStack.push(transaction);
}

function undo() {
  const txn = undoStack.pop();
  if (txn) {
    txn.command.undo(txn);
    // Create a new transaction after the undo
    const nextTxn = createTransaction(txn.command, txn.payload);
    syncQueue.push(nextTxn);
    redoStack.push(nextTxn);
  }
}
```

## Dynamic Redos, a.k.a Undoing an undo

The command-based approach nudges you to define your `exec` and `undo` functions upfront. This intuitively makes sense and can work, but it’s predicated on the fact that the undoable state has not changed since the time that the undo was performed, which may not be the case for multi-player apps. Trying to define both an `undo` and a `redo` upfront may mean that by the time you perform a `redo`, you’re using outdated information.

<example>

Illustrated using the patches idea, the inverse of an undo is a redo so we could define a redo as:

```typescript
const myCommand = {
  exec(state) {
    const [state, patches, inversePatches] = produceWithPatches(
      currentState,
      (state) => {
        state.value = "foo";
      },
    );

    return { patches, inversePatches };
  },
  undo(executeTxn) {
    // We apply the inverse patches from the `exec` transaction and return
    // _new_ patches to be used later for redo
    const [state, patches, inversePatches] = produceWithPatches(
      currentState,
      (state) => {
        applyPatches(state, executeTxn.inversePatches);
      },
    );

    return { patches, inversePatches };
  },
  redo(undoTxn) {
    // Now we are undoing and undo with the inverse patches produced by the
    // `undo` operation
    const [state, patches, inversePatches] = produceWithPatches(
      currentState,
      (state) => {
        applyPatches(state, executeTxn.inversePatches);
      },
    );

    return { patches, inversePatches };
  },
};
```

Things start to get a little mind bending here. If you’re not dealing with multi-player, then this is probably not worth the extra mental gymnastics. If you are dealing with multi-player, you should probably be using an existing framework.

## Side effects

Another thing that may come up is the need to perform ad-hoc side effects on the UI when an undo or redo occurs. For example, you may want to refocus an `input` element after an undo occurs.

```typescript
const myCommand = {
  params: {
    id: "xxx",
    previous: "foo",
    next: "bar",
    focusId: "yyy",
  },
  exec() {
    state[params.id].value === params.next;
  },
  undo() {
    state[params.id].value === params.previous;
    document.getElementById(params.focusId)?.focus();
  },
};
```

Performing imperative UI logic may or may not feel icky to you, but this may be enough. The issue you may run into is dealing with library-specific paradigms, like React’s `useEffect`. UI side effects like these belong in a `useEffect`, so you could take a queue from [useEffectReducer](https://github.com/davidkpiano/useEffectReducer) and package up effects into the state:

```typescript
const myCommand = {
  params: {
    id: "xxx",
    previous: "foo",
    next: "bar",
    focusId: "yyy",
  },
  exec() {
    state[params.id].value === params.next;
  },
  undo(createEffect) {
    state[params.id].value === params.previous;

    createEffect(() => {
      document.getElementById(params.focusId)?.focus();
    });
  },
};

function undo() {
  const txn = undoStack.pop();
  if (txn) {
    const effects = [];
    const createEffect = (effect) => effects.push(effect);
    const entry = txn.command.undo(createEffect);

    // push the effects needed to run
    state.effects = effects;
  }
}

function App() {
  const effects = useEffects();

  // Now run all of the effects created in the last transaction;
  useEffect(() => {
    // TODO: Cancellation!
    effects.forEach((effect) => {
      effect();
    });
  }, [effects]);
}
```

Another challenging aspect of side effects is that it starts to tie your undo implementation to your UI. In the above example, focusing an input element after an undo assumes that the input element is visible at the time that the undo occurs. This can easily get hard to track or out-of-sync.

## Altering the past, a.k.a. Mind the GURQ

One way to think about performing an undo is that you’re going backwards in time. If you then make an edit at that point in time, you’re _changing_ the past. Trying to perform a redo at that point in time would be redoing an event against a different timeline and no longer makes sense.

![TODO alt text](/posts/command-based-undo/branching-undo.png)

When thinking about it this way, the only sensible thing to do with the redo stack is to clear it. You’d be redoing operations done on a past version of the state.

There is another way to think about undo, which is to think about it always going _forward_. An undo operation is a forward action that happens to be the inverse of a previous action. If you think about the history as linear and always moving backwards and forwards, then it makes sense that you should always be able to go back to a previous version of what you were looking at, even if you got there via an undo or redo.

![TODO alt text](/posts/command-based-undo/non-branching-undo.png)

The "trick" as prescribed by the [GURQ](https://github.com/zaboople/klonk/blob/master/TheGURQ.md) here is to replay the redo stack at the time of the history change back on to the undo stack _twice_: once forwards and once inverted. How this inversion happens depends on the undo implementation. For a real-life example of this, check out emacs.

## Takeaways

I consider undo/redo to be one of the harder things to implement, or more specifically, one of the harder things to implement _well_. I put together an example utilizing some of these techniques in this repository: https://github.com/npbee/undo-redo-playground with a working demo located [here](https://undo-redo-playground.pages.dev/).

## References

- https://www.placemark.io/post/how-placemark-implements-undo-redo-to-make-map-making-safe-and-chill
- https://medium.com/@mweststrate/distributing-state-changes-using-snapshots-patches-and-actions-part-1-2811a2fcd65f
- https://github.com/zaboople/klonk/blob/master/TheGURQ.md
- https://www.figma.com/blog/how-figmas-multiplayer-technology-works/
- https://liveblocks.io/blog/how-to-build-undo-redo-in-a-multiplayer-environment
- https://www.youtube.com/watch?v=WxK11RsLqp4
- https://www.youtube.com/watch?v=Wo2m3jaJixU
- https://twitter.com/steveruizok/status/1566142910546038784
- https://maxliani.wordpress.com/2021/09/01/undo-the-art-of-part-1/
