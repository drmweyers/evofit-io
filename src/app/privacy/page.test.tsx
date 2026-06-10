import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivacyPage, { metadata } from './page';

describe('PrivacyPage', () => {
  it('renders the Privacy Policy heading', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument();
  });

  it('has canonical metadata', () => {
    expect(metadata.alternates?.canonical).toBe('https://evofit.io/privacy');
  });

  it('keeps the material policy commitments', () => {
    render(<PrivacyPage />);
    expect(screen.getAllByText(/effective date/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/unsubscribe/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/do not sell or rent/i)).toBeInTheDocument();
  });
});
