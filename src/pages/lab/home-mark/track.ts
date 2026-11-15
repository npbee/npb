// Dev only: stores the analysed track the home mark is drawn from, in
// src/data/home-mark-track.json. The analysis runs in the browser, on
// /lab/home-mark/analyse, since it needs Web Audio to decode and filter.
import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;

const file = path.resolve("src/data/home-mark-track.json");

/** Stores { source, low, high } */
export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return new Response(null, { status: 404 });
  const { source, low, high } = await request.json();
  const track = { source, analysedAt: new Date().toISOString(), low, high };
  await fs.writeFile(file, JSON.stringify(track) + "\n");
  return Response.json({ path: "src/data/home-mark-track.json", points: low.length });
};
