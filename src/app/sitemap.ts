import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://phreak.fm";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/signals`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/frequencies`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/static`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const articles = getAllArticles();
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/${a.frontmatter.vertical}/${a.frontmatter.slug}`,
    lastModified: new Date(a.frontmatter.updatedAt || a.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: a.frontmatter.featured ? 0.8 : 0.6,
  }));

  return [...staticPages, ...articlePages];
}
