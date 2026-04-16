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
import { parseFrontmatter, safeParseFrontmatter, Post } from './schema';

// Default content directory — production path
const DEFAULT_CONTENT_DIR = path.resolve(process.cwd(), 'content/blog');

export class PostNotFoundError extends Error {
  constructor(slug: string) {
    super(`Post not found: ${slug}`);
    this.name = 'PostNotFoundError';
  }
}

export type PostWithHtml = Post & { html: string; readingTimeMin: number };

/**
 * Estimate reading time in minutes (average 230 wpm for technical content).
 */
function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

/**
 * Custom sanitize schema that preserves heading IDs, classes, and
 * other safe attributes stripped by the strict default.
 */
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] || []), 'id', 'className'],
    a: [...(defaultSchema.attributes?.['a'] || []), 'href', 'title', 'target', 'rel'],
  },
};

/**
 * Converts markdown body to sanitized HTML.
 * Adds heading IDs via rehype-slug and anchor links via rehype-autolink-headings.
 */
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

/**
 * Strip the leading H1 from markdown if it duplicates the frontmatter title.
 * SmartSocial commits markdown that starts with `# Title` which duplicates the
 * PostHeader — strip it to avoid a double heading.
 */
function stripLeadingH1(markdown: string, title: string): string {
  const lines = markdown.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue; // skip blank lines
    if (line.startsWith('# ')) {
      // Check if this H1 is similar to the title (fuzzy — first 40 chars)
      const h1Text = line.replace(/^#\s+/, '').trim();
      if (
        h1Text.toLowerCase().startsWith(title.toLowerCase().slice(0, 40)) ||
        title.toLowerCase().startsWith(h1Text.toLowerCase().slice(0, 40))
      ) {
        lines.splice(i, 1);
        return lines.join('\n').trimStart();
      }
    }
    break; // first non-empty line isn't an H1 — leave content as-is
  }
  return markdown;
}

/**
 * Extract slug from a filename like "2026-04-10-my-slug.md" → "my-slug"
 */
function filenameToSlug(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
}

/**
 * Read a single post by slug from the given directory.
 */
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

  return { ...frontmatter, html, readingTimeMin };
}

/**
 * List all posts sorted DESC by published_at.
 */
export async function listPosts(options?: {
  includeDrafts?: boolean;
  contentDir?: string;
}): Promise<Post[]> {
  const contentDir = options?.contentDir ?? DEFAULT_CONTENT_DIR;
  const includeDrafts = options?.includeDrafts ?? false;

  if (!fs.existsSync(contentDir)) {
    return [];
  }

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

    if (!includeDrafts && result.data.draft) {
      continue;
    }

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

export async function getAllTags(contentDir?: string): Promise<string[]> {
  const all = await listPosts({ includeDrafts: false, contentDir });
  const tagSet = new Set<string>();
  for (const post of all) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
