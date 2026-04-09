"use client";

import Link from "next/link";
import { ArticleFrontmatter } from "@/types";

interface TickerProps {
  articles: { frontmatter: ArticleFrontmatter }[];
}

const tagColors: Record<string, string> = {
  signals: "#2dd4bf",
  frequencies: "#a78bfa",
  static: "#fbbf24",
};

const tagAbbr: Record<string, string> = {
  signals: "SIG",
  frequencies: "MUS",
  static: "STA",
};

export function Ticker({ articles }: TickerProps) {
  if (articles.length === 0) return null;

  // Double for seamless loop
  const doubled = [...articles, ...articles];

  return (
    <div className="border-b border-border bg-bg-surface overflow-hidden whitespace-nowrap relative">
      <div className="animate-ticker inline-flex items-center py-1.5 gap-0">
        {doubled.map((a, i) => (
          <Link
            key={`${a.frontmatter.slug}-${i}`}
            href={`/${a.frontmatter.vertical}/${a.frontmatter.slug}`}
            className="inline-flex items-center shrink-0 hover:opacity-80 transition-opacity"
          >
            <span
              className="text-xs font-bold mx-3"
              style={{ color: tagColors[a.frontmatter.vertical] || "#2dd4bf" }}
            >
              [{tagAbbr[a.frontmatter.vertical] || "---"}]
            </span>
            <span className="text-xs text-text-muted">
              {a.frontmatter.title}
            </span>
            <span className="text-xs text-border mx-4">///</span>
          </Link>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 90s linear infinite;
        }
      `}</style>
    </div>
  );
}
