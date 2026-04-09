"use client";

import { useState, useEffect } from "react";

interface FeedEntry {
  title: string;
  link: string;
  published: string;
}

interface LiveFeedProps {
  title: string;
  color: string;
  feeds: string[];
  maxItems?: number;
}

async function fetchViaRss2Json(feedUrl: string): Promise<FeedEntry[]> {
  try {
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=5`;
    const res = await fetch(proxyUrl);
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "ok" || !data.items) return [];
    return data.items.map((item: { title: string; link: string; pubDate: string }) => ({
      title: item.title,
      link: item.link,
      published: item.pubDate || "",
    }));
  } catch {
    return [];
  }
}

async function fetchViaAllOrigins(feedUrl: string): Promise<FeedEntry[]> {
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) return [];
    const text = await res.text();

    const items: FeedEntry[] = [];
    const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
    let match;
    while ((match = itemRegex.exec(text)) !== null) {
      const block = match[1];
      const title = block.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1] || "";
      const link = block.match(/<link[^>]*>([\s\S]*?)<\/link>/)?.[1] || "";
      const pubDate = block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1] || "";
      if (title && link) {
        items.push({
          title: title.replace(/<[^>]*>/g, "").trim(),
          link: link.trim(),
          published: pubDate.trim(),
        });
      }
    }
    return items.slice(0, 5);
  } catch {
    return [];
  }
}

export function LiveFeed({ title, color, feeds, maxItems = 8 }: LiveFeedProps) {
  const [items, setItems] = useState<FeedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeeds() {
      const allItems: FeedEntry[] = [];

      for (const feedUrl of feeds) {
        let entries = await fetchViaRss2Json(feedUrl);
        if (entries.length === 0) {
          entries = await fetchViaAllOrigins(feedUrl);
        }
        allItems.push(...entries);
      }

      const seen = new Set<string>();
      const unique = allItems
        .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
        .filter((item) => {
          const key = item.title.toLowerCase().slice(0, 50);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0, maxItems);

      setItems(unique);
      setLoading(false);
    }

    fetchFeeds();
  }, [feeds, maxItems]);

  const colorMap: Record<string, { text: string; border: string }> = {
    signals: { text: "text-signals", border: "border-signals/40" },
    "static-v": { text: "text-static-v", border: "border-static-v/40" },
    frequencies: { text: "text-frequencies", border: "border-frequencies/40" },
    accent: { text: "text-accent", border: "border-accent/40" },
  };

  const c = colorMap[color] || colorMap.accent;

  function timeAgo(dateStr: string): string {
    if (!dateStr) return "";
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (isNaN(seconds) || seconds < 0) return "";
    if (seconds < 60) return "now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  }

  return (
    <div className={`border ${c.border} bg-bg-surface`}>
      <div className={`flex items-center justify-between px-3 py-1.5 border-b ${c.border} bg-bg`}>
        <span className={`text-xs ${c.text}`}>{title}</span>
        <div className="flex gap-1.5 text-xs text-text-muted">
          <span>_</span>
          <span>x</span>
        </div>
      </div>
      <div className="p-3">
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="py-1.5">
                <div className="h-2.5 w-full bg-bg rounded loading-pulse mb-1" />
                <div className="h-2 w-2/3 bg-bg rounded loading-pulse" />
              </div>
            ))}
            <p className="text-xs text-text-muted mt-2">
              {'>'} connecting to feed...
            </p>
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-0">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1.5 border-b border-border/30 last:border-b-0 group"
              >
                <p className="text-xs text-text group-hover:text-accent transition-colors leading-snug line-clamp-2">
                  {item.title}
                </p>
                {timeAgo(item.published) && (
                  <p className="text-xs text-text-muted mt-0.5">
                    {timeAgo(item.published)}
                  </p>
                )}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted">
            {'>'} feed offline. retrying on next load.
          </p>
        )}
      </div>
    </div>
  );
}
