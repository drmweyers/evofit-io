import { z } from 'zod';

export const AUTHOR_PRESETS = ['EvoFit Team', 'BCI Innovation Labs', 'Mark Weyers Ed.D'] as const;

export const EVOFIT_CATEGORIES = ['Supplements', 'Training', 'Nutrition', 'Recovery', 'Science', 'Business'] as const;
export type EvofitCategory = typeof EVOFIT_CATEGORIES[number];

const AuthorSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().url().optional(),
});

export const PostFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().optional().default('Uncategorized'),
  tags: z.array(z.string()),
  keywords: z.array(z.string()).optional().default([]),
  hero_image: z.string().url(),
  hero_image_alt: z.string().min(1),
  published_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }).optional(),
  draft: z.boolean(),
  product_id: z.string().min(1),
  cc_post_id: z.string().min(1),
  author: AuthorSchema.optional(),
}).transform((data) => {
  const author = data.author ?? { name: 'EvoFit Team' };
  const updated_at = data.updated_at ?? data.published_at;
  return { ...data, author, updated_at };
});

export type Post = z.infer<typeof PostFrontmatterSchema>;

export function parseFrontmatter(data: unknown): Post {
  return PostFrontmatterSchema.parse(data);
}

export type SafeParseResult =
  | { success: true; data: Post }
  | { success: false; error: z.ZodError };

export function safeParseFrontmatter(data: unknown): SafeParseResult {
  const result = PostFrontmatterSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Slugify a string for URL use (categories, tags, etc.)
 */
export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
