---
title: Command-based undo with Immer patches
date: 2023-10-23
description: One of the hardest problems that every app has.
draft: true
---

**Alt title: The art of undo** or **Command-based undo from scratch**

> Notes: Still struggling with this as a “god” post about undo. Can’t decide between generic discussion and a practical example and implementation.

I’ve always been fascinated by undo/redo in web applications. It’s almost always useful. If it exists, it becomes an integral part of how the product is used, like search or command palettes. It’s also invisible. There’s no visual indication of what’s about to happen when you type `⌘+z`. Intuitively it can be straightforward to understand how to use undo, but the implementation can be mind bending, like understanding time travel.

On the frontend side, there are plenty of libraries to reach for that can handle undo for you in some cases. If your use case of undo is scoped to a single component or feature, then a library is likely a good choice. But if you’re building a more complex and rich client application, it’s worth thinking about undo and the implementation tradeoffs before getting too far because it can take over everything. At a certain point, undo ceases being a feature and becomes part of the architecture that weaves its way into just about everything.

Digging far enough into these concepts, I always seem to end up first at the memento pattern and then jump straight to the land of [CRDT](https://crdt.tech/)'s and event-sourcing without anything in between. The memento pattern starts to fall short quickly, in my opinion, and CRDT’s are great but usually not practical. Using “boring” SPA tech might be the best or only option and you still want a robust undo implementation. Here’s my take.

## Why not the memento pattern?

First, let’s talk about why you might not want to use the [memento](https://en.wikipedia.org/wiki/Memento_pattern) pattern. The idea with this pattern is to save a snapshot of the state for every change made. Undoing is restoring a previous state. It’s a great approach when it works because it’s straightforward and generalizable so there are existing libraries out there that do this for you.

It’s the recommended approach in Redux and I have used it with great success.

What happens, though, in the following scenarios?

- Your application state is not centralized in a single undoable object. It’s spread across multiple stores, local component state, or a Tanstack query cache
- You need to call a backend API to persist the change in a different format. Perhaps your single state object is large and you only want to tell the backend what’s changed. When your application calls `undo`, it needs to know how to tell the backend what happened.
- You want to handle multi-player scenarios where you need to carefully merge state together

In my opinion, as soon as your undo requirements expand from a single component to multiple components, the memento pattern falls short. Your undo implementation has graduated to being a part of your architecture.

## Using commands

If you aren’t restoring state snapshots for an undo, then the undo/redo operations in your app need to become a lot smarter. They are no longer blind pointers to a state object, but functions that need to know more about your specific application needs.

An alternative to the memento pattern for undo is the [command pattern](https://en.wikipedia.org/wiki/Command_pattern). The general idea is that _every_ mutation in your application is now a command that has some way to execute a change and some way to revert the change. You keep a log every command that has been performed so you can shuffle them around to either an undo stack or a redo stack.

```typescript
const myCommand = {
  params: {
    id: "xxx",
  },
  exec() {
    // ...
  },
  undo() {
    // ...
  },
};
```

Here’s where things get tricky: Using commands forces you to capture and encode the user intent into the command. When your user hits `⌘+z`, the only context it will have to know what needs to be undone is whatever exists in the log.

So besides just being able to execute and undo, each entry in the command log should contain answers to at least these questions:

1. **What changed?** This is purposefully broad. We need to know what change was made so that we can execute. In some cases, we may also need to know the previous value
2. **How is the change reversed?** Duh, but we need to know how to reverse the change that was applied. Straightforward to understand, but potentially mind boggling in implementation.
3. **How is the change synced between backend and frontend?** After undoing a change you likely need to persist it somewhere.

Noticeably missing here is “how to undo” and “how to redo”. More details below, but what if I told you a “redo” was just an undo of an “undo”? 🤯

When a user action occurs, we want to package up the answers to all of these questions into a single structure. This is the _log_ from which you can derive undo, redo, and persistence operations. The log is a powerful concept that also makes the undo/redo operation more surface agnostic. You could retain a similar log on the backend and drive your undo/redo there.

So far this is just conceptual which is a good thing. This log can be represented in different ways, but I’ll detail out a possible approach below.

Ok, let’s get practical.

## The gist

Here’s a simplified starting point of how things could work:

```typescript
const state = {/* ... */}

function dispatch(command) {
	// TODO: Where do the `params` come from?
	const nextState = command.exec(state, command.params);
	nextState.undoStack.push(command);
	// TODO: What happens to the the redo stack here if there are
	// items present?

	// Package up a call to the backend
	command.sync(nextState, command.params)
}

function undo() {
	const command = state.undoStack.pop();
	if (command) {
		command.undo(state, command.params);
		state.redoStack.push(command);
	}
	command.sync(nextState, command.params);
}

function redo() {
	const command = state.redoStack.pop();
	if (command) {
		command.redo(state, command.params);
		state.undoStack.push(command);
	}
	command.sync(nextState, command.params);
}

// In the application
funcion createMyCommand(params) {
	return Command({
		params,
		exec(state, params) {
			// update state
		},
		undo(state, params) {
			// undo state
		},
		sync(state, params) {
			fetch('/api', {
				//
			})
		}
	})
}

<button onClick={() => {
  dispatch(createMyCommand({
	  id: 'some_id',
	  nextValue: 3,
	  previousValue: 2
  }))
}}>Do action</button>
```

This is a very Redux-y style architecture that I think fits naturally. We `dispatch` commands to a central handler that orchestrates the state updates and backend calls. When you `dispatch` a command, we move it to the `undoStack`. When you `undo`, we move it to the `redoStack`.

Note that in the call to `createMyCommand` we are storing both the `nextValue` and the `previousValue` so that we know how to revert the change we’re making. Without this, we won’t know what to do when a user undoes this change. _But_, we can derive this automatically using Immer patches.

## Transactions With Immer Patches

The nice thing about the memento pattern is that we don’t have to keep track of state changes. We just perform our state update and stash the result. We can do that same kind of thing using Immer patches without some of the drawbacks of storing the entire state tree.

Immer has the ability to generate patches for us when mutating an object that describe the diff of the change. We can use this to avoid needing to manually track previous and next values in our command params.

There’s one more term I want to introduce here and that’s a “transaction”. The term is a little loaded as it means different things in different contexts, but here I’m defining it as a state change that’s occurred with specific params. When we execute a command, it creates a _transaction_. The transaction is what actually gets tracked in our log and can contain more information about the result of running the command.

Here’s an example of what a log entry could look like:

```typescript
{
	// May be helpful to have an id for this transaction
	id: "xxxx",

	// The command that created this transaction so we can
	// get back to it
  command: /* ... */

  // A list of inverse patches
  "inversePatches": [
	  { type: "replace", path: "/some/path", value: "foo" }
  ],

  // A list of forward patches
  "patches": [
	  { type: "replace", path: "/some/path", value: "bar" }
  ]
}
```

Immer has the benefit of making our state updates pretty concise. Now, our pseudo-code can look more like this:

```typescript
import { produceWithPatches, applyPatches } from 'immer';

const state = {/* ... */}

function dispatch(command) {
	const [nextState, patches, inversePatches] = produceWithPatches(
		state,
		draft => command.exec(draft, command.params)
	);
	const transaction = createTransaction({
		command,
		patches,
		inversePatches
	});
	nextState.undoStack.push(transaction);
	// TODO: What happens to the the redo stack here if there are
	// items present?

	// Package up a call to the backend
	command.sync(nextState, transaction)
}

function undo() {
	const transaction = state.undoStack.pop();
	if (transaction) {
		transaction.command.undo(state, transaction);
		state.redoStack.push(transaction);
	}
	command.sync(nextState, transaction);
}

function redo() {
	const transaction = state.redoStack.pop();
	if (transaction) {
		transaction.command.redo(state, transaction);
		state.undoStack.push(transaction);
	}
	command.sync(nextState, transaction);
}

// In the application
funcion createMyCommand(params) {
	return Command({
		params,
		exec(state, params) {
			// update state
		},
		undo(state, transaction) {
			// We can revert the change by applying the inverse patches
			applyPatches(state, transaction.inversePatches);
		},
		sync(state, transaction) {
			fetch('/api', {
				method: "POST",
				body: JSON.stringify(transaction.patches)
			})
		}
	})
}

<button onClick={() => {
  dispatch(createMyCommand({
	  id: 'some_id',
	  nextValue: 3,
	  previousValue: 2
  }))
}}>Do action</button>
```

If your frontend backend can both handle patches, then this might be enough right here! When an event happens, apply the changes locally with the patches and then send the patch to your backend to apply the same operations.

This is a reasonable approach. It’s succinct and somewhat standardized, but there are tradeoffs. Client and server need to agree on how patches are applied, otherwise there’s a chance of data being out-of-sync. It’s also very coupled to the shape of the data you are changing. If you are updating an item within an array, a patch will locate that item by its index. If the index changes, you may be updating the wrong item, so you have to be sure no other changes have come in that may have updated the array.

## The redo stack

- The GURQ

I've always found it most intuitive to model is a two stacks: an undo stack and a redo stack. A typical implementation is a long the lines of:

- A change is applied and pushed to the undo stacks
- To undo, the change is removed from the undo stack and pushed to the redo stack
- To redo, the change is removed from the redo stack and pushed to the undo stack

<Sketch> ??

One point of complexity is what happens to the stacks after an undo.
Frequently, implementations will clear the redo stack in this scenario. It makes sense; if you've made a change after undoing you've sort of rewritten the past. In a lot of cases, "redoing" implies that you're redoing a change that was made against a _particular_ state value. If that current value has now changed, all bets are off.

<example> ??

That said, there is an argument to be made to not clear the redo stack. (See Figma, other examples).

**In a way, implementing undo is like building a multi-player application for a single user.** The second player is the same user, from the past. This is especially apparent if you have something like auto-save.

## Dynamically computed redo, a.k.a. undoing an undo

## Zod-powered Command Definitions

In this world of command-based undo, I like having the commands co-located together so you can easily see all of the information together.

```typescript
// commands.ts
export const setPriority = defineCommand({
  type: "SetPriority",
  params: z.object({
    id: z.string().uuid(),
    priority: z.enum(["low", "medium", "high"]),
  }),
  exec(state, params) {
    state.issues[params.id].priority = params.priority;
  },
});
```

With some TypeScript magic, you can have some nice inference so that functions on the command are fully typed based on the known `state` and `params` values. Notice here that I’m using a Zod schema to define what the input type should be.

——

It may be helpful to attach more information:

```typescript
{
  // An `id` here is probably useful
  id: "xxx",

  // The original action that triggered this change
  action: {
    type: "SET_CONTENT",
    payload: {
      id: 'some_entity',
      value: "bar"
    },
    meta: {
      // Can attach metadata to stash transient state you might want to restore
      currentFocusId: 'xxx'
    }
  },

  // Patches could be an implementation detail. Use them on the
  // frontend to compute states, but pass the output to the
  // server directly.
  "inversePatches": [
	  { type: "replace", path: "/some/path", value: 'foo'}
  ],

	// Snapshots of the changes to send the backend. Precomputed on
	// the frontend to avoid issues with patches.
  snapshot: {
    id: 'some_entity',
    content: 'bar'
  }
}
```

Things start to get verbose, but this is also where it starts to be more application-dependent.

## Event Coalescing

## Ephemeral States & Side effects

We can harden the implementation as much as we can to make the right way easy, but undo requires some diligence when developing. Each command needs to think about what data it might need when undo or redoing the action. For example, maybe you want to restore a focus or selection state when you undo. In order to do that, you’ll need to have a hook to do that in your transaction, perhaps storing the `id` of the element in your event metadata so that when you undo it, you know how to get the element and focus it.

## Redo vs. Exec

## Summary

- Implement undo like it's multiplayer even if it's not. It will be the most
  flexible.

## Links

- https://www.placemark.io/post/how-placemark-implements-undo-redo-to-make-map-making-safe-and-chill
- https://medium.com/@mweststrate/distributing-state-changes-using-snapshots-patches-and-actions-part-1-2811a2fcd65f
- https://github.com/zaboople/klonk/blob/master/TheGURQ.md
- https://www.figma.com/blog/how-figmas-multiplayer-technology-works/
- https://liveblocks.io/blog/how-to-build-undo-redo-in-a-multiplayer-environment
- https://www.youtube.com/watch?v=WxK11RsLqp4
- https://www.youtube.com/watch?v=Wo2m3jaJixU
- https://twitter.com/steveruizok/status/1566142910546038784
- https://maxliani.wordpress.com/2021/09/01/undo-the-art-of-part-1/
