import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostHeader from './PostHeader';

const mockPost = {
  title: 'AI Meal Plans vs Generic Templates',
  slug: 'ai-meal-plans-vs-templates',
  excerpt: 'Why personalized AI meal plans outperform generic templates.',
  tags: ['meals', 'ai'],
  hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/test/hero.jpg',
  hero_image_alt: 'AI meal plan dashboard',
  published_at: '2026-04-10T08:00:00Z',
  updated_at: '2026-04-10T08:00:00Z',
  draft: false,
  product_id: 'evofit-meals',
  cc_post_id: 'cc_test_002',
  author: { name: 'Mark Weyers Ed.D', avatar: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/authors/mark.jpg' },
};

describe('PostHeader', () => {
  it('renders the post title as h1', () => {
    render(<PostHeader post={mockPost} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('AI Meal Plans vs Generic Templates');
  });

  it('renders the author name', () => {
    render(<PostHeader post={mockPost} />);
    expect(screen.getByText('Mark Weyers Ed.D')).toBeInTheDocument();
  });

  it('renders the published date', () => {
    render(<PostHeader post={mockPost} />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('renders the hero image with correct alt text', () => {
    render(<PostHeader post={mockPost} />);
    const img = screen.getByRole('img', { name: 'AI meal plan dashboard' });
    expect(img).toBeInTheDocument();
  });
});
