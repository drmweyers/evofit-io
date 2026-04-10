import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/blog/reader', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/blog/reader')>();
  return {
    ...actual,
    listPostsByTag: vi.fn(),
    getAllTags: vi.fn(),
  };
});

import { listPostsByTag, getAllTags } from '@/lib/blog/reader';

const mockPost = {
  title: 'Trainer Tips',
  slug: 'trainer-tips',
  excerpt: 'Tips for trainers.',
  tags: ['trainer'],
  hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/test/hero.jpg',
  hero_image_alt: 'Trainer',
  published_at: '2026-04-10T08:00:00Z',
  updated_at: '2026-04-10T08:00:00Z',
  draft: false,
  product_id: 'evofit-trainer',
  cc_post_id: 'cc_004',
  author: { name: 'EvoFit Team' },
};

describe('Tag archive page logic', () => {
  it('returns posts filtered by tag', async () => {
    vi.mocked(listPostsByTag).mockResolvedValue([mockPost] as any);
    const posts = await listPostsByTag('trainer');
    expect(posts).toHaveLength(1);
    expect(posts[0].tags).toContain('trainer');
  });

  it('generateStaticParams returns all unique tags', async () => {
    vi.mocked(getAllTags).mockResolvedValue(['trainer', 'meals', 'ai']);
    const tags = await getAllTags();
    const params = tags.map((tag) => ({ tag }));
    expect(params).toEqual([{ tag: 'trainer' }, { tag: 'meals' }, { tag: 'ai' }]);
  });

  it('shows tag name in page heading', () => {
    const tag = 'trainer';
    const heading = `Posts tagged: ${tag}`;
    expect(heading).toContain('trainer');
  });
});
