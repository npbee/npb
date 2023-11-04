---
title: Command-based undo for JS apps
date: 2023-10-23
description: One of the hardest problems that every app has.
---

I’ve always been fascinated by undo/redo in web applications. It’s a useful addition to almost any app and arguably expected in apps of a certain complexity. If it’s there, it becomes part of how the product is used, like search or a command palette. And it’s invisible! Users can’t “see” undo/redo, but it’s still intuitive to understand. I do a thing, mash undo, and it undoes it. But as an implementation, undo can be a mind melting dive into time travel.

If you’re dealing with a single component or a smaller-scoped project, there are libraries available for implementing undo that you can and should be using. If you’re building an _app_ on the scale of something like Figma or TLDraw, then undo stops being a “feature” and starts becoming part of your architecture. Implementing undo is less about installing the right library and more about following the right patterns.

The command pattern is one that I’ve found to be the most flexible for robust undo implementation, but it’s been challenging to find examples. Implementation options start going outside of typical best-practice paradigms included with a full-stack framework like Remix or Sveltekit or client-side libraries like Tanstack Query or Redux. I always seem to first land on the simple examples and then jump straight to CRDTs without anything in between. I wanted to dig into this pattern more and see how it could be applied using everyday, “boring” frontend tooling. Let’s see…

## The memento pattern

