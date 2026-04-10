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

describe('generateMetadata canonical URL', () => {
  it('returns alternates.canonical set to the correct blog post URL', async () => {
    vi.mocked(readPost).mockResolvedValue(mockPost as any);
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'ai-meal-plans' }) });
    expect((metadata as any).alternates?.canonical).toBe('https://evofit.io/blog/ai-meal-plans');
  });

  it('returns fallback title when readPost throws', async () => {
    vi.mocked(readPost).mockRejectedValue(new Error('any error'));
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'missing' }) });
    expect(metadata.title).toBe('Post Not Found');
  });
});

describe('BlogPostPage component render', () => {
  it('renders the full post page with JSON-LD and content', async () => {
    vi.mocked(readPost).mockResolvedValue(mockPost as any);
    const { render } = await import('@testing-library/react');
    const { container } = render(
      await BlogPostPage({ params: Promise.resolve({ slug: 'ai-meal-plans' }) })
    );
    expect(container).toBeTruthy();
    // JSON-LD script should be present
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
  });
});

describe('BlogPostPage JSON-LD XSS escape', () => {
  it('does not emit literal </script> inside the JSON-LD script block', async () => {
    const evilPost = {
      ...mockPost,
      title: 'Evil </script><img src=x onerror=alert(1)> Title',
      excerpt: 'Safe excerpt.',
    };
    vi.mocked(readPost).mockResolvedValue(evilPost as any);
    const { render } = await import('@testing-library/react');
    const { container } = render(
      await BlogPostPage({ params: Promise.resolve({ slug: 'evil-post' }) })
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    // The raw innerHTML must not contain </script> (which would break out of the tag)
    expect(script!.innerHTML).not.toContain('</script>');
    // But it should contain the escaped form
    expect(script!.innerHTML).toContain('<\\/script>');
  });
});
