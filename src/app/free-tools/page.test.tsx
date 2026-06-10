import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FreeToolsPage from './page';

const TRAINER_SIGNUP = 'https://trainer.evofit.io/get-started';
const MEALS_SIGNUP = 'https://meals.evofit.io/get-started';

describe('FreeToolsPage upsell', () => {
  it('links Get EvoFit Meals directly to the meals sales page', () => {
    render(<FreeToolsPage />);
    expect(screen.getByRole('link', { name: /get evofit meals/i })).toHaveAttribute(
      'href',
      MEALS_SIGNUP
    );
  });

  it('links Get EvoFit Trainer directly to the trainer sales page', () => {
    render(<FreeToolsPage />);
    expect(screen.getByRole('link', { name: /get evofit trainer/i })).toHaveAttribute(
      'href',
      TRAINER_SIGNUP
    );
  });

  it('keeps learn-more research links to /meals and /trainer', () => {
    const { container } = render(<FreeToolsPage />);
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/meals');
    expect(hrefs).toContain('/trainer');
  });
});
