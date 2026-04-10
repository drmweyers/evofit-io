import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/blog/reader', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/blog/reader')>();
  return {
    ...actual,
    listPosts: vi.fn(),
    getAllTags: vi.fn(),
  };
});

import { listPosts, getAllTags } from '@/lib/blog/reader';

const mockPosts = [
  {
    title: 'Post A', slug: 'post-a',
    excerpt: 'E', tags: ['fitness'],
    hero_image: 'https://example.com/a.jpg', hero_image_alt: 'A',
    published_at: '2026-04-10T08:00:00Z', updated_at: '2026-04-10T08:00:00Z',
    draft: false, product_id: 'evofit', cc_post_id: 'cc_a',
    author: { name: 'EvoFit Team' },
  },
  {
    title: 'Post B', slug: 'post-b',
    excerpt: 'E', tags: ['ai'],
    hero_image: 'https://example.com/b.jpg', hero_image_alt: 'B',
    published_at: '2026-04-09T08:00:00Z', updated_at: '2026-04-09T08:00:00Z',
    draft: false, product_id: 'evofit', cc_post_id: 'cc_b',
    author: { name: 'EvoFit Team' },
  },
];

describe('sitemap', () => {
  it('includes /blog in sitemap', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts as any);
    vi.mocked(getAllTags).mockResolvedValue(['fitness', 'ai']);
    const { default: sitemap } = await import('./sitemap');
    const urls = await sitemap();
    const urlStrings = urls.map((u) => u.url);
    expect(urlStrings).toContain('https://evofit.io/blog');
  });

  it('includes /blog/{slug} for each post', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts as any);
    vi.mocked(getAllTags).mockResolvedValue([]);
    const { default: sitemap } = await import('./sitemap');
    const urls = await sitemap();
    const urlStrings = urls.map((u) => u.url);
    expect(urlStrings).toContain('https://evofit.io/blog/post-a');
    expect(urlStrings).toContain('https://evofit.io/blog/post-b');
  });

  it('includes /blog/tag/{tag} for each tag', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts as any);
    vi.mocked(getAllTags).mockResolvedValue(['fitness', 'ai']);
    const { default: sitemap } = await import('./sitemap');
    const urls = await sitemap();
    const urlStrings = urls.map((u) => u.url);
    expect(urlStrings).toContain('https://evofit.io/blog/tag/fitness');
    expect(urlStrings).toContain('https://evofit.io/blog/tag/ai');
  });
});
