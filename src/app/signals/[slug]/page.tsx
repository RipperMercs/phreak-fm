import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/mdx";
import { buildArticleMetadata, buildArticleJsonLd } from "@/lib/seo";
import { getAuthor } from "@/lib/authors";
import { formatDate } from "@/lib/utils";
import { VerticalTag } from "@/components/VerticalTag";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { AudioPlayer } from "@/components/AudioPlayer";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getArticleSlugs("signals").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug("signals", params.slug);
  if (!article) return {};
  return buildArticleMetadata(article.frontmatter);
}

export default function SignalsArticlePage({ params }: PageProps) {
  const article = getArticleBySlug("signals", params.slug);
  if (!article) notFound();

  const author = getAuthor(article.frontmatter.author);
  const jsonLd = buildArticleJsonLd(article.frontmatter);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-article mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <VerticalTag vertical="signals" />
            <span className="text-xs text-muted font-mono">
              {formatDate(article.frontmatter.publishedAt)}
            </span>
            <span className="text-xs text-muted font-mono">
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-mono text-3xl sm:text-4xl text-foreground leading-tight mb-4">
            {article.frontmatter.title}
          </h1>

          <p className="font-serif text-lg text-muted mb-6">
            {article.frontmatter.excerpt}
          </p>

          {author && (
            <div className="flex items-center gap-3">
              <a
                href={`/author/${author.slug}`}
                className="font-mono text-sm text-accent hover:text-accent-hover"
              >
                {author.displayName}
              </a>
              {author.signature && (
                <span className="font-mono text-xs text-muted">
                  {author.signature}
                </span>
              )}
            </div>
          )}
        </header>

        {/* Hero image */}
        {article.frontmatter.heroImage && (
          <div
            className={`mb-10 rounded overflow-hidden ${
              article.frontmatter.heroGrain ? "grain-overlay" : ""
            }`}
          >
            <img
              src={article.frontmatter.heroImage}
              alt={article.frontmatter.title}
              className="w-full"
              loading="eager"
            />
          </div>
        )}

        {/* Body */}
        <ArticleRenderer source={article.content} />

        {/* Tags */}
        {article.frontmatter.tags.length > 0 && (
          <footer className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-1 bg-surface border border-border rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>

      {/* Audio player */}
      {article.frontmatter.audioUrl && (
        <AudioPlayer
          src={article.frontmatter.audioUrl}
          title={article.frontmatter.title}
        />
      )}
    </>
  );
}
