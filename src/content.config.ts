import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/articles' }),
  schema: z.object({
    title: z.string(),
    number: z.number().int().nonnegative(),
    kicker: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    // The Value Graph release this article ships with. The demo opens at it.
    release: z.number().int().nonnegative(),
    linkedin: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
