"use client";

import { ArticleFrontmatter } from "@/types";

interface TickerProps {
  articles: { frontmatter: ArticleFrontmatter }[];
}

export function Ticker({ articles }: TickerProps) {
  if (articles.length === 0) return null;

  const items = articles.map((a) => {
    const abbr: Record<string, string> = {
      signals: "SIG",
      frequencies: "MUS",
      static: "STA",
    };
    return `[${abbr[a.frontmatter.vertical] || "---"}] ${a.frontmatter.title}`;
  });

  // Double the items for seamless loop
  const tickerText = [...items, ...items].join("  ///  ");

  return (
    <div className="border-b border-border bg-bg-surface overflow-hidden whitespace-nowrap">
      <div className="animate-ticker inline-block py-1.5 text-xs text-text-muted">
        <span className="text-accent mr-2">WIRE</span>
        {tickerText}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
