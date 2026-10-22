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

describe('sitemap uniqueness', () => {
  const post = (slug: string, title: string, published: string) => ({
    title, slug, excerpt: 'E', tags: [], hero_image: 'https://example.com/x.jpg', hero_image_alt: 'x',
    published_at: published, updated_at: published, draft: false, product_id: 'evofit', cc_post_id: slug,
    author: { name: 'EvoFit Team' },
  });

  it('lists a URL once even when two posts share a slug', async () => {
    vi.mocked(listPosts).mockResolvedValue([
      post('same-slug', 'Same', '2026-04-01T00:00:00Z'),
      post('same-slug', 'Same', '2026-04-02T00:00:00Z'),
    ] as any);
    vi.mocked(getAllTags).mockResolvedValue([]);
    const { default: sitemap } = await import('./sitemap');
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls.filter((u) => u === 'https://evofit.io/blog/same-slug')).toHaveLength(1);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('drops a truncated stub when the full-length twin exists, but keeps numbered series', async () => {
    vi.mocked(listPosts).mockResolvedValue([
      post('gut-healing-the-original-discovery-nobody', 'Gut Healing: The Original Discovery Nobody ', '2026-04-16T00:00:00Z'),
      post('gut-healing-the-original-discovery-nobody-talks-about', 'Gut Healing: The Original Discovery Nobody Talks About', '2026-04-26T00:00:00Z'),
      post('deep-dives', 'Deep Dives', '2026-04-18T00:00:00Z'),
      post('deep-dives-2', 'Deep Dives Part Two', '2026-04-19T00:00:00Z'),
    ] as any);
    vi.mocked(getAllTags).mockResolvedValue([]);
    const { default: sitemap } = await import('./sitemap');
    const urls = (await sitemap()).map((u) => u.url);
    expect(urls).not.toContain('https://evofit.io/blog/gut-healing-the-original-discovery-nobody');
    expect(urls).toContain('https://evofit.io/blog/gut-healing-the-original-discovery-nobody-talks-about');
    expect(urls).toContain('https://evofit.io/blog/deep-dives');
  });
});
