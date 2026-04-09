import { FeedItem, Vertical } from "@/types";

/**
 * KV client wrapper for Cloudflare Workers KV.
 * In development, falls back to local JSON or returns empty arrays.
 * In production, connects to PHREAK_FEED_KV namespace.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.phreak.fm";

const cache = new Map<string, { data: FeedItem[]; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute in-memory cache

function getCached(key: string): FeedItem[] | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  return null;
}

function setCache(key: string, data: FeedItem[]): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function getLatestFeedItems(
  limit: number = 50,
  vertical?: Vertical
): Promise<FeedItem[]> {
  const cacheKey = `latest:${vertical || "all"}:${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (vertical) params.set("vertical", vertical);

    const res = await fetch(`${API_BASE}/api/feed/latest?${params}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];
    const data = (await res.json()) as FeedItem[];
    setCache(cacheKey, data);
    return data;
  } catch {
    return [];
  }
}

export async function getFeedItemsBySource(
  sourceSlug: string,
  limit: number = 50
): Promise<FeedItem[]> {
  const cacheKey = `source:${sourceSlug}:${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${API_BASE}/api/feed/source/${sourceSlug}?limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as FeedItem[];
    setCache(cacheKey, data);
    return data;
  } catch {
    return [];
  }
}

export async function getFeedItemsByVertical(
  vertical: Vertical,
  limit: number = 50
): Promise<FeedItem[]> {
  return getLatestFeedItems(limit, vertical);
}

export async function getFeedItemsByTag(
  tag: string,
  limit: number = 50
): Promise<FeedItem[]> {
  const cacheKey = `tag:${tag}:${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const all = await getLatestFeedItems(200);
    const filtered = all
      .filter((item) =>
        item.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
      .slice(0, limit);
    setCache(cacheKey, filtered);
    return filtered;
  } catch {
    return [];
  }
}

export async function getFeedItemsByArtist(
  artistName: string,
  limit: number = 50
): Promise<FeedItem[]> {
  const cacheKey = `artist:${artistName}:${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${API_BASE}/api/artist/${encodeURIComponent(artistName)}?limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as FeedItem[];
    setCache(cacheKey, data);
    return data;
  } catch {
    return [];
  }
}

export async function getFeedItemsByLabel(
  labelName: string,
  limit: number = 50
): Promise<FeedItem[]> {
  const cacheKey = `label:${labelName}:${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${API_BASE}/api/label/${encodeURIComponent(labelName)}?limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as FeedItem[];
    setCache(cacheKey, data);
    return data;
  } catch {
    return [];
  }
}
