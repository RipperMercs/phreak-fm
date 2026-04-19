import { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";
import { buildVerticalMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = buildVerticalMetadata("signals");

export default function SignalsPage() {
  const articles = getAllArticles("signals");
  // One featured slot (the most recent featured article); everything else
  // including other featured:true items falls into Latest sorted by date.
  const featured = articles.find((a) => a.frontmatter.featured);
  const rest = articles.filter((a) => a !== featured);

  return (
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
            { slug: "famous-breaches", title: "Famous Breaches" },
            { slug: "ransomware-era", title: "Ransomware Era" },
            { slug: "nation-state-operations", title: "Nation State Operations" },
            { slug: "phreaker-elders-and-hacker-culture", title: "Phreaker Elders & Hacker Culture" },
            { slug: "zero-days-and-exploit-chains", title: "Zero Days & Exploit Chains" },
            { slug: "insider-threats", title: "Insider Threats" },
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
          {rest.length > 0 ? (
            rest.map((a) => (
              <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
            ))
          ) : articles.length === 0 ? (
            <p className="text-muted font-serif">
              No articles yet. The archive is being assembled.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
