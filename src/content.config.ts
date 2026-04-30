import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    featured: z.boolean().default(false),
    category: z.enum(['frontend', 'backend', 'fullstack', 'mobile']),
    techs: z.array(z.string()),
    cover: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    testCredentials: z.array(
      z.object({
        label: z.string(),
        user: z.string(),
        password: z.string(),
      })
    ).optional(),
    colSpan: z.enum(['4', '8']).default('4'),
    available: z.boolean().default(true),
  }),
});

export const collections = {
  projects: projectsCollection,
};
