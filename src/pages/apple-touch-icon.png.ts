import type { APIRoute } from "astro";
import { markPng } from "../utils/favicon";

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await markPng(180)), {
    headers: { "Content-Type": "image/png" },
  });
