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

const booksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    author: z.string(),
    coverImage: z.string(),
    description: z.string(),
    sentence1: z.string().optional(),
    sentence2: z.string().optional(),
    sentence3: z.string().optional(),
    impressions: z.string().optional(),
    whoShouldRead: z.string().optional(),
    topQuotes: z.array(z.string()).optional().default([]),
  }),
});

export const collections = {
  articles: articlesCollection,
  newsletters: newsletterCollection,
  books: booksCollection,
};
