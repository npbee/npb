---
title: Challenges of a Local-first App
date: 2022-07-16
layout: ../../layouts/Post.astro
description: Syncing? Storage? 
---

# Challenges of a Local-first App

Recently I've been getting excited about [local-first](https://www.inkandswitch.com/local-first/) applications so I thought I would try my hand at building one. 
The app will be a personal songwriting tool for organizing, versioning, and making notes on in-progress songs. Sort of a personal Soundcloud app of sorts.
I think I've finally settled on a decent architecture, but the process has forced me to rethink some of my go-to patterns that I use to build on cloud-based software.

## Am I the Client or the Server?

In my normal day-to-day work I'm almost always writing code for the _client_.
You want data? Make an HTTP request from the _server_ to get it. 
You need a file? Make an HTTP request from the _server_. 
In a local-first app those boundaries aren't as clear. 
I can write a SQL query right next to my React component!

```tsx
function SomeComponent({ db, id }) {

  async function updateName(name) {
    await db.execute(`
      UPDATE songs
      SET name = ?
      WHERE id = ?
    `, 
    [name, id]
  }

  return (
    <input
      onChange={evt => updateName(evt.target.value)} 
    />
  );
}
```

## Storage? Also Syncing. And undo/redo. Oh also searching?

So far I've found it challenging to get all of these features out of the box.
Like anything in software, the architecture needs to be based on the needs of the application.
One of the best parts about local-first apps is that your data is truly local. 
But that also means that if you _want_ that data to be available elsewhere (like on a phone perhaps), then you have to figure out how to sync the data.
Additionally, if you want multiple people to interact with that data you need to think about merging and conflict resolution.
Tying in undo/redo into syncing and conflict resolution makes all of that a _hard_ application to build.

The rage right now for local-first apps is [CRDTs](https://crdt.tech/). 
I'm still wrapping my head around it, but I understand enough to know that I don't want to build this myself.
There are a couple of libraries out there that do this like [Automerge](https://automerge.org/) and [Y.js](https://yjs.dev/).
Y.js in particular seems pretty darn good as it has syncing and undo/redo out of the box.

The last challenge that relates here is searching.
For a local-first app, it feels strange to _not_ choose SQLite since it can easily and efficiently search and query.
Using a CRDT library feels like it forces data into a document-based storage format which conflicts a little with how one might typically structure a SQLite database.

Can you have a CRDT data structure that supports undo/redo and store that in SQLite? 
Probably, but I haven't figured it out yet.

