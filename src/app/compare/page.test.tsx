import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ComparePage, { metadata } from './page';

const PRICING = 'https://trainer.evofit.io/pricing';

describe('ComparePage funnel', () => {
  it('renders the hero headline', () => {
    const { container } = render(<ComparePage />);
    expect(container.textContent).toContain('They rent.');
    expect(container.textContent).toContain('You own.');
  });

  it('sends every buy link to the trainer pricing page', () => {
    const { container } = render(<ComparePage />);
    const trainerLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === PRICING
    );
    expect(trainerLinks.length).toBeGreaterThanOrEqual(2);
    const buy = Array.from(container.querySelectorAll('a')).filter((a) =>
      /^(Get |See the three plans|Add AI)/.test(a.textContent ?? '')
    );
    expect(buy.length).toBeGreaterThan(0);
    buy.forEach((a) => expect(a.getAttribute('href')).toBe(PRICING));
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
    expect(container.textContent).toContain('checked October 21, 2026');
    expect(container.textContent).not.toContain('June 10, 2026');
  });

  it('limits the checked-date stamp to the cost table (not the hero or footer)', () => {
    const { container } = render(<ComparePage />);
    const t = container.textContent ?? '';
    expect(t.match(/checked October 21, 2026/g)).toHaveLength(1);
    expect(t.indexOf('checked October 21, 2026')).toBeGreaterThan(t.indexOf('Everfit, monthly billing'));
  });

  it('makes no competitor claim the copy deck does not state', () => {
    const { container } = render(<ComparePage />);
    const t = container.textContent ?? '';
    for (const bad of ['max 500', '1,000+', 'per client, forever', 'Business add-on', 'Tasks & reminders', 'Consultation forms', 'In-app only', 'Basic stats', 'Dashboards', 'Native apps; clean']) {
      expect(t, bad).not.toContain(bad);
    }
  });

  it('labels the 5-client Everfit annual figure as the Pro plan', () => {
    const { container } = render(<ComparePage />);
    const row = Array.from(container.querySelectorAll('tbody tr')).find((r) => r.querySelector('th')?.textContent === '5');
    const cells = row!.querySelectorAll('td');
    expect(cells[3].textContent).toContain('$576');
    expect(cells[3].textContent).toContain('on Pro');
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
