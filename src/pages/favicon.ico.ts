import type { APIRoute } from "astro";
import { markIco } from "../utils/favicon";

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await markIco([16, 32, 48])), {
    headers: { "Content-Type": "image/x-icon" },
  });
