// Dev-only: persists lab configs. The latest save is the file the about page
// reads; every save is also kept in the lab's rail.
import type { APIRoute } from "astro";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
export const STYLE_PATH = "src/data/timeline-style.json";
const SAVES_PATH = "src/components/timeline/lab-saves.json";

async function readSaves(): Promise<unknown[]> {
  try {
    return JSON.parse(await readFile(join(root, SAVES_PATH), "utf8"));
  } catch {
    return [];
  }
}

export const GET: APIRoute = async () => {
  if (!import.meta.env.DEV) return new Response(null, { status: 404 });
  return Response.json(await readSaves());
};

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return new Response(null, { status: 404 });
  const config = await request.json();
  const saves = await readSaves();
  saves.unshift({ savedAt: new Date().toISOString(), config });
  await writeFile(join(root, STYLE_PATH), JSON.stringify(config, null, 2) + "\n");
  await writeFile(join(root, SAVES_PATH), JSON.stringify(saves, null, 2) + "\n");
  return Response.json({ path: STYLE_PATH, saves });
};
