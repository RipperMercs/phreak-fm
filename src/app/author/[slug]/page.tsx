import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAuthor, getAllAuthors } from "@/lib/authors";
import { getArticlesByAuthor } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";
import { VerticalTag } from "@/components/VerticalTag";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const author = getAuthor(params.slug);
  if (!author) return {};
  return {
    title: author.displayName,
    description: author.bio,
    alternates: {
      canonical: `https://phreak.fm/author/${params.slug}`,
    },
  };
}

export default function AuthorPage({ params }: PageProps) {
  const author = getAuthor(params.slug);
  if (!author) notFound();

  const articles = getArticlesByAuthor(params.slug);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <VerticalTag vertical={author.primaryVertical} />
        <h1 className="font-mono text-3xl text-foreground mt-4 mb-3">
          {author.displayName}
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl mb-4">
          {author.bio}
        </p>
        {author.signature && (
          <p className="font-mono text-sm text-accent">{author.signature}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {author.specialties.map((s) => (
            <span
              key={s}
              className="font-mono text-xs px-2 py-1 bg-surface border border-border rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </header>

      <section>
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
          Articles by {author.displayName}
        </h2>
        {articles.length > 0 ? (
          articles.map((a) => (
            <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
          ))
        ) : (
          <p className="text-muted font-serif">
            No articles published yet. Stay tuned.
          </p>
        )}
      </section>
    </main>
  );
}
