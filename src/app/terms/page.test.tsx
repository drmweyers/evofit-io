import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TermsPage, { metadata } from './page';

describe('TermsPage', () => {
  it('renders the Terms of Service heading', () => {
    render(<TermsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /terms of service/i })
    ).toBeInTheDocument();
  });

  it('has canonical metadata', () => {
    expect(metadata.alternates?.canonical).toBe('https://evofit.io/terms');
  });

  it('keeps the material terms content', () => {
    render(<TermsPage />);
    expect(screen.getByText(/effective date/i)).toBeInTheDocument();
    expect(screen.getByText(/not medical, nutritional, legal, or financial advice/i)).toBeInTheDocument();
  });
});
