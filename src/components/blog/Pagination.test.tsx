import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('shows Previous and Next links', () => {
    render(<Pagination currentPage={2} totalPages={5} basePath="/blog" />);
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it('Previous is aria-disabled on page 1', () => {
    render(<Pagination currentPage={1} totalPages={5} basePath="/blog" />);
    const prev = screen.getByText(/previous/i).closest('[aria-disabled]');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
  });

  it('Next is aria-disabled on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} basePath="/blog" />);
    const next = screen.getByText(/next/i).closest('[aria-disabled]');
    expect(next).toHaveAttribute('aria-disabled', 'true');
  });

  it('generates correct href for next page', () => {
    render(<Pagination currentPage={2} totalPages={5} basePath="/blog" />);
    const next = screen.getByText(/next/i).closest('a');
    expect(next).toHaveAttribute('href', '/blog?page=3');
  });

  it('generates correct href for previous page', () => {
    render(<Pagination currentPage={3} totalPages={5} basePath="/blog" />);
    const prev = screen.getByText(/previous/i).closest('a');
    expect(prev).toHaveAttribute('href', '/blog?page=2');
  });
});
