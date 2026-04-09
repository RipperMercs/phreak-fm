import { getAllArticles } from "@/lib/mdx";
import { buildSiteJsonLd } from "@/lib/seo";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";

export default function Home() {
  const jsonLd = buildSiteJsonLd();
  const allArticles = getAllArticles();
  const featured = allArticles.find((a) => a.frontmatter.featured);
  const latest = allArticles.filter((a) => a !== featured).slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-content mx-auto px-4 sm:px-6">
        {/* Hero */}
        <header className="py-16 sm:py-24 border-b border-border">
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

        {/* Featured piece */}
        {featured && (
          <section className="py-10 border-b border-border">
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

        {/* Latest */}
        <section className="py-10">
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
                  className="group block py-4 border-b border-border last:border-b-0"
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

        {/* Wire teaser */}
        <section className="py-10 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-text-muted tracking-widest uppercase">
              news wire
            </p>
            <Link href="/news" className="text-xs text-accent hover:text-accent-dim">
              view wire &gt;
            </Link>
          </div>
          <p className="text-xs text-text-muted">
            Live feed from {38} sources across security, music, and tech.
            Updates every 30 minutes once the aggregator is deployed.
          </p>
        </section>
      </main>
    </>
  );
}
