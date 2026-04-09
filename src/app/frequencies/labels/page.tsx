import { Metadata } from "next";
import { getAllLabels, getFeaturedLabels } from "@/config/labels";

export const metadata: Metadata = {
  title: "Labels",
  description: "Electronic music label hub pages on phreak.fm. From Warp and Hyperdub to Bedrock and Global Underground.",
};

export default function LabelsIndexPage() {
  const allLabels = getAllLabels();
  const featured = getFeaturedLabels();
  const rest = allLabels.filter((l) => !l.featured);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-frequencies mb-2">Frequencies</p>
        <h1 className="font-mono text-3xl text-foreground mb-3">Labels</h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Label hub pages aggregating all related content and news mentions.
          The imprints shaping electronic music past and present.
        </p>
      </header>

      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
            Featured
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featured.map((label) => (
              <a
                key={label.slug}
                href={`/frequencies/labels/${label.slug}`}
                className="block p-4 bg-surface border border-accent/30 rounded hover:border-accent/60 transition-colors"
              >
                <span className="font-mono text-sm text-accent">
                  {label.name}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
          All Labels
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {rest.map((label) => (
            <a
              key={label.slug}
              href={`/frequencies/labels/${label.slug}`}
              className="block p-3 bg-surface border border-border rounded hover:border-frequencies/50 transition-colors"
            >
              <span className="font-mono text-sm text-foreground">
                {label.name}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
