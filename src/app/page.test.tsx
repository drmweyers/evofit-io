import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage from './page';

const TRAINER_SIGNUP = 'https://trainer.evofit.io/get-started';
const MEALS_SIGNUP = 'https://meals.evofit.io/get-started';

describe('HomePage funnel', () => {
  it('has no CTA pointing at the email-capture anchor', () => {
    const { container } = render(<HomePage />);
    const anchorLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === '/#get-started'
    );
    expect(anchorLinks).toHaveLength(0);
  });

  it('offers multiple 1-click paths to the trainer sales page', () => {
    const { container } = render(<HomePage />);
    const trainerLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === TRAINER_SIGNUP
    );
    expect(trainerLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('offers multiple 1-click paths to the meals sales page', () => {
    const { container } = render(<HomePage />);
    const mealsLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === MEALS_SIGNUP
    );
    expect(mealsLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('keeps learn-more research links to /trainer and /meals', () => {
    const { container } = render(<HomePage />);
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/trainer');
    expect(hrefs).toContain('/meals');
  });
});
