import type { APIRoute } from "astro";
import { generateOgImage } from "../utils/generate-og-image";

export const prerender = true;

// Seed 7 is the home page's waveform (components/system/HomeWave.astro)
export const GET: APIRoute = async () =>
  new Response(
    await generateOgImage({
      title: "Nick Ball",
      description: "Software developer based in Portland, Oregon",
      seed: 7,
    }),
    { headers: { "Content-Type": "image/png" } },
  );
