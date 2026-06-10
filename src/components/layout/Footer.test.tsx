import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

const TRAINER_SIGNUP = 'https://trainer.evofit.io/get-started';
const MEALS_SIGNUP = 'https://meals.evofit.io/get-started';

describe('Footer', () => {
  it('links Get EvoFit Trainer directly to the trainer sales page', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /get evofit trainer/i })).toHaveAttribute(
      'href',
      TRAINER_SIGNUP
    );
  });

  it('links Get EvoFit Meals directly to the meals sales page', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /get evofit meals/i })).toHaveAttribute(
      'href',
      MEALS_SIGNUP
    );
  });

  it('links Free Tools to /free-tools', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /free tools/i })).toHaveAttribute(
      'href',
      '/free-tools'
    );
  });

  it('links the comparison page to /compare', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /compare vs trainerize & everfit/i })).toHaveAttribute(
      'href',
      '/compare'
    );
  });

  it('links Privacy Policy to a real /privacy page', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      '/privacy'
    );
  });

  it('links Terms of Service to a real /terms page', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /terms of service/i })).toHaveAttribute(
      'href',
      '/terms'
    );
  });

  it('contains no dead href="#" links', () => {
    const { container } = render(<Footer />);
    const deadLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === '#'
    );
    expect(deadLinks).toHaveLength(0);
  });
});
