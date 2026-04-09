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
  return getArticleSlugs("frequencies").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug("frequencies", params.slug);
  if (!article) return {};
  return buildArticleMetadata(article.frontmatter);
}

export default function FrequenciesArticlePage({ params }: PageProps) {
  const article = getArticleBySlug("frequencies", params.slug);
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
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <VerticalTag vertical="frequencies" />
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

          {/* Music metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {article.frontmatter.artist && (
              <a
                href={`/frequencies/artists/${article.frontmatter.artist}`}
                className="font-mono text-sm text-frequencies hover:opacity-80"
              >
                {article.frontmatter.artist}
              </a>
            )}
            {article.frontmatter.label && (
              <a
                href={`/frequencies/labels/${article.frontmatter.label}`}
                className="font-mono text-sm text-muted hover:text-foreground"
              >
                {article.frontmatter.label}
              </a>
            )}
            {article.frontmatter.releaseYear && (
              <span className="font-mono text-sm text-muted">
                {article.frontmatter.releaseYear}
              </span>
            )}
            {article.frontmatter.rating && (
              <span className="font-mono text-sm text-accent">
                {article.frontmatter.rating}/10
              </span>
            )}
          </div>

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

        <ArticleRenderer source={article.content} />

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

      {article.frontmatter.audioUrl && (
        <AudioPlayer
          src={article.frontmatter.audioUrl}
          title={article.frontmatter.title}
        />
      )}
    </>
  );
}
