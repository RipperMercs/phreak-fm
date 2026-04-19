import { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";
import { buildVerticalMetadata, buildVerticalJsonLd } from "@/lib/seo";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = buildVerticalMetadata("signals");

export default function SignalsPage() {
  const articles = getAllArticles("signals");
  const jsonLdSchemas = buildVerticalJsonLd("signals");
  // Featured is a pin-to-top highlight, not a removal from Latest. The
  // featured piece appears both in the Featured slot and at the top of the
  // chronological list, so the feed always reflects every published piece.
  const featured = articles.find((a) => a.frontmatter.featured);

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
      {/* Header */}
      <header className="mb-12">
        <h1 className="font-mono text-3xl sm:text-4xl text-signals mb-3">
          Signals
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Hacker stories, security long-form, breach narratives, and exploit
          post-mortems. The history and present of the people who bend signals.
        </p>
      </header>

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

      {/* Topics: surfaced above Latest so people browsing for a specific
          subject can jump in without scrolling the whole chronological feed. */}
      <section className="mb-12">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
          Browse by Topic
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { slug: "phreaker-elders-and-hacker-culture", title: "Phreaker Elders & Hacker Culture" },
            { slug: "famous-breaches", title: "Famous Breaches" },
            { slug: "nation-state-operations", title: "Nation State Operations" },
            { slug: "zero-days-and-exploit-chains", title: "Zero Days & Exploit Chains" },
            { slug: "viruses-and-worms", title: "Viruses & Worms" },
            { slug: "crypto-wars", title: "Crypto Wars" },
          ].map((topic) => (
            <a
              key={topic.slug}
              href={`/signals/topics/${topic.slug}`}
              className="block p-3 bg-surface border border-border rounded hover:border-signals/50 transition-colors text-center"
            >
              <span className="font-mono text-sm text-foreground">
                {topic.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* All articles */}
      <section>
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
          Latest
        </h2>
        <div>
          {articles.length > 0 ? (
            articles.map((a) => (
              <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
            ))
          ) : (
            <p className="text-muted font-serif">
              No articles yet. The archive is being assembled.
            </p>
          )}
        </div>
      </section>
    </main>
    </>
  );
}
