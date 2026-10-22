import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';

// Runs against the real content folder: the published sitemap must not repeat a URL.
describe('sitemap with the real blog content', () => {
  it('has no duplicate URLs', async () => {
    const urls = (await sitemap()).map((u) => u.url);
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
    expect(dupes).toEqual([]);
  });
});
