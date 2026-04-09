import { Env, FeedItem, FeedSource, Vertical } from "./types";
import { feedSources } from "./feeds";

const FEED_TIMEOUT = 8000;
const ITEM_TTL = 7 * 24 * 60 * 60; // 7 days in seconds
const MAX_INDEX_SIZE = 500;

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function extractExcerpt(text: string, maxLen: number = 280): string {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLen) return stripped;
  return stripped.slice(0, maxLen).replace(/\s+\S*$/, "") + "...";
}

interface ParsedItem {
  title: string;
  url: string;
  publishedAt: number;
  excerpt: string;
  author?: string;
  imageUrl?: string;
}

function parseRssXml(xml: string): ParsedItem[] {
  const items: ParsedItem[] = [];

  // Match <item> or <entry> blocks
  const itemRegex = /<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const title = block.match(/<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s)?.[1] || "";
    const link =
      block.match(/<link[^>]*href="([^"]*)"[^>]*\/>/)?.[1] ||
      block.match(/<link[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/s)?.[1] ||
      "";
    const pubDate =
      block.match(/<(?:pubDate|published|updated)[^>]*>(.*?)<\/(?:pubDate|published|updated)>/s)?.[1] || "";
    const description =
      block.match(/<(?:description|summary|content)[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:description|summary|content)>/s)?.[1] || "";
    const author =
      block.match(/<(?:author|dc:creator)[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/(?:author|dc:creator)>/s)?.[1] || undefined;
    const image =
      block.match(/<media:content[^>]*url="([^"]*)"[^>]*\/>/)?.[1] ||
      block.match(/<enclosure[^>]*url="([^"]*)"[^>]*\/>/)?.[1] ||
      undefined;

    const published = pubDate ? new Date(pubDate.trim()).getTime() : Date.now();

    if (title && link) {
      items.push({
        title: stripHtml(title.trim()),
        url: link.trim(),
        publishedAt: isNaN(published) ? Date.now() : published,
        excerpt: extractExcerpt(description),
        author: author ? stripHtml(author.trim()) : undefined,
        imageUrl: image?.trim(),
      });
    }
  }

  return items;
}

async function fetchFeed(source: FeedSource): Promise<FeedItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FEED_TIMEOUT);

    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: { "User-Agent": "phreak.fm/1.0 RSS Aggregator" },
    });

    clearTimeout(timeout);

    if (!response.ok) return [];

    const text = await response.text();
    const parsed = parseRssXml(text);

    const items: FeedItem[] = [];
    for (const p of parsed) {
      const id = await sha256(p.url);
      const hash = await sha256(`${p.title}:${p.url}`);

      items.push({
        id,
        title: p.title,
        url: p.url,
        source: source.name,
        sourceSlug: source.slug,
        vertical: source.vertical,
        publishedAt: p.publishedAt,
        excerpt: p.excerpt,
        author: p.author,
        tags: [],
        imageUrl: p.imageUrl,
        hash,
        trustTier: source.trustTier,
      });
    }

    return items;
  } catch {
    return [];
  }
}

async function updateIndices(env: Env, allItems: FeedItem[]): Promise<void> {
  // Sort by publishedAt descending
  allItems.sort((a, b) => b.publishedAt - a.publishedAt);

  // Global latest index
  const latestIds = allItems.slice(0, MAX_INDEX_SIZE).map((i) => i.id);
  await env.FEED_KV.put("feed:index:latest", JSON.stringify(latestIds), {
    expirationTtl: ITEM_TTL,
  });

  // Per-vertical indices
  const verticals: Vertical[] = ["signals", "frequencies", "static"];
  for (const v of verticals) {
    const vItems = allItems
      .filter((i) => i.vertical === v)
      .slice(0, MAX_INDEX_SIZE)
      .map((i) => i.id);
    await env.FEED_KV.put(`feed:index:${v}`, JSON.stringify(vItems), {
      expirationTtl: ITEM_TTL,
    });
  }
}

export async function ingestFeeds(env: Env): Promise<{ total: number; errors: number }> {
  let total = 0;
  let errors = 0;
  const allItems: FeedItem[] = [];

  // Fetch all feeds in parallel
  const results = await Promise.allSettled(
    feedSources.map((source) => fetchFeed(source))
  );

  for (const result of results) {
    if (result.status === "fulfilled") {
      const items = result.value;
      for (const item of items) {
        // Check for duplicates by ID
        const existing = await env.FEED_KV.get(`feed:item:${item.id}`);
        if (!existing) {
          await env.FEED_KV.put(
            `feed:item:${item.id}`,
            JSON.stringify(item),
            { expirationTtl: ITEM_TTL }
          );
          total++;
        }
        allItems.push(existing ? JSON.parse(existing) : item);
      }
    } else {
      errors++;
    }
  }

  // Update indices
  await updateIndices(env, allItems);

  return { total, errors };
}
