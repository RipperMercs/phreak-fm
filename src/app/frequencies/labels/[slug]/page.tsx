import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLabel, getAllLabels } from "@/config/labels";
import { getAllArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllLabels().map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const label = getLabel(params.slug);
  if (!label) return {};
  return {
    title: `${label.name} | Frequencies`,
    description: label.bio || `${label.name} label hub on phreak.fm. Articles, reviews, and news.`,
  };
}

export default function LabelPage({ params }: PageProps) {
  const label = getLabel(params.slug);
  if (!label) notFound();

  // Surface articles that either set the label field explicitly or include
  // the label slug in tags, so coverage shows on the hub even when an
  // article was written without the label field set.
  // String() coercion guards against YAML parsing year tags as numbers.
  const articles = getAllArticles("frequencies").filter((a) => {
    if (a.frontmatter.label === label.slug) return true;
    const tags = a.frontmatter.tags || [];
    return tags.map((t) => String(t).toLowerCase()).includes(label.slug);
  });

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-frequencies mb-2">
          Frequencies :: Labels
        </p>
        <h1 className="font-mono text-3xl text-foreground mb-3">
          {label.name}
        </h1>
        {label.bio ? (
          <p className="font-serif text-muted text-lg max-w-2xl">
            {label.bio}
          </p>
        ) : (
          <p className="font-serif text-muted text-lg max-w-2xl">
            Label page for {label.name}. Content and bio coming soon.
          </p>
        )}

        {Object.keys(label.links).length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.entries(label.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-2 py-1 bg-surface border border-border rounded hover:border-frequencies/50"
              >
                {key}
              </a>
            ))}
          </div>
        )}
      </header>

      <section>
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
          Articles
        </h2>
        {articles.length > 0 ? (
          articles.map((a) => (
            <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
          ))
        ) : (
          <p className="text-muted font-serif">
            No articles yet for {label.name}. News aggregation will appear
            once the RSS feeds are active.
          </p>
        )}
      </section>
    </main>
  );
}
