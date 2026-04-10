import { z } from 'zod';

export const AUTHOR_PRESETS = ['EvoFit Team', 'BCI Innovation Labs', 'Mark Weyers Ed.D'] as const;

const AuthorSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().url().optional(),
});

export const PostFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  tags: z.array(z.string()),
  hero_image: z.string().url(),
  hero_image_alt: z.string().min(1),
  published_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }).optional(),
  draft: z.boolean(),
  product_id: z.string().min(1),
  cc_post_id: z.string().min(1),
  author: AuthorSchema.optional(),
}).transform((data) => {
  // Apply defaults
  const author = data.author ?? { name: 'EvoFit Team' };
  const updated_at = data.updated_at ?? data.published_at;
  return {
    ...data,
    author,
    updated_at,
  };
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
