import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import TrainerPage from './page';
import HomePage from '../page';
import ComparePage from '../compare/page';
import pricing from '@/lib/pricing.json';

const read = (f: string) => fs.readFileSync(path.join(process.cwd(), f), 'utf8');

describe('Trainer page plan grid reads its prices from pricing.json', () => {
  const cards = () => {
    const { container } = render(<TrainerPage />);
    return Array.from(container.querySelectorAll('#pricing h3')).map((h) => h.closest('div')!.parentElement!);
  };

  it.each(Object.entries(pricing.tiers).filter(([k]) => k !== 'enterprise'))('%s card shows its pricing.json price and buy button', (_key, tier) => {
    const card = cards().find((c) => c.querySelector('h3')?.textContent === tier.name);
    expect(card, `no ${tier.name} card in #pricing`).toBeTruthy();
    const text = card!.textContent ?? '';
    expect(text).toContain(`$${tier.priceUsd.toLocaleString('en-US')}`);
    const buttons = Array.from(card!.querySelectorAll('a')).map((a) => a.textContent ?? '');
    expect(buttons.some((t) => t.includes(`$${tier.priceUsd.toLocaleString('en-US')}`))).toBe(true);
    const clients = tier.clients === 'unlimited' ? 'Unlimited' : `Up to ${tier.clients} clients`;
    expect(text).toContain(clients);
  });
});

describe('Enterprise never states a number on this site (the product sells it at a live founding price)', () => {
  it('Trainer page Enterprise card says see current price and links to the product pricing page', () => {
    const { container } = render(<TrainerPage />);
    const card = Array.from(container.querySelectorAll('#pricing h3'))
      .find((h) => h.textContent === pricing.tiers.enterprise.name)!
      .closest('div')!.parentElement!;
    const text = card.textContent ?? '';
    expect(text).not.toMatch(/\$\d/);
    const buy = Array.from(card.querySelectorAll('a')).find((a) => /Get Enterprise/.test(a.textContent ?? ''))!;
    expect(buy.textContent).toBe('Get Enterprise \u2014 see current price');
    expect(buy.getAttribute('href')).toBe('https://trainer.evofit.io/pricing');
  });

  it('no page that lists plans prints the regular Enterprise price', () => {
    const stale = `$${pricing.tiers.enterprise.priceUsd}`;
    for (const Page of [TrainerPage, HomePage, ComparePage]) {
      const { container, unmount } = render(<Page />);
      expect(container.textContent ?? '').not.toContain(stale);
      unmount();
    }
  });
});

describe('no price literal in the pricing component or its data source', () => {
  it.each([
    'src/components/sections/PricingSection.tsx',
    'src/app/trainer/page.tsx',
    'src/components/sections/TrainerStory.tsx',
  ])('%s has no $<digits> literal', (f) => {
    expect(read(f)).not.toMatch(/\$\d/);
  });
});
