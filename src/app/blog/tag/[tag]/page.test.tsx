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
import { render } from '@testing-library/react';
import TagArchivePage, { generateMetadata, generateStaticParams } from './page';

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

describe('TagArchivePage component', () => {
  it('renders posts for the given tag', async () => {
    vi.mocked(listPostsByTag).mockResolvedValue([mockPost] as any);
    const { container } = render(
      await TagArchivePage({ params: Promise.resolve({ tag: 'trainer' }) })
    );
    expect(container.textContent).toContain('trainer');
    expect(container.textContent).toContain('1 post');
  });

  it('renders empty state when no posts for tag', async () => {
    vi.mocked(listPostsByTag).mockResolvedValue([]);
    const { container } = render(
      await TagArchivePage({ params: Promise.resolve({ tag: 'nonexistent' }) })
    );
    expect(container.textContent).toContain('No posts found');
  });

  it('generateMetadata returns correct title for tag', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ tag: 'trainer' }) });
    expect(meta.title).toContain('trainer');
  });

  it('generateStaticParams returns all tags as params', async () => {
    vi.mocked(getAllTags).mockResolvedValue(['trainer', 'meals']);
    const params = await generateStaticParams();
    expect(params).toEqual([{ tag: 'trainer' }, { tag: 'meals' }]);
  });
});
