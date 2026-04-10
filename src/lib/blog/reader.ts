import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { parseFrontmatter, safeParseFrontmatter, Post } from './schema';

// Default content directory — production path
const DEFAULT_CONTENT_DIR = path.resolve(process.cwd(), 'content/blog');

export class PostNotFoundError extends Error {
  constructor(slug: string) {
    super(`Post not found: ${slug}`);
    this.name = 'PostNotFoundError';
  }
}

export type PostWithHtml = Post & { html: string };

/**
 * Converts markdown body to HTML using remark + remark-gfm + remark-html
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return result.toString();
}

/**
 * Extract slug from a filename like "2026-04-10-my-slug.md" → "my-slug"
 */
function filenameToSlug(filename: string): string {
  // Strip date prefix (YYYY-MM-DD-) and .md suffix
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
}

/**
 * Read a single post by slug from the given directory.
 * Matches first by filename convention (YYYY-MM-DD-{slug}.md), then by frontmatter slug field.
 * Throws PostNotFoundError if no matching file exists.
 */
export async function readPost(slug: string, contentDir: string = DEFAULT_CONTENT_DIR): Promise<PostWithHtml> {
  if (!fs.existsSync(contentDir)) {
    throw new PostNotFoundError(slug);
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

  // First try filename-based match (fast path for production content)
  let matchingFile = files.find((f) => filenameToSlug(f) === slug);

  // If no filename match, fall back to reading frontmatter slug field
  if (!matchingFile) {
    for (const file of files) {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data } = matter(raw);
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
  const html = await markdownToHtml(content);

  return { ...frontmatter, html };
}

/**
 * List all posts sorted DESC by published_at.
 * Filters drafts unless includeDrafts: true.
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
    const { data } = matter(raw);

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

  // Sort DESC by published_at
  return posts.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

/**
 * List posts filtered by tag (case-insensitive).
 */
export async function listPostsByTag(tag: string, contentDir?: string): Promise<Post[]> {
  const all = await listPosts({ includeDrafts: false, contentDir });
  const normalised = tag.toLowerCase();
  return all.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(normalised));
}

/**
 * Returns a unique list of all tags across all non-draft posts.
 */
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
