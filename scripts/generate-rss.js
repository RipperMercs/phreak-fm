/**
 * generate-rss.js
 * 
 * Generates /public/feed.xml at build time for static export.
 * Run: node scripts/generate-rss.js
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://phreak.fm";
const SITE_NAME = "phreak.fm";
const SITE_DESCRIPTION = "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news.";
const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_PATH = path.join(process.cwd(), "public", "feed.xml");

const AUTHORS = {
  ripper: "Ripper",
  nullbyte: "nullbyte",
  synth_error: "synth_error",
  deadpacket: "deadpacket",
  the_curator: "the_curator",
};

const VERTICAL_LABELS = {
  signals: "Signals",
  frequencies: "Frequencies",
  static: "Static",
};

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getAllArticles() {
  const verticals = ["signals", "frequencies", "static"];
  const articles = [];

  for (const vertical of verticals) {
    const dir = path.join(CONTENT_DIR, vertical);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(content);
      articles.push({
        ...data,
        slug: file.replace(/\.mdx$/, ""),
        vertical,
      });
    }
  }

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function main() {
  const articles = getAllArticles().slice(0, 50);

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/${a.vertical}/${a.slug}`;
      const pubDate = new Date(a.publishedAt).toUTCString();
      const category = VERTICAL_LABELS[a.vertical] || "";
      const author = AUTHORS[a.author] || a.author || SITE_NAME;

      return `    <item>
      <title>${escapeXml(a.title || a.slug)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.excerpt || "")}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${category}</category>
      <dc:creator>${escapeXml(author)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  fs.writeFileSync(OUTPUT_PATH, rss, "utf8");
  console.log("Generated: /public/feed.xml (" + articles.length + " items)");
}

main();
