import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock the reader module
vi.mock('@/lib/blog/reader', () => ({
  listPosts: vi.fn(),
  getAllTags: vi.fn().mockResolvedValue([]),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => ({ get: vi.fn() })),
}));

import { listPosts } from '@/lib/blog/reader';

const mockPosts = [
  {
    title: 'Post One',
    slug: 'post-one',
    excerpt: 'Excerpt for post one.',
    tags: ['fitness'],
    hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/post-one/hero.jpg',
    hero_image_alt: 'Post one hero',
    published_at: '2026-04-10T08:00:00Z',
    updated_at: '2026-04-10T08:00:00Z',
    draft: false,
    product_id: 'evofit',
    cc_post_id: 'cc_001',
    author: { name: 'EvoFit Team' },
  },
  {
    title: 'Post Two',
    slug: 'post-two',
    excerpt: 'Excerpt for post two.',
    tags: ['ai'],
    hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/post-two/hero.jpg',
    hero_image_alt: 'Post two hero',
    published_at: '2026-04-09T08:00:00Z',
    updated_at: '2026-04-09T08:00:00Z',
    draft: false,
    product_id: 'evofit',
    cc_post_id: 'cc_002',
    author: { name: 'EvoFit Team' },
  },
];

import BlogIndexPage from './page';


describe('BlogIndexPage component', () => {
  it('renders with posts', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts as any);
    const { container } = render(
      await BlogIndexPage({ searchParams: Promise.resolve({}) })
    );
    expect(container).toBeTruthy();
    expect(container.textContent).toContain('EvoFit Blog');
  });

  it('renders empty state when no posts', async () => {
    vi.mocked(listPosts).mockResolvedValue([]);
    const { container } = render(
      await BlogIndexPage({ searchParams: Promise.resolve({}) })
    );
    expect(container.textContent).toContain('warming up');
  });

  it('renders with page param', async () => {
    vi.mocked(listPosts).mockResolvedValue(mockPosts as any);
    const { container } = render(
      await BlogIndexPage({ searchParams: Promise.resolve({ page: '1' }) })
    );
    expect(container).toBeTruthy();
  });
});
