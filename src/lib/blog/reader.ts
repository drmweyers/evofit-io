import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { parseFrontmatter, safeParseFrontmatter, slugifyCategory, Post } from './schema';

const DEFAULT_CONTENT_DIR = path.resolve(process.cwd(), 'content/blog');

export class PostNotFoundError extends Error {
  constructor(slug: string) {
    super(`Post not found: ${slug}`);
    this.name = 'PostNotFoundError';
  }
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export type PostWithHtml = Post & { html: string; readingTimeMin: number; headings: Heading[] };

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] || []), 'id', 'className'],
    a: [...(defaultSchema.attributes?.['a'] || []), 'href', 'title', 'target', 'rel'],
  },
};

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

function stripLeadingH1(markdown: string, title: string): string {
  const lines = markdown.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    if (line.startsWith('# ')) {
      const h1Text = line.replace(/^#\s+/, '').trim();
      if (
        h1Text.toLowerCase().startsWith(title.toLowerCase().slice(0, 40)) ||
        title.toLowerCase().startsWith(h1Text.toLowerCase().slice(0, 40))
      ) {
        lines.splice(i, 1);
        return lines.join('\n').trimStart();
      }
    }
    break;
  }
  return markdown;
}

/**
 * Extract H2 and H3 headings with their IDs from rendered HTML.
 */
export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10) as 2 | 3;
    const id = match[2];
    // Strip HTML tags from heading text
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    if (id && text) {
      headings.push({ id, text, level });
    }
  }
  return headings;
}

function filenameToSlug(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
}

export async function readPost(slug: string, contentDir: string = DEFAULT_CONTENT_DIR): Promise<PostWithHtml> {
  if (!fs.existsSync(contentDir)) {
    throw new PostNotFoundError(slug);
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  let matchingFile = files.find((f) => filenameToSlug(f) === slug);

  if (!matchingFile) {
    for (const file of files) {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      let data: Record<string, unknown>;
      try {
        ({ data } = matter(raw));
      } catch {
        continue;
      }
      if (data.slug === slug) {
        matchingFile = file;
        break;
      }
    }
  }

  if (!matchingFile) {
    throw new PostNotFoundError(slug);
  }

  const filePath = path.join(contentDir, matchingFile);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const frontmatter = parseFrontmatter(data);
  const cleanedContent = stripLeadingH1(content, frontmatter.title);
  const html = await markdownToHtml(cleanedContent);
  const readingTimeMin = estimateReadingTime(content);
  const headings = extractHeadings(html);

  return { ...frontmatter, html, readingTimeMin, headings };
}

export async function listPosts(options?: {
  includeDrafts?: boolean;
  contentDir?: string;
}): Promise<Post[]> {
  const contentDir = options?.contentDir ?? DEFAULT_CONTENT_DIR;
  const includeDrafts = options?.includeDrafts ?? false;

  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const posts: Post[] = [];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');

    let data: Record<string, unknown>;
    try {
      ({ data } = matter(raw));
    } catch (err) {
      console.warn(`[blog] Skipping ${file} — YAML parse error:`, (err as Error).message);
      continue;
    }

    const result = safeParseFrontmatter(data);
    if (!result.success) {
      console.warn(`[blog] Skipping invalid post ${file}:`, result.error.message);
      continue;
    }

    if (!includeDrafts && result.data.draft) continue;
    posts.push(result.data);
  }

  return posts.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export async function listPostsByTag(tag: string, contentDir?: string): Promise<Post[]> {
  const all = await listPosts({ includeDrafts: false, contentDir });
  const normalised = tag.toLowerCase();
  return all.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(normalised));
}

export async function listPostsByCategory(category: string, contentDir?: string): Promise<Post[]> {
  const all = await listPosts({ includeDrafts: false, contentDir });
  const normalised = category.toLowerCase();
  return all.filter((p) => (p.category || 'Uncategorized').toLowerCase() === normalised);
}

export async function getAllTags(contentDir?: string): Promise<string[]> {
  const all = await listPosts({ includeDrafts: false, contentDir });
  const tagSet = new Set<string>();
  for (const post of all) {
    for (const tag of post.tags) tagSet.add(tag);
  }
  return Array.from(tagSet).sort();
}

export async function getAllCategories(contentDir?: string): Promise<string[]> {
  const all = await listPosts({ includeDrafts: false, contentDir });
  const catSet = new Set<string>();
  for (const post of all) {
    catSet.add(post.category || 'Uncategorized');
  }
  return Array.from(catSet).sort();
}

/**
 * Get related posts scored by shared category (2pts) + shared tags (1pt each).
 */
export function getRelatedPosts(current: Post, allPosts: Post[], maxCount = 3): Post[] {
  const scored = allPosts
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 2;
      const currentTags = new Set(current.tags.map((t) => t.toLowerCase()));
      for (const tag of p.tags) {
        if (currentTags.has(tag.toLowerCase())) score += 1;
      }
      return { post: p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount);

  return scored.map(({ post }) => post);
}
