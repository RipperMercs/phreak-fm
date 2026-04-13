import Fuse from "fuse.js";
import { getAllArticles } from "./mdx";

export interface SearchItem {
  title: string;
  excerpt: string;
  slug: string;
  vertical: string;
  author: string;
  tags: string[];
  artist?: string;
  label?: string;
  url: string;
  kind?: "article" | "specimen";
}

export function buildSearchIndex(): SearchItem[] {
  const articles = getAllArticles();
  return articles.map((a) => ({
    title: a.frontmatter.title,
    excerpt: a.frontmatter.excerpt,
    slug: a.frontmatter.slug,
    vertical: a.frontmatter.vertical,
    author: a.frontmatter.author,
    tags: a.frontmatter.tags,
    artist: a.frontmatter.artist,
    label: a.frontmatter.label,
    url: `/${a.frontmatter.vertical}/${a.frontmatter.slug}`,
  }));
}

export function createSearchClient(items: SearchItem[]) {
  return new Fuse(items, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "excerpt", weight: 0.2 },
      { name: "author", weight: 0.1 },
      { name: "tags", weight: 0.15 },
      { name: "artist", weight: 0.1 },
      { name: "label", weight: 0.05 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  });
}
