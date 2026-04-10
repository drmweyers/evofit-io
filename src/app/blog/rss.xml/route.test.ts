import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/blog/reader', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/blog/reader')>();
  return {
    ...actual,
    listPosts: vi.fn(),
  };
});

import { listPosts } from '@/lib/blog/reader';

const mockPosts = Array.from({ length: 25 }, (_, i) => ({
  title: `Post ${i + 1}`,
  slug: `post-${i + 1}`,
  excerpt: `Excerpt for post ${i + 1}.`,
  tags: ['fitness'],
  hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/test/hero.jpg',
  hero_image_alt: 'Hero',
  published_at: `2026-04-${String(i + 1).padStart(2, '0')}T08:00:00Z`,
  updated_at: `2026-04-${String(i + 1).padStart(2, '0')}T08:00:00Z`,
  draft: false,
  product_id: 'evofit',
  cc_post_id: `cc_${i + 1}`,
  author: { name: 'EvoFit Team' },
}));

describe('RSS feed route', () => {
  it('generates RSS XML with required channel elements', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts.slice(0, 20) as any);
    const { GET } = await import('./route');
    const response = await GET();
    expect(response.status).toBe(200);
    const contentType = response.headers.get('Content-Type');
    expect(contentType).toContain('application/rss+xml');
  });

  it('RSS XML contains post titles', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts.slice(0, 5) as any);
    const { GET } = await import('./route');
    const response = await GET();
    const xml = await response.text();
    expect(xml).toContain('<rss');
    expect(xml).toContain('<channel>');
    expect(xml).toContain('<item>');
    expect(xml).toContain('Post 1');
  });

  it('limits to 20 most recent posts', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts as any);
    const { GET } = await import('./route');
    const response = await GET();
    const xml = await response.text();
    // Count <item> occurrences
    const itemMatches = xml.match(/<item>/g) ?? [];
    expect(itemMatches.length).toBeLessThanOrEqual(20);
  });

  it('each item has title, link, description, pubDate, guid', async () => {
    vi.mocked(listPosts).mockResolvedValue([mockPosts[0]] as any);
    const { GET } = await import('./route');
    const response = await GET();
    const xml = await response.text();
    expect(xml).toContain('<title>');
    expect(xml).toContain('<link>');
    expect(xml).toContain('<description>');
    expect(xml).toContain('<pubDate>');
    expect(xml).toContain('<guid');
  });
});
