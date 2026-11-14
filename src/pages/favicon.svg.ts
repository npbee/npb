import type { APIRoute } from "astro";
import { markSvg } from "../utils/favicon";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(markSvg(), { headers: { "Content-Type": "image/svg+xml" } });
