import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { ArticleFrontmatter, Vertical } from "@/types";

const contentDirectory = path.join(process.cwd(), "content");

export interface ArticleData {
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: string;
}

export function getArticleSlugs(vertical: Vertical): string[] {
  const dir = path.join(contentDirectory, vertical);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(
  vertical: Vertical,
  slug: string
): ArticleData | null {
  const filePath = path.join(contentDirectory, vertical, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    frontmatter: {
      ...data,
      slug,
      vertical,
      // Some posts (Pirate Signal, the welcome manifesto) use a `description`
      // field instead of `excerpt`. Fall back so subtitles never render empty.
      excerpt: data.excerpt ?? data.description,
      readingTimeMinutes: Math.ceil(stats.minutes),
    } as ArticleFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllArticles(vertical?: Vertical): ArticleData[] {
  const verticals: Vertical[] = vertical
    ? [vertical]
    : ["signals", "frequencies", "static"];

  const articles: ArticleData[] = [];

  for (const v of verticals) {
    const slugs = getArticleSlugs(v);
    for (const slug of slugs) {
      const article = getArticleBySlug(v, slug);
      if (article) articles.push(article);
    }
  }

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );
}

// Pirate Signal posts live in the subdirectory content/frequencies/pirate-signal/,
// which the flat per-vertical loaders above do not read. These dedicated helpers
// load that subdirectory, mirroring how the museum reads content/museum/specimens/.
export function getPirateSignalSlugs(): string[] {
  const dir = path.join(contentDirectory, "frequencies", "pirate-signal");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPirateSignalPosts(): ArticleData[] {
  return getPirateSignalSlugs()
    .map((name) => getArticleBySlug("frequencies", `pirate-signal/${name}`))
    .filter((a): a is ArticleData => a !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getFeaturedArticles(vertical?: Vertical): ArticleData[] {
  return getAllArticles(vertical).filter((a) => a.frontmatter.featured);
}

export function getArticlesByTag(tag: string, vertical?: Vertical): ArticleData[] {
  return getAllArticles(vertical).filter((a) =>
    a.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getArticlesByAuthor(authorSlug: string): ArticleData[] {
  return getAllArticles().filter(
    (a) => a.frontmatter.author === authorSlug
  );
}

export function getArticlesByPillar(
  pillarSlug: string,
  vertical: Vertical
): ArticleData[] {
  return getAllArticles(vertical).filter(
    (a) => a.frontmatter.pillar === pillarSlug
  );
}
