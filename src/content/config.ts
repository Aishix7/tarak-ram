// src/content/config.ts
import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    category: z.string(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
});

const newsletterCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    author: z.string().default("Tarak Ram"),
    image: z.string().optional(),
  }),
});

export const collections = {
  articles: articlesCollection,
  newsletters: newsletterCollection,
};
