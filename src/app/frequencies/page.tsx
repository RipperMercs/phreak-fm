import { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";
import { buildVerticalMetadata, buildVerticalJsonLd } from "@/lib/seo";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = buildVerticalMetadata("frequencies");

const genrePillars = [
  { slug: "ambient", title: "Ambient" },
  { slug: "idm", title: "IDM" },
  { slug: "house", title: "House" },
  { slug: "experimental-techno", title: "Experimental Techno" },
  { slug: "downtempo", title: "Downtempo" },
  { slug: "modular-synth", title: "Modular / Synth" },
  { slug: "drone-and-minimalism", title: "Drone & Minimalism" },
  { slug: "breaks", title: "Breaks" },
  { slug: "drum-and-bass", title: "Drum & Bass" },
];

export default function FrequenciesPage() {
  const articles = getAllArticles("frequencies");
  // Featured is a pin-to-top highlight, not a removal from Latest.
  const featured = articles.find((a) => a.frontmatter.featured);
  const jsonLdSchemas = buildVerticalJsonLd("frequencies");

  return (
    <>
      {jsonLdSchemas.map((schema: Record<string, unknown>, i: number) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <h1 className="font-mono text-3xl sm:text-4xl text-frequencies mb-3">
          Frequencies
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Electronic music reviews, artist features, label profiles, and scene
          coverage spanning ambient, IDM, progressive, techno, and experimental.
        </p>
      </header>

      {/* Quick links */}
      <nav className="mb-12 flex flex-wrap gap-3" aria-label="Frequencies sections">
        <a href="/frequencies/artists" className="font-mono text-sm px-3 py-1.5 bg-surface border border-border rounded hover:border-frequencies/50 transition-colors">
          Artists
        </a>
        <a href="/frequencies/labels" className="font-mono text-sm px-3 py-1.5 bg-surface border border-border rounded hover:border-frequencies/50 transition-colors">
          Labels
        </a>
        <a href="/frequencies/releases" className="font-mono text-sm px-3 py-1.5 bg-surface border border-border rounded hover:border-frequencies/50 transition-colors">
          Releases
        </a>
      </nav>

      {/* Featured */}
      {featured && (
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1">
            <ArticleCard
              key={featured.frontmatter.slug}
              frontmatter={featured.frontmatter}
              variant="featured"
            />
          </div>
        </section>
      )}

      {/* Latest */}
      <section className="mb-12">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
          Latest
        </h2>
        {articles.length > 0 ? (
          articles.map((a) => (
            <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
          ))
        ) : (
          <p className="text-muted font-serif">
            No articles yet. The frequencies are warming up.
          </p>
        )}
      </section>

      {/* Genre pillars */}
      <section className="pt-8 border-t border-border">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
          Genres
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {genrePillars.map((genre) => (
            <a
              key={genre.slug}
              href={`/frequencies/genres/${genre.slug}`}
              className="block p-3 bg-surface border border-border rounded hover:border-frequencies/50 transition-colors text-center"
            >
              <span className="font-mono text-sm text-foreground">
                {genre.title}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
