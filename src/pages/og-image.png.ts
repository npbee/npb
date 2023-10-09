import type { APIRoute } from 'astro';
import { generateOgImage } from "../utils/generate-og-image";

export const prerender = true;

export const GET: APIRoute = async function get({ url }) {
  const image = await generateOgImage({
    title: 'Nick Ball',
    description: 'Software developer based in Portland, Oregon'
  })

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
