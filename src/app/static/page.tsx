import { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";
import { buildVerticalMetadata } from "@/lib/seo";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = buildVerticalMetadata("static");

const pillars = [
  { slug: "tech-culture", title: "Tech Culture" },
  { slug: "platform-politics", title: "Platform Politics" },
  { slug: "weird-internet", title: "Weird Internet" },
];

export default function StaticPage() {
  const articles = getAllArticles("static");
  // Featured is a pin-to-top highlight, not a removal from Latest.
  const featured = articles.find((a) => a.frontmatter.featured);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <h1 className="font-mono text-3xl sm:text-4xl text-static-v mb-3">
          Static
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Tech and nerd news commentary. The wider signal, the things that
          matter to the people who care about how systems work.
        </p>
      </header>

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
            No articles yet. The signal is being tuned.
          </p>
        )}
      </section>

      <section className="pt-8 border-t border-border">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
          Topics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {pillars.map((topic) => (
            <a
              key={topic.slug}
              href={`/static/topics/${topic.slug}`}
              className="block p-4 bg-surface border border-border rounded hover:border-static-v/50 transition-colors"
            >
              <span className="font-mono text-sm text-foreground">
                {topic.title}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
