import { getFeaturedArticles, getAllArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";
import { buildSiteJsonLd } from "@/lib/seo";
import { Vertical } from "@/types";

export default function Home() {
  const jsonLd = buildSiteJsonLd();

  const verticals: Vertical[] = ["signals", "frequencies", "static"];
  const featuredByVertical = verticals
    .map((v) => getFeaturedArticles(v)[0] || null)
    .filter(Boolean);

  const allArticles = getAllArticles();
  const latestArticles = allArticles.slice(0, 8);

  // Pirate Signal posts
  const piratePosts = allArticles
    .filter((a) => a.frontmatter.subsection === "pirate-signal")
    .slice(0, 3);

  // Hero: first featured article
  const hero = featuredByVertical[0] || null;
  const secondaryFeatured = featuredByVertical.slice(1, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
        {/* Masthead */}
        <header className="mb-16">
          <h1 className="font-display text-5xl sm:text-6xl tracking-tight text-text mb-3">
            phreak<span className="text-riso-cyan">.fm</span>
          </h1>
          <p className="font-body text-text-muted text-lg italic">
            signals, frequencies, and the people who bend them
          </p>
        </header>

        {/* Hero feature (large, asymmetric) */}
        {hero && (
          <section className="mb-16">
            <ArticleCard frontmatter={hero.frontmatter} variant="featured" />
          </section>
        )}

        {/* Asymmetric two-column: editorial left, wire sidebar right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          {/* Left: secondary editorial pieces */}
          <div className="space-y-8">
            {secondaryFeatured.map((article) =>
              article ? (
                <ArticleCard
                  key={article.frontmatter.slug}
                  frontmatter={article.frontmatter}
                  variant="default"
                />
              ) : null
            )}
            {latestArticles.slice(0, 4).map((article) => (
              <ArticleCard
                key={article.frontmatter.slug}
                frontmatter={article.frontmatter}
                variant="default"
              />
            ))}
          </div>

          {/* Right: condensed news wire sidebar */}
          <aside className="border-l border-border pl-6 hidden lg:block">
            <h2 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
              News Wire
            </h2>
            <p className="font-body text-sm text-text-muted mb-4">
              Wire will populate once the RSS aggregator is deployed.
            </p>
            <a
              href="/news"
              className="no-underline font-mono text-xs text-link hover:text-link-hover"
            >
              View full wire
            </a>
          </aside>
        </div>

        {/* Three vertical panels */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pt-8 border-t border-border">
          {verticals.map((v) => {
            const vArticles = getAllArticles(v).slice(0, 3);
            const labels: Record<Vertical, string> = {
              signals: "Signals",
              frequencies: "Frequencies",
              static: "Static",
            };
            const colors: Record<Vertical, string> = {
              signals: "text-signals",
              frequencies: "text-frequencies",
              static: "text-static-v",
            };
            return (
              <div key={v}>
                <a
                  href={`/${v}`}
                  className={`no-underline font-mono text-xs uppercase tracking-widest ${colors[v]} mb-4 block`}
                >
                  {labels[v]}
                </a>
                {vArticles.length > 0 ? (
                  vArticles.map((a) => (
                    <ArticleCard
                      key={a.frontmatter.slug}
                      frontmatter={a.frontmatter}
                      variant="compact"
                    />
                  ))
                ) : (
                  <p className="font-body text-sm text-text-muted">
                    Content coming soon.
                  </p>
                )}
              </div>
            );
          })}
        </section>

        {/* Pirate Signal strip */}
        {piratePosts.length > 0 && (
          <section className="pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-mono text-xs text-text-muted uppercase tracking-widest">
                Pirate Signal
              </h2>
              <a
                href="/frequencies/pirate-signal"
                className="no-underline font-mono text-xs text-frequencies hover:text-link-hover"
              >
                View all
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {piratePosts.map((post) => (
                <ArticleCard
                  key={post.frontmatter.slug}
                  frontmatter={post.frontmatter}
                  variant="compact"
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
