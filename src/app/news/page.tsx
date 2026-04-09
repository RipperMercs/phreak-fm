import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Wire",
  description: "Aggregated security, music, and tech news from 38 trusted sources.",
};

const feedSources = {
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

export default function NewsPage() {
  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <header className="mb-8 border-b border-border pb-6">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
          {'>'} ./wire --status
        </p>
        <h1 className="text-2xl text-text-bright mb-2">News Wire</h1>
        <p className="text-sm text-text-muted">
          Aggregated from {38} sources across security, tech, and music.
          Updates every 30 minutes once the feed aggregator is deployed.
        </p>
        <div className="mt-3 flex gap-3 text-xs">
          <span className="text-signals border border-signals/30 px-2 py-0.5">SIG: {feedSources.signals.length} sources</span>
          <span className="text-static-v border border-static-v/30 px-2 py-0.5">STA: {feedSources.static.length} sources</span>
          <span className="text-frequencies border border-frequencies/30 px-2 py-0.5">MUS: {feedSources.frequencies.length} sources</span>
        </div>
      </header>

      {/* Wire status */}
      <div className="border border-border bg-bg-surface p-4 mb-8">
        <p className="text-xs text-text-muted mb-2">{'>'} wire.status()</p>
        <p className="text-xs text-static-v">
          STANDBY: Feed aggregator not yet deployed. Wire will activate
          when the Cloudflare Worker cron job is running.
        </p>
        <p className="text-xs text-text-muted mt-2">
          When active, this page will display a live chronological feed
          of headlines from all sources, filterable by section.
        </p>
      </div>

      {/* Source directory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Security sources */}
        <div>
          <h2 className="text-xs text-signals tracking-widest uppercase mb-4 border-b border-signals/20 pb-2">
            [SIG] Security Sources
          </h2>
          <div className="space-y-2">
            {feedSources.signals.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-text-muted hover:text-signals transition-colors py-1"
              >
                {'>'} {source.name}
              </a>
            ))}
          </div>
        </div>

        {/* Tech sources */}
        <div>
          <h2 className="text-xs text-static-v tracking-widest uppercase mb-4 border-b border-static-v/20 pb-2">
            [STA] Tech Sources
          </h2>
          <div className="space-y-2">
            {feedSources.static.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-text-muted hover:text-static-v transition-colors py-1"
              >
                {'>'} {source.name}
              </a>
            ))}
          </div>
        </div>

        {/* Music sources */}
        <div>
          <h2 className="text-xs text-frequencies tracking-widest uppercase mb-4 border-b border-frequencies/20 pb-2">
            [MUS] Music Sources
          </h2>
          <div className="space-y-2">
            {feedSources.frequencies.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-text-muted hover:text-frequencies transition-colors py-1"
              >
                {'>'} {source.name}
              </a>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}
