/**
 * Claims lock: no false or unprovable marketing claim may appear in any marketing surface.
 * Add genuine out-of-scope uses to ALLOWLIST in banned-claims.ts (file + pattern + written reason).
 */
import fs from 'fs';
import path from 'path';
import { ROOT, marketingFiles, scanSource } from './banned-claims';

describe('marketing claims lock', () => {
  it('scans a sane set of files', () => {
    const files = marketingFiles();
    expect(files).toContain('src/app/page.tsx');
    expect(files).toContain('src/app/compare/page.tsx');
    expect(files).toContain('src/app/trainer/page.tsx');
    expect(files).toContain('src/components/sections/PricingSection.tsx');
    expect(files).toContain('src/components/sections/TrainerStory.tsx');
    expect(files).toContain('src/lib/pricing.ts');
    expect(files.some((f) => f.startsWith('src/app/api/'))).toBe(false);
  });

  it('self-test: catches a claim split by tags and line wraps (normalized scan)', () => {
    const fixture = 'x\nThe <b>only</b>\n  recurring\n  option is Cloud Pro';
    const hits = scanSource('fixture.tsx', fixture);
    expect(hits.map((h) => `${h.line}:${h.pattern.source}`)).toContain('2:only recurring option');
  });

  it('self-test: catches a claim split by JSX space expressions and entities', () => {
    const fixture = "<p>total{' '}value &amp; Marcus&nbsp;D.</p>";
    const found = scanSource('fixture.tsx', fixture).map((h) => h.pattern.source);
    expect(found).toContain('total value');
    expect(found.some((s) => s.startsWith('Marcus D'))).toBe(true);
  });

  it('self-test: catches the Fitness Agent overclaims from the copy deck never-write list', () => {
    const bad = [
      'An AI coach that trains your clients for you',
      'It is fully automatic',
      'The agent sends messages for you',
      'Built into EvoFit',
      'Cloud Pro includes the GIF creator',
      'The GIF creator is part of Enterprise',
      'Check the review queue',
    ];
    for (const phrase of bad) {
      expect(scanSource('fixture.tsx', `<p>${phrase}</p>`).length, phrase).toBeGreaterThan(0);
    }
    expect(scanSource('fixture.tsx', '<p>Cloud Pro is $10/mo (included in Enterprise). The GIF creator is in beta.</p>')).toEqual([]);
  });

  it('contains no banned claims', () => {
    const hits: string[] = [];
    for (const file of marketingFiles()) {
      const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
      for (const h of scanSource(file, src)) hits.push(`${h.file}:${h.line}  ${h.pattern}  ${h.why}`);
    }
    if (hits.length) throw new Error(`${hits.length} banned claim hit(s):\n${hits.join('\n')}`);
  });
});
