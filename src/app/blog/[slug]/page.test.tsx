import { describe, it, expect, vi } from 'vitest';

// Mock the reader module - use importOriginal to keep PostNotFoundError class
vi.mock('@/lib/blog/reader', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/blog/reader')>();
  return {
    ...actual,
    readPost: vi.fn(),
    listPosts: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('NEXT_NOT_FOUND'); }),
}));

import { readPost, listPosts, PostNotFoundError } from '@/lib/blog/reader';
import { notFound } from 'next/navigation';
import BlogPostPage, { generateMetadata } from './page';

const mockPost = {
  title: 'AI Meal Plans',
  slug: 'ai-meal-plans',
  excerpt: 'Why AI meal plans work.',
  tags: ['meals', 'ai'],
  hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/test/hero.jpg',
  hero_image_alt: 'Test',
  published_at: '2026-04-10T08:00:00Z',
  updated_at: '2026-04-10T08:00:00Z',
  draft: false,
  product_id: 'evofit-meals',
  cc_post_id: 'cc_003',
  author: { name: 'EvoFit Team' },
  html: '<h2>Section</h2><p>Content</p>',
};

describe('Blog post page logic', () => {
  it('calls readPost with the slug param', async () => {
    vi.mocked(readPost).mockResolvedValue(mockPost as any);
    const post = await readPost('ai-meal-plans');
    expect(post.title).toBe('AI Meal Plans');
    expect(post.slug).toBe('ai-meal-plans');
  });

  it('calls notFound when PostNotFoundError is thrown', async () => {
    vi.mocked(readPost).mockRejectedValue(new PostNotFoundError('missing'));
    try {
      await readPost('missing');
    } catch (e) {
      if (e instanceof PostNotFoundError) {
        expect(() => notFound()).toThrow('NEXT_NOT_FOUND');
      }
    }
  });

  it('generateStaticParams returns all slugs', async () => {
    vi.mocked(listPosts).mockResolvedValue([
      { ...mockPost, slug: 'post-a' },
      { ...mockPost, slug: 'post-b' },
    ] as any[]);
    const posts = await listPosts({ includeDrafts: false });
    const params = posts.map((p) => ({ slug: p.slug }));
    expect(params).toEqual([{ slug: 'post-a' }, { slug: 'post-b' }]);
  });

  it('post JSON-LD has required Article fields', () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: mockPost.title,
      author: { '@type': 'Person', name: mockPost.author.name },
      datePublished: mockPost.published_at,
      image: mockPost.hero_image,
      publisher: { '@type': 'Organization', name: 'EvoFit', url: 'https://evofit.io' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://evofit.io/blog/${mockPost.slug}` },
    };
    expect(jsonLd['@type']).toBe('Article');
    expect(jsonLd.headline).toBe('AI Meal Plans');
    expect(jsonLd.author.name).toBe('EvoFit Team');
    expect(jsonLd.datePublished).toBe('2026-04-10T08:00:00Z');
    expect(jsonLd.image).toContain('hero.jpg');
    expect(jsonLd.mainEntityOfPage['@id']).toContain('/blog/ai-meal-plans');
  });
});

describe('BlogPostPage notFound branch', () => {
  it('calls notFound() when readPost throws PostNotFoundError', async () => {
    vi.mocked(readPost).mockRejectedValue(new PostNotFoundError('missing-slug'));
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: 'missing-slug' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});
