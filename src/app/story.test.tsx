import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import HomePage from './page';
import TrainerPage from './trainer/page';
import ComparePage from './compare/page';
import pricing from '@/lib/pricing.json';

const PRICING_URL = 'https://trainer.evofit.io/pricing';
const AI_URL = 'https://trainer.evofit.io/ai';

const pages: [string, () => JSX.Element][] = [
  ['home', HomePage],
  ['trainer', TrainerPage],
  ['compare', ComparePage],
];

describe.each(pages)('%s page tells the story in order', (_name, Page) => {
  const text = () => render(<Page />).container.textContent ?? '';

  it('goes own it forever, then the Fitness Agent, then Cloud Pro, then why not Everfit or Trainerize', () => {
    const t = text();
    const own = t.indexOf('Pay once. Own your coaching software.');
    const agent = t.indexOf('Your own Fitness Agent');
    const cloud = t.indexOf('Need client photo uploads and push notifications?');
    const why = t.indexOf('What you pay over 3 years');
    expect(own).toBeGreaterThan(-1);
    expect(agent).toBeGreaterThan(own);
    expect(cloud).toBeGreaterThan(agent);
    expect(why).toBeGreaterThan(cloud);
  });

  it('shows prices that equal pricing.json', () => {
    const t = text();
    const { starter, professional, enterprise } = pricing.tiers;
    expect(t).toContain(`$${starter.priceUsd}`);
    expect(t).toContain(`$${professional.priceUsd}`);
    expect(t).toContain(`$${enterprise.priceUsd}`);
    expect(t).toContain(`$${pricing.aiAddonMonthlyUsd}/mo`);
    expect(t).toContain(`$${pricing.cloudProMonthlyUsd}/mo`);
    expect(t).toContain(`${starter.customExercises} custom exercises`);
    expect(t).toContain(`${professional.customExercises} custom exercises`);
    expect(t).toContain('Unlimited custom exercises');
  });

  it('sends Add AI and plan links to the pricing page and learn-more to /ai', () => {
    const { container } = render(<Page />);
    const links = Array.from(container.querySelectorAll('a'));
    const addAi = links.filter((a) => a.textContent?.startsWith('Add AI for'));
    expect(addAi.length).toBeGreaterThan(0);
    addAi.forEach((a) => expect(a.getAttribute('href')).toBe(PRICING_URL));
    const learn = links.filter((a) => a.textContent === 'See what you can ask');
    expect(learn.length).toBeGreaterThan(0);
    learn.forEach((a) => expect(a.getAttribute('href')).toBe(AI_URL));
    expect(links.some((a) => a.textContent === 'See the three plans' && a.getAttribute('href') === PRICING_URL)).toBe(true);
  });

  it('never says Cloud Pro or Enterprise includes the GIF creator, never mentions the review queue or the parked add-on', () => {
    const t = text();
    expect(t).not.toMatch(/review queue/i);
    expect(t).not.toMatch(/39\.99|Evolution/);
    expect(t).not.toMatch(/(Cloud Pro|Enterprise)\s+(includes?|gets?)[^.]{0,60}GIF/i);
  });

  it('carries the Fitness Agent fine print and none of the never-write phrases', () => {
    const t = text();
    expect(t).toContain('You stay the coach.');
    expect(t).toContain('Needs a one-time plan first.');
    expect(t).toContain('limited monthly creations during the beta');
    expect(t).not.toMatch(/fully automatic|sends messages for you|built into EvoFit/i);
  });
});

describe('no EvoFit price is typed in the page sources', () => {
  const files = [
    'src/app/page.tsx',
    'src/app/trainer/page.tsx',
    'src/app/compare/page.tsx',
    'src/components/sections/TrainerStory.tsx',
  ];
  it.each(files)('%s has no hard-coded $199/$299/$399/$30/$10', (f) => {
    const src = fs.readFileSync(path.join(process.cwd(), f), 'utf8');
    expect(src).not.toMatch(/\$(199|299|399)\b/);
    expect(src).not.toMatch(/\$(30|10)\/mo/);
  });
});
