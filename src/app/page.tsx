import { getFeaturedArticles, getAllArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";
import { buildSiteJsonLd } from "@/lib/seo";
import { Vertical } from "@/types";

export default function Home() {
  const jsonLd = buildSiteJsonLd();

  // Get one featured per vertical
  const verticals: Vertical[] = ["signals", "frequencies", "static"];
  const featuredByVertical = verticals.map((v) => {
    const featured = getFeaturedArticles(v);
    return featured[0] || null;
  }).filter(Boolean);

  // Get latest articles across all verticals
  const latestArticles = getAllArticles().slice(0, 10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <header className="mb-16 text-center">
          <h1 className="font-mono text-4xl sm:text-5xl tracking-tight mb-4">
            phreak<span className="text-accent">.fm</span>
          </h1>
          <p className="font-serif text-muted text-lg max-w-lg mx-auto">
            Signals, frequencies, and the people who bend them.
          </p>
          <div className="flex gap-6 justify-center mt-6 text-sm font-mono">
            <a href="/signals" className="text-signals hover:opacity-80 transition-opacity">
              Signals
            </a>
            <a href="/frequencies" className="text-frequencies hover:opacity-80 transition-opacity">
              Frequencies
            </a>
            <a href="/static" className="text-static-v hover:opacity-80 transition-opacity">
              Static
            </a>
          </div>
        </header>

        {/* Featured from each vertical */}
        {featuredByVertical.length > 0 && (
          <section className="mb-16">
            <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-8">
              Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredByVertical.map((article) =>
                article ? (
                  <ArticleCard
                    key={article.frontmatter.slug}
                    frontmatter={article.frontmatter}
                    variant="featured"
                  />
                ) : null
              )}
            </div>
          </section>
        )}

        {/* Latest across all verticals */}
        <section>
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
            Latest
          </h2>
          {latestArticles.length > 0 ? (
            latestArticles.map((a) => (
              <ArticleCard
                key={a.frontmatter.slug}
                frontmatter={a.frontmatter}
              />
            ))
          ) : (
            <p className="text-muted font-serif">
              The archive is being assembled. Articles coming soon.
            </p>
          )}
        </section>

        {/* News rail */}
        <section className="mt-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-sm text-muted uppercase tracking-wider">
              News Wire
            </h2>
            <a
              href="/news"
              className="font-mono text-sm text-accent hover:text-accent-hover"
            >
              View all
            </a>
          </div>
          <p className="text-muted font-serif text-sm">
            The news wire will populate once the Cloudflare Worker RSS
            aggregator is deployed and running.
          </p>
        </section>
      </main>
    </>
  );
}