First, a quick primer on the memento pattern. It’s a _state-based_ approach that deals with undo/redo from the perspective of state changes. The idea is save a snapshot of the undoable state for every change made. Undoing means restoring a previous state. If you’ve built a lot of Redux apps, this approach fits right in. It’s a straightforward and generalizable approach and it’s the [official recommendation](https://redux.js.org/usage/implementing-undo-history) from the Redux docs. I’ve used this approach with good success. If it works for you I’d recommend it.

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

This approach is more flexible, but less generalizable. Ultimately, the command pattern is not a pattern specific to undo implementations, it’s more of a generalized application state management solution. And this is where we veer off into “how do I build undo” to “how do I build an event-driven, command-based architecture (that also has undo)?” It’s hard to describe a command-based undo system that’s _just_ focused on undo because it has an effect on your whole system.

You might be thinking that this is a reason to avoid command-based undo implementations, and you wouldn’t be wrong necessarily. This is a reason why it’s important to think about undo needs up front. But at a certain point, the memento pattern falls short and you aren’t left with much choice.

## Keeping a history log

The state-based approach and the action-based approach are different in how they approach undo, but they share a common pattern: keeping a log of what happened. This probably seems pretty obvious to point out, but to undo a change you have to know that a change occurred and you have to know a few details about how it went down.

In the memento pattern, it’s a log of state snapshots. You don’t need to concern yourself with _how_ you got to the next state, only the end result. This is nice because the _how_ doesn’t inject its way into the rest of the architecture. It can be contained to a single component or service.

In the command pattern, the log is a log of events. The events need to contain any information you might need to execute or undo an action. This could be functions to execute or any other plain data you want to attach to the event. Unlike the memento pattern, commands _are_ concerned with how you go to the next state because that’s how your app will know how to undo. For example, you might need to store a `previous` and `next` value in your even so that you know how to revert a change:

```typescript
const myCommand = {
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
};
```

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

There’s an implicit parameter with patches though and that’s the “base” that we’re applying the patches against. You don’t want to apply patches to the wrong base object, otherwise you’ll end up at the wrong result.

<for example>

## Data Mutation Strategy

When building frontend apps, there’s always the challenge of how the UI state will be synced to the source of truth. In a typical app, you may have a few different flavors:

1. A _local-first_ approach where updates are applied to the UI state immediately then sync to the source of truth later
2. A _server-first_ approach where the app waits for a response from the backend before updating the UI.
3. An _optimistic_ approach where the backend call and UI updates happen simultaneously, assuming the backend call will succeed.

In a typical app, you can co-locate the data mutation strategy with the action in the place that it originated and you can mix and match strategies throughout the app to taste. In contrast, a command-based system has in a single handler that works against a generalized structure, so it’s much easier to implement a command-based system that has a single agreed-upon approach to how data mutations should occur. This applies to how you structure your application state as well. The more unified your application state is, the simpler the undo implementation can be. If your application state is a single global store that can be updated with patches which can be sent to the server for persistence, you can make a streamlined undo system. If your state is in multiple stores and you have unique endpoints for every mutation, then you’ll have more tedious command definitions.

Additionally, undo and redo operations are almost always best suite for immediate updates. Since undo operations typically have no UI associated with them, there’s not a good spot to put any pending UI to indicate that something is happening. Users are probably looking at the thing that they want to undo, so nothing happens when that mash `⌘+z`, it’s probably not a good experience.

All this is to say that a general rule could be that anything that goes into your undo or redo stacks should be able to be applied immediately. This implies that there needs to be a part of your system that knows how to take local state updates and “sync” them to the backend. A natural option here is to create “transactions” that capture the state updates for each operation and have a queue of these transactions that need to be synced to the server. And a thorough approach would also handle what happens if that sync fails, perhaps through a “rollback” mechanism for each transaction (maybe it’s the same as “undo”, but maybe not!).

This strategy will come with trade offs. Anything that cannot applied immediately can happen “out of band” in an isolated experience. For example, take the creation of a new entity where the `id` must be supplied by the backend. The “undo” of a create is a delete, but true deleting would also require going to the backend. To make the undo optimistic, we need to some property that represents a “soft delete” state so we can filter those out from the UI.

In practice, this might look like this in a command structure:

```
// Note: pseudo-code
const createEntityCommand = {
  // The `exec` command could be async to allow for setups.
	async exec(params) {
		// Here we want to hit the backend first to get an `id`
		const newEntity = await fetch('/api/create', params);
		updateUI(state => {
			state[newEntity.id] = newEntity
		});

		// Maybe we return a payload we will want later in the `undo`
		// operation
		return {
			id: newEntity.id
		}
	},
	undo(entry) {
		updateUI(state => {
			state[entry.payload.id].isArchived = true;
		});
	},
	redo() {
		updateUI(state => {
			state[entry.payload.id].isArchived = false;
		});
	}
}

async function dispatch(command, params) {
	const payload = await command.exec(params);
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
    state.value = "foo";
  },
  undo(state, executeTxn) {
    // Inverse patches are for the execute transaction
    applyPatches(state, executeTxn.inversePatches);
  },
  redo(state, undoTxn) {
    // Inverse patches here are for the undo transaction
    applyPatches(state, undoTxn.inversePatches);
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

## Altering the past, a.k.a. Mind the GURQ

One way to think about performing an undo is that you’re going backwards in time. If you then make an edit at that point in time, you’re _changing_ the past. Trying to perform a redo at that point in time would be redoing an event against a different timeline and no longer makes sense.

![TODO alt text](/posts/command-based-undo/clear-redo.png)

When thinking about it this way, the only sensible thing to do with the redo stack is to clear it. You’d be redoing operations done on a past version of the state.

There is another way to think about undo, which is to think about it always going *forward*. An undo operation is a forward action that happens to be the inverse of a previous action. If you think about the history as linear and always moving backwards and forwards, then it makes sense that you should always be able to go back to a previous version of what you were looking at, even if you got there via an undo or redo.

In that scenario, the “one cool trick” is to replay the redo stack forwards and then backwards on to the undo stack.

![TODO alt text](/posts/command-based-undo/gurq.png)

To me this still feels like a nice-to-have. It can start to get less intuitive for users if you’re working with just a single value. With a single value, you can track in your head the undo/redo stacks. If you have a complex app, it starts to get hard to track those stacks in your head. You might just be changing, undoing, and redoing all over and hoping to be able to get back to a value you had at one point. The GURQ implementation can be nice for that. For a real-life example, you can check out emacs.

<example from emacs>

How to apply this depends on the implementation and can, again, be mind bending. If you’re following along with the command-based approach, that would mean pushing the original `exec` actions back on to the undo stack, then the *inverse* of the *undo* of that action which is the *redo*. 

```typescript
function dispatch(command) {
	const payload = command.exec(command.params);
	const txn = createTransaction(command, payload);
	
	undoStack.push(
		// The redo stack transaction need to have a reference to 
		// the transaction that created it
		...redoStack.map(transaction => transaction.originalTransaction),
		
		// "undoing" the redostack means inverting the `undo` and `redo`
		// functions on the command
		...redoStack.map(transaction => ({
			...transaction,
			command: {
				...transaction.command,
				undo: transaction.command.redo,
				redo: transaction.command.undo
			}
		})),
		
		// Now the most recent transaction
		txn
	)
}
```


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

