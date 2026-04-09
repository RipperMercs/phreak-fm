"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";

interface SearchItem {
  title: string;
  excerpt: string;
  slug: string;
  vertical: string;
  author: string;
  tags: string[];
  artist?: string;
  label?: string;
  url: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: SearchItem[]) => {
        setIndex(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "excerpt", weight: 0.2 },
          { name: "author", weight: 0.1 },
          { name: "tags", weight: 0.15 },
          { name: "artist", weight: 0.1 },
          { name: "label", weight: 0.05 },
        ],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [index]
  );

  const results = query.length >= 2 ? fuse.search(query, { limit: 20 }) : [];

  const verticalColor: Record<string, string> = {
    signals: "text-signals",
    frequencies: "text-frequencies",
    static: "text-static-v",
  };

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <h1 className="font-mono text-3xl text-foreground mb-6">/search</h1>
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, artists, labels, tags..."
            className="w-full bg-surface border border-border rounded px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
            aria-label="Search phreak.fm"
            autoFocus
          />
        </div>
      </header>

      <section>
        {!loaded ? (
          <p className="text-muted font-mono text-sm">Loading search index...</p>
        ) : query.length < 2 ? (
          <p className="text-muted font-serif text-sm">
            Type at least 2 characters to search.
          </p>
        ) : results.length > 0 ? (
          <div className="space-y-0">
            {results.map((result) => (
              <a
                key={result.item.url}
                href={result.item.url}
                className="group block py-4 border-b border-border"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`font-mono text-xs uppercase ${
                      verticalColor[result.item.vertical] || "text-muted"
                    }`}
                  >
                    {result.item.vertical}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {result.item.author}
                  </span>
                </div>
                <h3 className="font-mono text-sm text-foreground group-hover:text-accent transition-colors">
                  {result.item.title}
                </h3>
                <p className="font-serif text-xs text-muted mt-1 line-clamp-1">
                  {result.item.excerpt}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-muted font-serif text-sm">
            No results found for &ldquo;{query}&rdquo;.
          </p>
        )}
      </section>
    </main>
  );
}
