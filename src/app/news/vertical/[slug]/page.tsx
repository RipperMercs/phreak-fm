"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FeedItem, Vertical } from "@/types";
import { WireItem } from "@/components/WireItem";
import { verticalLabel } from "@/lib/utils";

export default function NewsVerticalPage() {
  const params = useParams();
  const slug = params.slug as Vertical;
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(
          `${apiBase}/api/feed/latest?vertical=${slug}&limit=100`
        );
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch {
        // API not available
      }
      setLoading(false);
    }

    fetchNews();
  }, [slug]);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <p className="font-mono text-sm text-muted mb-2">News :: Vertical</p>
        <h1 className="font-mono text-3xl text-foreground mb-3">
          {verticalLabel(slug)}
        </h1>
      </header>

      <section>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-16 bg-surface rounded animate-pulse" />
            ))}
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <WireItem key={item.id} item={item} showVertical={false} />
          ))
        ) : (
          <p className="text-muted font-serif">
            No items for this vertical yet. RSS feeds will populate once the
            Worker is deployed.
          </p>
        )}
      </section>
    </main>
  );
}
