import { Metadata } from "next";
import releases from "../../../../content/releases.json";

export const metadata: Metadata = {
  title: "Release Calendar",
  description: "Upcoming and recent electronic music releases tracked by phreak.fm.",
};

interface Release {
  artist: string;
  title: string;
  label: string;
  releaseDate: string;
  format: string[];
  catalogNumber?: string;
  preOrderUrl?: string;
  coverImage?: string;
  featured?: boolean;
}

export default function ReleasesPage() {
  const sorted = [...(releases as Release[])].sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );

  const now = new Date();
  const upcoming = sorted.filter((r) => new Date(r.releaseDate) >= now);
  const recent = sorted.filter((r) => new Date(r.releaseDate) < now).reverse();

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-frequencies mb-2">Frequencies</p>
        <h1 className="font-mono text-3xl text-foreground mb-3">
          Release Calendar
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Upcoming and recent electronic music releases. Vinyl, digital, and
          everything in between.
        </p>
      </header>

      {/* Upcoming */}
      <section className="mb-12">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
          Upcoming
        </h2>
        {upcoming.length > 0 ? (
          <div className="space-y-0">
            {upcoming.map((release, i) => (
              <ReleaseRow key={i} release={release} />
            ))}
          </div>
        ) : (
          <p className="text-muted font-serif">No upcoming releases listed.</p>
        )}
      </section>

      {/* Recent */}
      {recent.length > 0 && (
        <section>
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
            Recent
          </h2>
          <div className="space-y-0">
            {recent.map((release, i) => (
              <ReleaseRow key={i} release={release} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function ReleaseRow({ release }: { release: Release }) {
  const date = new Date(release.releaseDate);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`flex items-center gap-4 py-4 border-b border-border ${
        release.featured ? "bg-accent/5 -mx-4 px-4 rounded" : ""
      }`}
    >
      <span className="font-mono text-xs text-muted w-24 shrink-0">
        {dateStr}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-sm text-foreground">
          {release.artist}: <span className="text-muted">{release.title}</span>
        </p>
        <p className="font-mono text-xs text-muted mt-0.5">
          {release.label}
          {release.catalogNumber && ` (${release.catalogNumber})`}
        </p>
      </div>
      <div className="flex gap-1.5">
        {release.format.map((f) => (
          <span
            key={f}
            className="font-mono text-xs px-1.5 py-0.5 bg-surface border border-border rounded"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
