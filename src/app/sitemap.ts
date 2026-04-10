import { MetadataRoute } from "next";
import { listPosts, getAllTags } from "@/lib/blog/reader";

const baseUrl = "https://evofit.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/meals`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trainer`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-tools`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Blog index
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Blog posts
  const posts = await listPosts({ includeDrafts: false });
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at ?? post.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Tag archives
  const tags = await getAllTags();
  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
