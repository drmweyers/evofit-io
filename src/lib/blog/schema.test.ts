import { describe, it, expect } from 'vitest';
import {
  PostFrontmatterSchema,
  parseFrontmatter,
  safeParseFrontmatter,
  AUTHOR_PRESETS,
} from './schema';

const validFrontmatter = {
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'A short excerpt about this post.',
  tags: ['ai', 'fitness'],
  hero_image: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/posts/test/hero.jpg',
  hero_image_alt: 'Test hero image',
  published_at: '2026-04-10T08:00:00Z',
  draft: false,
  product_id: 'evofit',
  cc_post_id: 'cc_post_test_001',
};

describe('PostFrontmatterSchema', () => {
  it('accepts valid frontmatter with all required fields', () => {
    expect(() => PostFrontmatterSchema.parse(validFrontmatter)).not.toThrow();
  });

  it('rejects missing title', () => {
    const { title, ...without } = validFrontmatter;
    expect(() => parseFrontmatter(without)).toThrow();
  });

  it('rejects missing slug', () => {
    const { slug, ...without } = validFrontmatter;
    expect(() => parseFrontmatter(without)).toThrow();
  });

  it('rejects missing hero_image', () => {
    const { hero_image, ...without } = validFrontmatter;
    expect(() => parseFrontmatter(without)).toThrow();
  });

  it('rejects missing cc_post_id', () => {
    const { cc_post_id, ...without } = validFrontmatter;
    expect(() => parseFrontmatter(without)).toThrow();
  });

  it('applies default author EvoFit Team for evofit product_id when author omitted', () => {
    const result = parseFrontmatter(validFrontmatter);
    expect(result.author.name).toBe('EvoFit Team');
  });

  it('applies default updated_at equal to published_at when omitted', () => {
    const result = parseFrontmatter(validFrontmatter);
    expect(result.updated_at).toBe(validFrontmatter.published_at);
  });

  it('accepts explicit author with name and avatar', () => {
    const withAuthor = {
      ...validFrontmatter,
      author: {
        name: 'Mark Weyers Ed.D',
        avatar: 'https://bci-blog-images.nyc3.digitaloceanspaces.com/authors/mark.jpg',
      },
    };
    const result = parseFrontmatter(withAuthor);
    expect(result.author.name).toBe('Mark Weyers Ed.D');
  });

  it('accepts author with name only (no avatar)', () => {
    const withAuthor = { ...validFrontmatter, author: { name: 'EvoFit Team' } };
    const result = parseFrontmatter(withAuthor);
    expect(result.author.name).toBe('EvoFit Team');
    expect(result.author.avatar).toBeUndefined();
  });

  it('exports AUTHOR_PRESETS with all three named presets', () => {
    expect(AUTHOR_PRESETS).toContain('EvoFit Team');
    expect(AUTHOR_PRESETS).toContain('BCI Innovation Labs');
    expect(AUTHOR_PRESETS).toContain('Mark Weyers Ed.D');
    expect(AUTHOR_PRESETS).toHaveLength(3);
  });

  it('accepts draft: true', () => {
    const draft = { ...validFrontmatter, draft: true };
    const result = parseFrontmatter(draft);
    expect(result.draft).toBe(true);
  });

  it('accepts tags as array of strings', () => {
    const result = parseFrontmatter(validFrontmatter);
    expect(result.tags).toEqual(['ai', 'fitness']);
  });
});

describe('safeParseFrontmatter', () => {
  it('returns success:true with valid data', () => {
    const result = safeParseFrontmatter(validFrontmatter);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('Test Post');
    }
  });

  it('returns success:false with invalid data (no error thrown)', () => {
    expect(() => {
      const result = safeParseFrontmatter({ slug: 'only-slug' });
      expect(result.success).toBe(false);
    }).not.toThrow();
  });
});
