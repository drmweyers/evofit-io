import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

const mockPost = {
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test excerpt for the blog post.',
  tags: ['fitness', 'ai'],
  hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/test/hero.jpg',
  hero_image_alt: 'Test hero image alt text',
  published_at: '2026-04-10T08:00:00Z',
  updated_at: '2026-04-10T08:00:00Z',
  draft: false,
  product_id: 'evofit',
  cc_post_id: 'cc_test_001',
  author: { name: 'EvoFit Team' },
};

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('renders the post excerpt', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('This is a test excerpt for the blog post.')).toBeInTheDocument();
  });

  it('links to /blog/{slug}', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link', { name: /test blog post/i });
    expect(link).toHaveAttribute('href', '/blog/test-blog-post');
  });

  it('renders hero image with correct alt text', () => {
    render(<PostCard post={mockPost} />);
    const img = screen.getByRole('img', { name: 'Test hero image alt text' });
    expect(img).toBeInTheDocument();
  });

  it('renders tag pills for each tag', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('fitness')).toBeInTheDocument();
    expect(screen.getByText('ai')).toBeInTheDocument();
  });

  it('renders the published date', () => {
    render(<PostCard post={mockPost} />);
    // Date will be formatted — just check the year is present
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });
});
