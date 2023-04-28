import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    graphic: z.string(),
    link: z.string().url(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
