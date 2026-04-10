import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders Blog link to /blog', () => {
    render(<Navbar />);
    const blogLinks = screen.getAllByRole('link', { name: /blog/i });
    const blogLink = blogLinks.find((el) => el.getAttribute('href') === '/blog');
    expect(blogLink).toBeDefined();
    expect(blogLink).toHaveAttribute('href', '/blog');
  });
});
