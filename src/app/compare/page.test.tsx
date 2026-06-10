import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ComparePage, { metadata } from './page';

const TRAINER_SIGNUP = 'https://trainer.evofit.io/get-started';

describe('ComparePage funnel', () => {
  it('renders the hero headline', () => {
    const { container } = render(<ComparePage />);
    expect(container.textContent).toContain('They rent.');
    expect(container.textContent).toContain('You own.');
  });

  it('offers at least two 1-click paths to the trainer sales page', () => {
    const { container } = render(<ComparePage />);
    const trainerLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === TRAINER_SIGNUP
    );
    expect(trainerLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('contains no dead href="#" links', () => {
    const { container } = render(<ComparePage />);
    const deadLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === '#'
    );
    expect(deadLinks).toHaveLength(0);
  });

  it('contains no /#get-started email-capture anchor links', () => {
    const { container } = render(<ComparePage />);
    const anchorLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === '/#get-started'
    );
    expect(anchorLinks).toHaveLength(0);
  });

  it('names both competitors', () => {
    const { container } = render(<ComparePage />);
    expect(container.textContent).toContain('Trainerize');
    expect(container.textContent).toContain('Everfit');
  });

  it('shows the price-comparison date stamp', () => {
    const { container } = render(<ComparePage />);
    expect(container.textContent).toContain('Prices compared as of June 10, 2026');
  });

  it('does not mention the parked Evolution AI add-on', () => {
    const { container } = render(<ComparePage />);
    expect(container.textContent).not.toContain('Evolution');
    expect(container.textContent).not.toContain('$39.99');
  });

  it('links the secondary "all features" path to /trainer', () => {
    const { container } = render(<ComparePage />);
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/trainer');
  });

  it('sets the canonical URL to https://evofit.io/compare', () => {
    expect(metadata.alternates?.canonical).toBe('https://evofit.io/compare');
  });

  it('has a title and description', () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });
});
