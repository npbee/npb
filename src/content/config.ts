import { defineCollection, z, CollectionEntry } from "astro:content";

export const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string()
  }),
});

export type Post = CollectionEntry<'blog'>

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    graphic: z.string(),
    link: z.string().url(),
  }),
});

export type Project = CollectionEntry<'projects'>

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
