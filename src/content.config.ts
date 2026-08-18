import { defineCollection, z, type CollectionEntry } from "astro:content";
import { glob } from "astro/loaders";

export const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    ogImage: z.string().optional(),
  }),
});

export type Post = CollectionEntry<"blog">;

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    graphic: z.string(),
    link: z.string().url(),
    draft: z.boolean().optional().default(false),
  }),
});

export type Project = CollectionEntry<"projects">;

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
