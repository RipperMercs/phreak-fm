import { getAllArticles } from "@/lib/mdx";
import { buildSiteJsonLd } from "@/lib/seo";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";

export default function Home() {
  const jsonLd = buildSiteJsonLd();
  const allArticles = getAllArticles();
  const featured = allArticles.find((a) => a.frontmatter.featured);
  const latest = allArticles.filter((a) => a !== featured).slice(0, 10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-content mx-auto px-4 sm:px-6">
        {/* Hero */}
        <header className="py-12 sm:py-20 border-b border-border">
          <p className="text-xs text-text-muted mb-4 tracking-widest uppercase">
            transmitting
          </p>
          <h1 className="text-3xl sm:text-5xl text-text-bright leading-tight mb-4 cursor-blink">
            phreak<span className="text-accent">.fm</span>
          </h1>
          <p className="text-text-muted text-sm max-w-lg leading-relaxed">
            Hacker stories. Security narratives. Phreaker history.
            Electronic music for the people who listen at 3am.
            An archive, built slowly, for the ones who bend signals.
          </p>
        </header>

        {/* Two-column: Articles left, Feed right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0 lg:gap-10">
          {/* LEFT: Editorial */}
          <div>
            {/* Featured piece */}
            {featured && (
              <section className="py-8 border-b border-border">
                <p className="text-xs text-accent tracking-widest uppercase mb-4">
                  featured
                </p>
                <Link
                  href={`/${featured.frontmatter.vertical}/${featured.frontmatter.slug}`}
                  className="group block"
                >
                  <h2 className="text-xl sm:text-2xl text-text-bright group-hover:text-accent transition-colors leading-snug mb-3">
                    {featured.frontmatter.title}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed mb-3 max-w-2xl font-body">
                    {featured.frontmatter.excerpt}
                  </p>
                  <p className="text-xs text-text-muted">
                    {getAuthor(featured.frontmatter.author)?.displayName} :: {formatDate(featured.frontmatter.publishedAt)} :: {featured.frontmatter.readingTimeMinutes} min
                  </p>
                </Link>
              </section>
            )}

            {/* Latest articles */}
            <section className="py-8">
              <p className="text-xs text-text-muted tracking-widest uppercase mb-6">
                latest from the archive
              </p>
              <div className="space-y-0">
                {latest.map((article) => {
                  const author = getAuthor(article.frontmatter.author);
                  const sectionColors: Record<string, string> = {
                    signals: "text-signals",
                    frequencies: "text-frequencies",
                    static: "text-static-v",
                  };
                  const sectionAbbr: Record<string, string> = {
                    signals: "SIG",
                    frequencies: "MUS",
                    static: "STA",
                  };
                  return (
                    <Link
                      key={article.frontmatter.slug}
                      href={`/${article.frontmatter.vertical}/${article.frontmatter.slug}`}
                      className="group block py-3.5 border-b border-border last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <span className={`text-xs ${sectionColors[article.frontmatter.vertical]} shrink-0 mt-0.5 w-8`}>
                          {sectionAbbr[article.frontmatter.vertical]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm text-text group-hover:text-accent transition-colors leading-snug">
                            {article.frontmatter.title}
                          </h3>
                          <p className="text-xs text-text-muted mt-1">
                            {author?.displayName} :: {formatDate(article.frontmatter.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT: Live feeds sidebar */}
          <aside className="hidden lg:block border-l border-border pl-8 py-8">
            {/* Hacker / Security feed */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-signals tracking-widest uppercase">
                  security wire
                </p>
                <span className="text-xs text-text-muted">live</span>
              </div>
              <FeedPlaceholder count={6} color="signals" />
              <Link href="/news" className="block text-xs text-accent hover:text-accent-dim mt-3">
                full wire &gt;
              </Link>
            </div>

            {/* Tech / Nerd news feed */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-static-v tracking-widest uppercase">
                  tech wire
                </p>
                <span className="text-xs text-text-muted">live</span>
              </div>
              <FeedPlaceholder count={5} color="static-v" />
              <Link href="/news" className="block text-xs text-accent hover:text-accent-dim mt-3">
                full wire &gt;
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

function FeedPlaceholder({ count }: { count: number; color?: string }) {
  return (
    <div className="space-y-0">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="py-2.5 border-b border-border last:border-b-0">
          <div className={`h-2.5 w-3/4 bg-bg-surface rounded loading-pulse mb-1.5`} />
          <div className="h-2 w-1/2 bg-bg-surface rounded loading-pulse" />
        </div>
      ))}
      <p className="text-xs text-text-muted mt-3 italic">
        Feed activates when the RSS aggregator is deployed.
      </p>
    </div>
  );
}
