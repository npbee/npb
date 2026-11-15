// Dev only: the lab's likes, each a full config with a note on what's
// liked about it. Kept in src/data/home-mark-likes.json, which the home
// page will draw its variations from.
import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;

const file = path.resolve("src/data/home-mark-likes.json");

type Like = { id: string; note: string; savedAt: string; config: unknown };

const read = async (): Promise<Like[]> => {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return [];
  }
};

const write = async (likes: Like[]) => {
  await fs.writeFile(file, JSON.stringify(likes, null, 2) + "\n");
  return Response.json({ path: "src/data/home-mark-likes.json", likes });
};

const notFound = () => new Response(null, { status: 404 });

export const GET: APIRoute = async () =>
  import.meta.env.DEV ? Response.json({ likes: await read() }) : notFound();

/** Adds a like: { note, config } */
export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return notFound();
  const { note = "", config } = await request.json();
  const like = {
    id: Date.now().toString(36),
    note,
    savedAt: new Date().toISOString(),
    config,
  };
  return write([...(await read()), like]);
};

/** Edits a like's note: { id, note } */
export const PATCH: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return notFound();
  const { id, note } = await request.json();
  return write((await read()).map((l) => (l.id === id ? { ...l, note } : l)));
};

export const DELETE: APIRoute = async ({ url }) => {
  if (!import.meta.env.DEV) return notFound();
  const id = url.searchParams.get("id");
  return write((await read()).filter((l) => l.id !== id));
};
