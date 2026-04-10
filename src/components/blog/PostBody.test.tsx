import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostBody from './PostBody';

describe('PostBody', () => {
  it('renders HTML inside an article with prose classes', () => {
    const html = '<h2>Test Heading</h2><p>Test paragraph content.</p>';
    const { container } = render(<PostBody html={html} />);
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('prose');
  });

  it('renders the HTML content (dangerouslySetInnerHTML)', () => {
    const html = '<h2>My Section</h2><p>Content here.</p>';
    render(<PostBody html={html} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My Section');
    expect(screen.getByText('Content here.')).toBeInTheDocument();
  });
});
