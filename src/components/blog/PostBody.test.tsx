import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostBody from './PostBody';

describe('PostBody', () => {
  it('renders HTML inside an article with prose classes', () => {
    const html = '<h2>Test Heading</h2><p>Test paragraph content.</p>';
    const { container } = render(<PostBody html={html} />);
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('prose');
  });

  it('renders the HTML content (dangerouslySetInnerHTML)', () => {
    const html = '<h2>My Section</h2><p>Content here.</p>';
    render(<PostBody html={html} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My Section');
    expect(screen.getByText('Content here.')).toBeInTheDocument();
  });
});

// XSS sanitization tests — these test that reader.ts sanitizes markdown HTML output.
// PostBody is a thin renderer; the sanitization happens in markdownToHtml in reader.ts.
import { readPost } from '@/lib/blog/reader';
import path from 'path';
import fs from 'fs';
import os from 'os';

describe('PostBody XSS: reader sanitizes dangerous HTML in markdown', () => {
  it('strips <script> tags from markdown body', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-xss-'));
    const frontmatter = `---
title: "XSS Test"
slug: "xss-test"
excerpt: "XSS test post"
author:
  name: "Test Author"
tags: ["test"]
hero_image: "https://example.com/hero.jpg"
hero_image_alt: "Alt"
published_at: "2026-04-10T08:00:00Z"
updated_at: "2026-04-10T08:00:00Z"
draft: false
product_id: "evofit"
cc_post_id: "cc_xss_test"
---

Normal paragraph.

<script>alert('xss')</script>

More text.
`;
    fs.writeFileSync(path.join(tmpDir, 'xss-test.md'), frontmatter);
    const post = await readPost('xss-test', tmpDir);
    expect(post.html).not.toContain('<script>');
    expect(post.html).not.toContain('alert(');
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('strips onerror attributes from img tags', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-xss2-'));
    const frontmatter = `---
title: "XSS Img Test"
slug: "xss-img-test"
excerpt: "XSS img test post"
author:
  name: "Test Author"
tags: ["test"]
hero_image: "https://example.com/hero.jpg"
hero_image_alt: "Alt"
published_at: "2026-04-10T08:00:00Z"
updated_at: "2026-04-10T08:00:00Z"
draft: false
product_id: "evofit"
cc_post_id: "cc_xss_img_test"
---

<img src="x" onerror="alert(1)">
`;
    fs.writeFileSync(path.join(tmpDir, 'xss-img-test.md'), frontmatter);
    const post = await readPost('xss-img-test', tmpDir);
    expect(post.html).not.toContain('onerror');
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('still renders normal markdown elements correctly', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-normal-'));
    const frontmatter = `---
title: "Normal Test"
slug: "normal-test"
excerpt: "Normal post"
author:
  name: "Test Author"
tags: ["test"]
hero_image: "https://example.com/hero.jpg"
hero_image_alt: "Alt"
published_at: "2026-04-10T08:00:00Z"
updated_at: "2026-04-10T08:00:00Z"
draft: false
product_id: "evofit"
cc_post_id: "cc_normal_test"
---

## Heading Two

**Bold text** and *italic text*.

[A link](https://evofit.io)
`;
    fs.writeFileSync(path.join(tmpDir, 'normal-test.md'), frontmatter);
    const post = await readPost('normal-test', tmpDir);
    expect(post.html).toContain('<h2');
    expect(post.html).toContain('<strong>');
    expect(post.html).toContain('<a');
    fs.rmSync(tmpDir, { recursive: true });
  });
});
