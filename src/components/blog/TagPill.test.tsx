import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TagPill from './TagPill';

describe('TagPill', () => {
  it('renders the tag text', () => {
    render(<TagPill tag="fitness" />);
    expect(screen.getByText('fitness')).toBeInTheDocument();
  });

  it('links to /blog/tag/{tag}', () => {
    render(<TagPill tag="ai" />);
    const link = screen.getByRole('link', { name: 'ai' });
    expect(link).toHaveAttribute('href', '/blog/tag/ai');
  });
});
