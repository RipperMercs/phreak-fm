import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";
import {
  getAllSpecimens,
  getAllFamilies,
  getAllYears,
  getAllSpecimenAuthors,
} from "@/lib/museum";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://phreak.fm";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/signals`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/frequencies`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/static`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/museum`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/museum/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/museum/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
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

  const specimens = getAllSpecimens();
  const specimenPages: MetadataRoute.Sitemap = specimens.map((s) => ({
    url: `${baseUrl}/museum/specimens/${s.frontmatter.slug}`,
    lastModified: new Date(s.frontmatter.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const familyPages: MetadataRoute.Sitemap = getAllFamilies().map((f) => ({
    url: `${baseUrl}/museum/families/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const yearPages: MetadataRoute.Sitemap = getAllYears().map((y) => ({
    url: `${baseUrl}/museum/years/${y}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const authorPages: MetadataRoute.Sitemap = getAllSpecimenAuthors().map((a) => ({
    url: `${baseUrl}/museum/authors/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...specimenPages,
    ...familyPages,
    ...yearPages,
    ...authorPages,
  ];
}
