---
title: The world of undo
date: 2023-10-23
description: One of the hardest problems that every app has.
---

I’m fascinated by undo/redo in web applications. It’s a useful addition to almost any app and arguably expected in apps of a certain complexity. If it’s there, it becomes part of how the product is used, like search or a command palette. And it’s invisible! Users can’t see the stacks of undos and redos sitting idly behind the scenes. As a user, undo/redo is intuitive to understand. I do a thing, mash undo, and it undoes it. But as an implementation, undo can be a mind melting dive into time travel. 

On the frontend side, there are plenty of libraries available for dealing with undo, but they are usually scoped to a single component or come with constraints in how you have to structure your undoable state. If you’re building an *app* on the scale of something like Figma or Excalidraw, then undo stops being a “feature” and starts becoming part of your architecture. “How do I undo this?” will be a constant mantra and the answer to that question will guide how you implement each feature.

Digging into these concepts, I always seem to first land on the simple examples and then jump straight to the land of CRDTs without anything in between. Simple is great if it works, but may not be an option. CRDT’s are fascinating (big fan of local first here), but not always a practical option. 

I wanted to get some thoughts down about how undo *patterns* could be applied using everyday, “boring” frontend tooling. Let’s see…

## The memento pattern

The memento pattern is usually the first stop approach for undo on the frontend. It’s a state-based approach that deals with undo/redo from the perspective of state changes. The basic idea is save a snapshot of the entire state for every change made. Undoing means restoring a previous state. If you’ve built a lot of Redux apps, this approach fits right in. It’s a straightforward and generalizable approach and it’s also the [official recommendation](https://redux.js.org/usage/implementing-undo-history) from the Redux docs. I’ve used this approach with good success, so if it works for you I’d recommend it. 

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

1. You need to store your entire state tree for every change, which could get excessively large. In practice, I never had an issue with this. If you’re following Redux/React typical best practices, you are likely performing immutable updates and achieving some structural sharing.
2. Your application state is not centralized in a single, undoable object, but spread across multiple stores.
3. After an undo, you need to persist a save to the backend in a format that’s different from your state tree. Just knowing the state snapshot is not enough information to persist the change.
4. There are other side effects that need to happen with an undo that aren’t necessarily items you want to store in your state. For example, re-focusing an input element after undoing an edit.
5. It’s all-or-nothing. Every action has to be undoable. If you perform an action on the state that is *not* undoable, you have to clear the undo stack. 

## The command pattern

The next recommended approach for undo is the command pattern. Contrasted with the state-based approach above, this pattern is more action-based. Undo/redo is handled by defining commands that can execute and undo a change.

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

To make a change on the system, a command is dispatched to a central handler to call the necessary functions and move the command between an undo stack and a redo stack.

```typescript
function dispatch(command) {
	command.exec();
	undoStack.push(command);
}

function undo() {
	const command = undoStack.pop();
	if (command) {
		command.undo();
	}
	redoStack.push(command);
}

function redo() {
  const command = redoStack.pop();
	if (command) {
		command.exec();
	}
	undoStack.push(command);
}
```

This approach is more flexible, but less generalizable. Since we’re defining a common structure for each command, it now means all of your updates go through a single handler, like Redux. Each command may not have the same requirements for persistence, so it can be challenging to encode that in a clear way. For example, for create operations you may want to call the backend first before apply state updates. 

This can be good or bad depending on your taste (I like it). Regardless, defining commands for every action can be tedious and it also means you’re now clearly down the path of a custom architecture. There are few existing frontend libraries that work like this, so you’re making it up yourself.

## A common-thread: Keeping a log

The state-based approach and the action-based approach are different in how they approach undo, but they share a common pattern: keeping a log of what happened. This probably seems pretty obvious to point out, but to undo a change you have to know that a change occurred and you have to know a few details about how it went down. 

In the memento approach, the log is essentially just the entire state value. This is nice because it’s automated and you don’t have to manually specify what to store in the log. In the command approach, you have capture the user intent in the log entry and store any information you think you might need to execute or undo the change. For example, that may mean storing the previous and next values of a particular item so that you can revert a change to its previous value.

```typescript
const myCommand = {
  params: {
    id: "xxx",
    previous: 'foo',
    next: 'bar'
  },
  exec() {
    state[params.id].value === params.next;
  },
  undo() {
    state[params.id].value === params.previous;
  },
};
```

You could also store an `id` for an input you need to refocus:

```typescript
const myCommand = {
  params: {
    id: "xxx",
    previous: 'foo',
    next: 'bar',
    focusId: "yyy"
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

## Data Mutations

There are a few broad categories we could use to describe how an application treats its data mutations. On the one end there is *server-first*, which hits the server for every data mutation. This might be using `form` elements and full-page reloads like a classic Rails app, or even a single-page application that uses `fetch` and waits for the server response before committing the UI. On the other end there is *local-first*, where all data mutations happen on the client and are then synced to the server for persistence. Somewhere in the middle there is a pattern called *optimistic UI* that still primarily relies on the server for data mutations, but updates the client state locally assuming the server operation is successful. The [Remix docs](https://remix.run/docs/en/main/discussion/pending-ui) have a good article about this.

How your application deals with data mutations will be an important factor of the undo implementation. In a typical app, you can co-locate the data mutation strategy with the action in the place that it originated. Full-stack frameworks like Remix or Sveltekit allow you to define `actions` on a route where you can choose how to handle the mutation. Here’s an example from the [Remix docs](https://remix.run/docs/en/main/discussion/pending-ui#examples):

```typescript
import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { useNavigation } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
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
  const isSubmitting =
    navigation.formAction === "/create-project";

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

In contrast, an undo operation is detached from the context it originated from, so the mutation strategy needs to be encoded into the command or into the command handler. Different commands may have different mutation strategies or the same command may even have different strategies between the `exec` and `undo` functions. 

```typescript
function undo() {
	const command = undoStack.pop();
	if (command) {
		// Do I hit the server first?
		// Update local state first? 
		// Optimistic UI? 
		// 🤔
	}
}
```

In my experience, I’ve found that it’s much easier to pick a single mutation strategy (either local-first or server-first) and use it for everything rather than trying to support different mutation strategies. 

In practice, most apps with a serious undo implementation follow the local-first paradigm. 

## A hybrid approach?

There’s no reason why we can’t have a history log that has elements of both the memento and command-based approaches. One idea is to use Immer patches. When a command is executed, it creates an entry that represents a single state change. The transaction has the `patches` and `inversePatches` attached. Commands can receive these patches and choose to apply them.

```typescript
import { produceWithPatches, applyPatches } from 'immer';

function dispatch(command) {
	const [nextState, patches, inversePatches] = produce(
		state, 
		draft => command.exec(draft)
	);
	const transaction = createTransaction({
		command, // Store the command so we can get back to it
		patches,
		inversePatches
	});
	
	// The transaction is what gets push to the undo stack
	undoStack.push(transaction);
}

function undo() {
	const transactionToUndo = undoStack.pop();
	if (transactionToUndo) {
		const [nextState, patches, inversePatches] = produce(
			currentState, 
			draft => transactionToUndo.command.undo(draft, transactionToUndo)
		);
		const nextTransaction = createTransaction({
			command,
			patches,
			inversePatches
		})
		redoStack.push(transaction);
	}
}

const myCommand = {
  params: {
    id: "xxx",
    previous: 'foo',
    next: 'bar',
    focusId: "yyy"
  },
  async exec(state, params) {
    state[params.id].value === params.next;
    await callBackend(txn.patches)
  },
  async undo(state, txn) {
		applyPatches(state, txn.inversePatches);
    document.getElementById(params.focusId)?.focus();
		await callBackend(txn.inversePatches)
  },
};
```

Patches are fairly standardized, so it’s possible that you could send patches directly to your backend as well. 

## Dynamic Redos, a.k.a Undoing an undo

You may have noticed above that when we performed an undo, we created a *new* transaction with its own `inversePatches`. The inverse of an undo is a redo, so we could define a redo as:

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
	}
}
```

Things start to get a little mind bending here. Applying patches in this way is convenient, but it can also have other benefits, particularly if you’re in a multi-player situation. Trying to define both an `undo` and a `redo` upfront may mean that by the time you perform a `redo`, you’re using outdated information. Using patches gives you the information about the change you made at the time the undo was performed. 

<example>

If you’re not dealing with multi-player, then this is probably not worth the extra mental gymnastics. 

## Altering the past, a.k.a. Mind the GURQ

## Event coalescing, a.k.a. Event smooshing

## Redo vs. Exec

- create vs archive linear

## Summary

## Links
