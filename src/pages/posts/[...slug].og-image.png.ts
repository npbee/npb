import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../utils/generate-og-image";
import { readSeconds, seedFrom } from "../../utils/waveform";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as {
    post: Awaited<ReturnType<typeof getCollection<"blog">>>[number];
  };
  return new Response(
    await generateOgImage({
      title: post.data.title,
      description: post.data.description,
      date: post.data.date,
      seconds: readSeconds(post.body ?? ""),
      seed: seedFrom(post.id),
    }),
    { headers: { "Content-Type": "image/png" } },
  );
};
