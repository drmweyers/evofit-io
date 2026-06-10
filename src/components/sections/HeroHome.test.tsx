import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroHome from './HeroHome';

const TRAINER_SIGNUP = 'https://trainer.evofit.io/get-started';
const MEALS_SIGNUP = 'https://meals.evofit.io/get-started';

describe('HeroHome', () => {
  it('renders a direct trainer sales-page CTA', () => {
    render(<HeroHome />);
    expect(screen.getByRole('link', { name: /get evofit trainer/i })).toHaveAttribute(
      'href',
      TRAINER_SIGNUP
    );
  });

  it('renders a direct meals sales-page CTA', () => {
    render(<HeroHome />);
    expect(screen.getByRole('link', { name: /get evofit meals/i })).toHaveAttribute(
      'href',
      MEALS_SIGNUP
    );
  });

  it('has no link to the email-capture anchor', () => {
    const { container } = render(<HeroHome />);
    const anchorLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === '/#get-started'
    );
    expect(anchorLinks).toHaveLength(0);
  });
});
