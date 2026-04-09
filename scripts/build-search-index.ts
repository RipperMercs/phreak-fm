/**
 * Build-time script to generate a static search index JSON file.
 * Run during build: npx ts-node scripts/build-search-index.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface SearchItem {
  title: string;
  excerpt: string;
  slug: string;
  vertical: string;
  author: string;
  tags: string[];
  artist?: string;
  label?: string;
  url: string;
}

const contentDir = path.join(process.cwd(), "content");
const outputPath = path.join(process.cwd(), "public", "search-index.json");

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  const verticals = ["signals", "frequencies", "static"];

  for (const vertical of verticals) {
    const dir = path.join(contentDir, vertical);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      items.push({
        title: data.title || slug,
        excerpt: data.excerpt || "",
        slug,
        vertical,
        author: data.author || "",
        tags: data.tags || [],
        artist: data.artist,
        label: data.label,
        url: `/${vertical}/${slug}`,
      });
    }
  }

  return items;
}

const index = buildIndex();
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
console.log(`Search index built: ${index.length} items written to ${outputPath}`);
