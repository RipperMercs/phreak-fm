/**
 * Build-time feed fetcher.
 * Fetches all RSS/Atom feeds server-side (no CORS proxies),
 * writes results to public/feed-cache.json for the static site.
 */

const fs = require("fs");
const path = require("path");

const FEED_URLS = {
  security: [
    "https://krebsonsecurity.com/feed/",
    "https://www.bleepingcomputer.com/feed/",
    "https://feeds.arstechnica.com/arstechnica/security",
    "https://feeds.feedburner.com/TheHackersNews",
    "https://www.wired.com/feed/tag/security/latest/rss",
  ],
  tech: [
    "https://hnrss.org/frontpage?count=10",
    "https://feeds.arstechnica.com/arstechnica/index",
    "https://www.techmeme.com/feed.xml",
  ],
  dev: [
    "https://www.techdirt.com/feed/",
    "https://thenewstack.io/feed",
    "https://hackernoon.com/feed",
  ],
};

const TIMEOUT_MS = 8000;

function parseRssXml(text) {
  const items = [];

  // Try RSS <item> tags
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(text)) !== null) {
    const block = match[1];
    const title =
      (block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || "";
    const link =
      (block.match(/<link[^>]*>([\s\S]*?)<\/link>/) || [])[1] ||
      (block.match(/<link[^>]*href="([^"]*)"[^>]*\/?>/) || [])[1] ||
      "";
    const pubDate =
      (block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/) || [])[1] || "";
    if (title && link) {
      items.push({
        title: title.replace(/<[^>]*>/g, "").trim(),
        link: link.trim(),
        published: pubDate.trim(),
      });
    }
  }

  // Try Atom <entry> tags if no RSS items found
  if (items.length === 0) {
    const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
    while ((match = entryRegex.exec(text)) !== null) {
      const block = match[1];
      const title =
        (block.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || "";
      const link =
        (block.match(/<link[^>]*href="([^"]*)"[^>]*\/?>/) || [])[1] || "";
      const published =
        (block.match(/<(?:published|updated)[^>]*>([\s\S]*?)<\/(?:published|updated)>/) || [])[1] || "";
      if (title && link) {
        items.push({
          title: title.replace(/<[^>]*>/g, "").trim(),
          link: link.trim(),
          published: published.trim(),
        });
      }
    }
  }

  return items.slice(0, 10);
}

async function fetchFeed(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "phreak.fm feed reader (https://phreak.fm)",
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return [];
    const text = await res.text();
    return parseRssXml(text);
  } catch {
    return [];
  }
}

async function main() {
  console.log("Fetching feeds for build-time cache...");

  const cache = {
    built: new Date().toISOString(),
    feeds: {},
  };

  const sections = Object.entries(FEED_URLS);

  for (const [section, urls] of sections) {
    const results = await Promise.allSettled(urls.map(fetchFeed));
    const allItems = [];

    for (const result of results) {
      if (result.status === "fulfilled" && result.value.length > 0) {
        allItems.push(...result.value);
      }
    }

    // Deduplicate by title prefix and sort by date
    const seen = new Set();
    const unique = allItems
      .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
      .filter((item) => {
        const key = item.title.toLowerCase().slice(0, 50);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 15);

    cache.feeds[section] = unique;
    console.log(`  ${section}: ${unique.length} items from ${urls.length} feeds`);
  }

  const outPath = path.resolve(__dirname, "..", "public", "feed-cache.json");
  fs.writeFileSync(outPath, JSON.stringify(cache, null, 2));
  console.log(`Feed cache written to ${outPath}`);
}

main().catch((err) => {
  console.error("Feed fetch failed (non-fatal):", err.message);
  // Write empty cache so the build doesn't break
  const outPath = path.resolve(__dirname, "..", "public", "feed-cache.json");
  fs.writeFileSync(outPath, JSON.stringify({ built: new Date().toISOString(), feeds: {} }));
});
