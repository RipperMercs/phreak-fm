import { Metadata } from "next";
import {
  loadFeedCache,
  getSortedWireItems,
  extractDomain,
  formatPubDate,
  sectionMeta,
} from "@/lib/feed-cache";

export const metadata: Metadata = {
  title: "News Wire",
  description: "Aggregated security, music, and tech news from trusted sources, refreshed on every build.",
  alternates: {
    canonical: "https://phreak.fm/news",
  },
};

const sourceDirectory = {
  signals: [
    { name: "Krebs on Security", url: "https://krebsonsecurity.com" },
    { name: "BleepingComputer", url: "https://www.bleepingcomputer.com" },
    { name: "The Record", url: "https://therecord.media" },
    { name: "The Hacker News", url: "https://thehackernews.com" },
    { name: "Ars Technica Security", url: "https://arstechnica.com/security/" },
    { name: "Wired Security", url: "https://www.wired.com/category/security/" },
    { name: "SANS ISC", url: "https://isc.sans.edu" },
    { name: "DarkReading", url: "https://www.darkreading.com" },
    { name: "SecurityWeek", url: "https://www.securityweek.com" },
    { name: "Risky Business", url: "https://risky.biz" },
    { name: "404 Media Security", url: "https://www.404media.co" },
  ],
  static: [
    { name: "404 Media", url: "https://www.404media.co" },
    { name: "Ars Technica", url: "https://arstechnica.com" },
    { name: "The Verge", url: "https://www.theverge.com" },
    { name: "Hacker News", url: "https://news.ycombinator.com" },
    { name: "Kottke.org", url: "https://kottke.org" },
    { name: "Waxy.org", url: "https://waxy.org" },
    { name: "Rest of World", url: "https://restofworld.org" },
    { name: "The Markup", url: "https://themarkup.org" },
    { name: "MIT Technology Review", url: "https://www.technologyreview.com" },
    { name: "Low-Tech Magazine", url: "https://solar.lowtechmagazine.com" },
  ],
  frequencies: [
    { name: "Resident Advisor", url: "https://ra.co" },
    { name: "Mixmag", url: "https://mixmag.net" },
    { name: "FACT Magazine", url: "https://www.factmag.com" },
    { name: "The Quietus", url: "https://thequietus.com" },
    { name: "Bandcamp Daily", url: "https://daily.bandcamp.com" },
    { name: "Pitchfork Electronic", url: "https://pitchfork.com" },
    { name: "XLR8R", url: "https://xlr8r.com" },
  ],
};

function formatBuildTimestamp(iso: string): string {
  if (!iso) return "unknown";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export default function NewsPage() {
  const cache = loadFeedCache();
  const items = getSortedWireItems(cache);

  const totalSources = Object.values(sourceDirectory).reduce(
    (n, list) => n + list.length,
    0,
  );

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <header className="mb-8 border-b border-border pb-6">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
          {">"} ./wire --tail
        </p>
        <h1 className="text-2xl text-text-bright mb-2">News Wire</h1>
        <p className="text-sm text-text-muted">
          Aggregated chronologically from {totalSources} sources across security, tech, and music. Refreshed on every site build.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="text-text-muted">
            {">"} last refresh:{" "}
            <span className="text-text">{formatBuildTimestamp(cache.built)}</span>
          </span>
          <span className="text-text-muted">{"|"}</span>
          <span className="text-text-muted">
            {">"} items: <span className="text-text">{items.length}</span>
          </span>
        </div>
      </header>

      {/* Wire */}
      <section className="mb-12">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-4">
          {">"} tail -f /var/log/wire
        </p>
        {items.length > 0 ? (
          <div className="space-y-0">
            {items.map((item, i) => {
              const meta = sectionMeta[item.section] || sectionMeta.dev;
              const domain = extractDomain(item.link);
              return (
                <a
                  key={`${item.link}-${i}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-2.5 border-b border-border/50 last:border-b-0 hover:bg-bg-surface/50 transition-colors -mx-2 px-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs text-text-muted w-6 shrink-0 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-xs ${meta.color} shrink-0 w-7`}>
                      {meta.abbr}
                    </span>
                    <span className="text-xs text-text-muted shrink-0 w-16">
                      {formatPubDate(item.published)}
                    </span>
                    <span className="text-sm text-text group-hover:text-accent transition-colors flex-1 leading-snug">
                      {item.title}
                    </span>
                    {domain && (
                      <span className="text-xs text-text-muted shrink-0 hidden md:inline">
                        {domain}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-text-muted">
            {">"} feed cache is empty. The next build will refresh.
          </p>
        )}
      </section>

      {/* Source directory */}
      <section className="border-t border-border pt-8">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-4">
          {">"} cat /etc/wire/sources
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xs text-signals tracking-widest uppercase mb-4 border-b border-signals/20 pb-2">
              [SIG] Security Sources
            </h2>
            <div className="space-y-2">
              {sourceDirectory.signals.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-text-muted hover:text-signals transition-colors py-1"
                >
                  {">"} {source.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs text-static-v tracking-widest uppercase mb-4 border-b border-static-v/20 pb-2">
              [STA] Tech Sources
            </h2>
            <div className="space-y-2">
              {sourceDirectory.static.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-text-muted hover:text-static-v transition-colors py-1"
                >
                  {">"} {source.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs text-frequencies tracking-widest uppercase mb-4 border-b border-frequencies/20 pb-2">
              [MUS] Music Sources
            </h2>
            <div className="space-y-2">
              {sourceDirectory.frequencies.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-text-muted hover:text-frequencies transition-colors py-1"
                >
                  {">"} {source.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
