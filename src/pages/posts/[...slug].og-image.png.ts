import type { APIRoute } from 'astro';
import { generateOgImage } from "../../utils/generate-og-image";
import { getCollection } from 'astro:content';

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: post
  }))
}

export const GET: APIRoute = async function get({ url, params, props }) {
  const image = await generateOgImage({
    title: props.data.title,
    description: props.data.description,
    date: props.data.date,
    image: props.data.ogImage
  })

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

