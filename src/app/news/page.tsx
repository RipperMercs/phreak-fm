"use client";

import { useState, useEffect } from "react";
import { FeedItem, Vertical } from "@/types";
import { WireItem } from "@/components/WireItem";

const FILTERS: { key: Vertical | "all"; label: string; abbr: string }[] = [
  { key: "all", label: "ALL", abbr: "ALL" },
  { key: "signals", label: "SIG", abbr: "SIG" },
  { key: "frequencies", label: "FRQ", abbr: "FRQ" },
  { key: "static", label: "STA", abbr: "STA" },
];

export default function NewsPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [filter, setFilter] = useState<Vertical | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
        const params = new URLSearchParams({ limit: "100" });
        if (filter !== "all") params.set("vertical", filter);

        const res = await fetch(`${apiBase}/api/feed/latest?${params}`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch {
        // API not available yet
      }
      setLoading(false);
    }

    fetchNews();
  }, [filter]);

  return (
    <main className="max-w-wire mx-auto px-4 sm:px-6 py-12">
      {/* Wire header */}
      <header className="mb-8">
        <h1 className="font-display text-3xl text-text mb-2">News Wire</h1>
        <p className="font-mono text-xs text-text-muted tracking-wide">
          AGGREGATED FEED :: UPDATED EVERY 30 MINUTES :: ALL SOURCES
        </p>
      </header>

      {/* Filter toggles */}
      <nav className="mb-8 flex gap-2" aria-label="Filter by vertical">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`font-mono text-xs px-3 py-1.5 rounded-sm border transition-colors ${
              filter === f.key
                ? "border-text text-text bg-bg-surface"
                : "border-border text-text-muted hover:border-text-muted"
            }`}
            aria-pressed={filter === f.key}
          >
            {f.abbr}
          </button>
        ))}
      </nav>

      {/* Wire feed */}
      <section>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="py-4 border-b border-dashed border-border">
                <div className="h-3 w-48 bg-bg-surface dot-matrix-loading rounded mb-2" />
                <div className="h-4 w-full bg-bg-surface dot-matrix-loading rounded mb-1" />
                <div className="h-3 w-3/4 bg-bg-surface dot-matrix-loading rounded" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <WireItem key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center py-16">
            <p className="font-mono text-sm text-text-muted mb-2">
              :: NO WIRE ITEMS LOADED ::
            </p>
            <p className="font-body text-sm text-text-muted">
              The RSS aggregator will populate this wire once the Cloudflare
              Worker is deployed and the cron job fires. Updated every 30
              minutes from {38} trusted sources.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
