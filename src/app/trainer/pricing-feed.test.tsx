import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import TrainerPage from './page';
import pricing from '@/lib/pricing.json';

const read = (f: string) => fs.readFileSync(path.join(process.cwd(), f), 'utf8');

describe('Trainer page plan grid reads its prices from pricing.json', () => {
  const cards = () => {
    const { container } = render(<TrainerPage />);
    return Array.from(container.querySelectorAll('#pricing h3')).map((h) => h.closest('div')!.parentElement!);
  };

  it.each(Object.entries(pricing.tiers))('%s card shows its pricing.json price and buy button', (_key, tier) => {
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

describe('no price literal in the pricing component or its data source', () => {
  it.each([
    'src/components/sections/PricingSection.tsx',
    'src/app/trainer/page.tsx',
    'src/components/sections/TrainerStory.tsx',
  ])('%s has no $<digits> literal', (f) => {
    expect(read(f)).not.toMatch(/\$\d/);
  });
});
