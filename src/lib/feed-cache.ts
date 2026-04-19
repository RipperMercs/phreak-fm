import fs from "fs";
import path from "path";

export interface FeedEntry {
  title: string;
  link: string;
  published: string;
}

export interface FeedCache {
  built: string;
  feeds: Record<string, FeedEntry[]>;
}

export interface WireItem extends FeedEntry {
  section: string;
}

export const sectionMeta: Record<string, { abbr: string; color: string; label: string }> = {
  security: { abbr: "SIG", color: "text-signals", label: "Security" },
  tech: { abbr: "STA", color: "text-static-v", label: "Tech" },
  dev: { abbr: "DEV", color: "text-accent", label: "Dev" },
};

export function loadFeedCache(): FeedCache {
  try {
    const cachePath = path.join(process.cwd(), "public", "feed-cache.json");
    return JSON.parse(fs.readFileSync(cachePath, "utf8")) as FeedCache;
  } catch {
    return { built: "", feeds: {} };
  }
}

export function getSortedWireItems(cache: FeedCache, limit?: number): WireItem[] {
  const items: WireItem[] = [];
  for (const [section, entries] of Object.entries(cache.feeds)) {
    for (const entry of entries) {
      items.push({ ...entry, section });
    }
  }
  items.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  );
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function formatPubDate(input: string): string {
  if (!input) return "";
  const d = new Date(input);
  if (isNaN(d.getTime())) return "";
  return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}.${String(d.getFullYear()).slice(2)}`;
}
