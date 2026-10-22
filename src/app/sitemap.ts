import { MetadataRoute } from "next";
import { listPosts, getAllTags, getAllCategories } from "@/lib/blog/reader";
import { slugifyCategory } from "@/lib/blog/schema";

const baseUrl = "https://evofit.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/meals`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/trainer`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/free-tools`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const posts = dedupePosts(await listPosts({ includeDrafts: false }));
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at ?? post.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tags = await getAllTags();
  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const categories = await getAllCategories();
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${slugifyCategory(cat)}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Final guard: a URL appears once, whatever the content folder holds.
  const seen = new Set<string>();
  return [...staticRoutes, ...postRoutes, ...tagRoutes, ...categoryRoutes].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}

type SitemapPost = Awaited<ReturnType<typeof listPosts>>[number];

/**
 * One entry per slug (newest copy wins), and no truncated stub when a full-length twin exists.
 * Early auto-generated posts were cut mid-title (the slug ends mid-phrase, the title has a
 * trailing space); a later post repeats the full title and slug, and only that one is listed.
 */
export function dedupePosts(posts: SitemapPost[]): SitemapPost[] {
  const stamp = (p: SitemapPost) => new Date(p.updated_at ?? p.published_at).getTime();
  const bySlug = new Map<string, SitemapPost>();
  for (const p of posts) {
    const prev = bySlug.get(p.slug);
    if (!prev || stamp(p) > stamp(prev)) bySlug.set(p.slug, p);
  }
  const unique = [...bySlug.values()];
  return unique.filter((p) => {
    // A cut-off stub: its title ends in a space, or its slug is long enough to have hit the cap.
    const looksCut = p.title !== p.title.trimEnd() || p.slug.length >= 50;
    if (!looksCut) return true;
    const title = p.title.trim().toLowerCase();
    return !unique.some(
      (o) =>
        o.slug !== p.slug &&
        o.slug.startsWith(p.slug + '-') &&
        o.title.length > title.length &&
        o.title.toLowerCase().startsWith(title),
    );
  });
}
