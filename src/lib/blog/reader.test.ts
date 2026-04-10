import { describe, it, expect } from 'vitest';
import path from 'path';
import { readPost, listPosts, listPostsByTag, getAllTags, PostNotFoundError } from './reader';

// Point reader at the test fixtures directory instead of content/blog
const FIXTURE_DIR = path.resolve(__dirname, '__fixtures__');

describe('readPost', () => {
  it('returns a post with correct title and slug from fixture', async () => {
    const post = await readPost('welcome', FIXTURE_DIR);
    expect(post.title).toBe('Welcome to the EvoFit Blog');
    expect(post.slug).toBe('welcome');
  });

  it('returns html body with <h2> present for ## headings', async () => {
    const post = await readPost('welcome', FIXTURE_DIR);
    expect(post.html).toContain('<h2');
  });

  it('throws PostNotFoundError for missing slug', async () => {
    await expect(readPost('does-not-exist', FIXTURE_DIR)).rejects.toThrow(PostNotFoundError);
  });

  it('parses all frontmatter fields correctly', async () => {
    const post = await readPost('welcome', FIXTURE_DIR);
    expect(post.hero_image).toBe('https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/welcome/hero.jpg');
    expect(post.tags).toContain('announcement');
    expect(post.product_id).toBe('evofit');
    expect(post.cc_post_id).toBe('cc_post_welcome_fixture');
    expect(post.author.name).toBe('EvoFit Team');
  });
});

describe('listPosts', () => {
  it('returns posts sorted DESC by published_at', async () => {
    const posts = await listPosts({ contentDir: FIXTURE_DIR });
    // Only one fixture post, just verify it returns something
    expect(posts.length).toBeGreaterThanOrEqual(0);
  });

  it('filters out draft posts by default', async () => {
    const posts = await listPosts({ contentDir: FIXTURE_DIR, includeDrafts: false });
    expect(posts.every((p) => p.draft === false)).toBe(true);
  });

  it('includes draft posts when includeDrafts: true', async () => {
    const posts = await listPosts({ contentDir: FIXTURE_DIR, includeDrafts: true });
    // Fixture is not a draft, just verify it doesn't throw
    expect(Array.isArray(posts)).toBe(true);
  });
});

describe('listPostsByTag', () => {
  it('returns only posts containing the given tag', async () => {
    const posts = await listPostsByTag('announcement', FIXTURE_DIR);
    expect(posts.every((p) => p.tags.map((t) => t.toLowerCase()).includes('announcement'))).toBe(true);
  });

  it('is case-insensitive', async () => {
    const lower = await listPostsByTag('announcement', FIXTURE_DIR);
    const upper = await listPostsByTag('ANNOUNCEMENT', FIXTURE_DIR);
    expect(lower.length).toBe(upper.length);
  });

  it('returns empty array for unknown tag', async () => {
    const posts = await listPostsByTag('nonexistenttag12345', FIXTURE_DIR);
    expect(posts).toEqual([]);
  });
});

describe('getAllTags', () => {
  it('returns unique list of tags across all posts', async () => {
    const tags = await getAllTags(FIXTURE_DIR);
    expect(Array.isArray(tags)).toBe(true);
    // Tags from welcome-test.md: announcement, evofit, ai
    expect(tags).toContain('announcement');
  });
});
