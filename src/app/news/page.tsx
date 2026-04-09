"use client";

import { useState, useEffect } from "react";
import { FeedItem, Vertical } from "@/types";
import { NewsItemCard } from "@/components/NewsItemCard";

const VERTICALS: { key: Vertical | "all"; label: string; color: string }[] = [
  { key: "all", label: "All", color: "text-foreground" },
  { key: "signals", label: "Signals", color: "text-signals" },
  { key: "frequencies", label: "Frequencies", color: "text-frequencies" },
  { key: "static", label: "Static", color: "text-static-v" },
];

export default function NewsPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [filter, setFilter] = useState<Vertical | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL || "";
        const params = new URLSearchParams({ limit: "100" });
        if (filter !== "all") params.set("vertical", filter);

        const res = await fetch(`${apiBase}/api/feed/latest?${params}`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch {
        // API not available yet, show empty state
      }
      setLoading(false);
    }

    fetchNews();
  }, [filter]);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <h1 className="font-mono text-3xl text-foreground mb-3">News</h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Aggregated news from trusted sources across security, electronic
          music, and tech. Updated every 30 minutes.
        </p>
      </header>

      {/* Filter chips */}
      <nav className="mb-8 flex gap-2" aria-label="Filter by vertical">
        {VERTICALS.map((v) => (
          <button
            key={v.key}
            onClick={() => setFilter(v.key)}
            className={`font-mono text-sm px-3 py-1.5 rounded-sm border transition-colors ${
              filter === v.key
                ? `${v.color} border-current bg-surface`
                : "text-muted border-border hover:border-muted"
            }`}
            aria-pressed={filter === v.key}
          >
            {v.label}
          </button>
        ))}
      </nav>

      {/* News items */}
      <section>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-surface rounded animate-pulse"
              />
            ))}
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <NewsItemCard key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="font-mono text-sm text-muted mb-2">
              No news items loaded yet.
            </p>
            <p className="font-serif text-sm text-muted">
              The RSS aggregator will populate this page once the Cloudflare
              Worker is deployed and the cron job fires.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
