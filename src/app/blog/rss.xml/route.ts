import { listPosts } from '@/lib/blog/reader';

const SITE_URL = 'https://evofit.io';
const FEED_TITLE = 'EvoFit Blog';
const FEED_DESCRIPTION = 'AI-powered fitness insights, nutrition science, and business tips for fitness coaches.';
const MAX_ITEMS = 20;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRssXml(posts: Awaited<ReturnType<typeof listPosts>>): string {
  const items = posts.slice(0, MAX_ITEMS).map((post) => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.published_at).toUTCString();
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-ca</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

export async function GET(): Promise<Response> {
  const posts = await listPosts({ includeDrafts: false });
  const xml = buildRssXml(posts);

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=600',
    },
  });
}
