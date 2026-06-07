import type { Metadata } from "next";
import { getRelayEntries, type Vertical } from "@/lib/relay";

export const metadata: Metadata = {
  title: "The Relay",
  description:
    "Hand-picked signals, relayed with a note on why. A curated linkblog of things worth your attention, separate from the automated news wire.",
  alternates: {
    canonical: "https://phreak.fm/relay",
    types: {
      "application/rss+xml": "https://phreak.fm/relay.xml",
    },
  },
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const TAG: Record<Vertical, { abbr: string; color: string }> = {
  signals: { abbr: "SIG", color: "text-signals" },
  frequencies: { abbr: "MUS", color: "text-frequencies" },
  static: { abbr: "STA", color: "text-static-v" },
};

function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map((n) => parseInt(n, 10));
  return `${MONTHS[month - 1]} ${String(day).padStart(2, "0")}, ${year}`;
}

export default function RelayPage() {
  const entries = getRelayEntries();

  return (
    <main className="max-w-wire mx-auto px-4 sm:px-6 py-8">
      <header className="mb-8 border-b border-border pb-6">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
          {">"} relay --tail
        </p>
        <h1 className="text-2xl text-text-bright mb-2">The Relay</h1>
        <p className="text-sm text-text-muted">
          Hand-picked signals, relayed with a note on why. Not the machine wire,
          just things I think are worth your time.
        </p>
        <a
          href="/relay.xml"
          className="mt-3 inline-block font-mono text-xs text-text-muted hover:text-accent transition-colors"
        >
          {">"} subscribe (RSS)
        </a>
      </header>

      <div className="space-y-8">
        {entries.map((e) => {
          const tag = e.vertical ? TAG[e.vertical] : null;
          return (
            <article
              key={e.id}
              id={e.id}
              className="scroll-mt-20 border-b border-dashed border-border pb-8 last:border-b-0"
            >
              <div className="flex items-center gap-3 font-mono text-xs mb-1.5">
                {tag && (
                  <span className={`uppercase font-semibold ${tag.color}`}>
                    [{tag.abbr}]
                  </span>
                )}
                <span className="text-text-muted">{formatDate(e.date)}</span>
                <a
                  href={`#${e.id}`}
                  className="text-text-muted hover:text-accent transition-colors"
                  aria-label="Permalink to this entry"
                >
                  #
                </a>
              </div>

              <h2 className="text-base leading-snug">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-bright hover:text-accent transition-colors"
                >
                  {e.title}
                </a>
              </h2>

              <p className="font-body text-sm text-text-muted mt-2 leading-relaxed">
                {e.note}
              </p>

              {e.via && (
                <p className="mt-1 text-xs text-text-muted">via {e.via}</p>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
