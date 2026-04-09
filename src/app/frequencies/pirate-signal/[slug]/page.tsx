import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/mdx";
import { buildArticleMetadata, buildArticleJsonLd } from "@/lib/seo";
import { getAuthor } from "@/lib/authors";
import { formatDate } from "@/lib/utils";
import { VerticalTag } from "@/components/VerticalTag";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { EmbedPlayer } from "@/components/EmbedPlayer";
import { DeadWax } from "@/components/DeadWax";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  // Pirate Signal posts live in content/frequencies/pirate-signal/
  // but we load them via the frequencies vertical with subsection filter
  const slugs = getArticleSlugs("frequencies");
  // Filter for pirate-signal posts would require reading frontmatter;
  // for SSG we return all frequencies slugs and let the page 404 if not pirate-signal
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug("frequencies", `pirate-signal/${params.slug}`);
  if (!article) return {};
  return buildArticleMetadata(article.frontmatter);
}

export default function PirateSignalPostPage({ params }: PageProps) {
  const article = getArticleBySlug("frequencies", `pirate-signal/${params.slug}`);
  if (!article) notFound();

  const author = getAuthor(article.frontmatter.author);
  const jsonLd = buildArticleJsonLd(article.frontmatter);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-wire mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <VerticalTag vertical="frequencies" />
            <span className="font-mono text-xs text-riso-red">
              PIRATE SIGNAL
            </span>
            <span className="text-xs text-text-muted font-mono">
              {formatDate(article.frontmatter.publishedAt)}
            </span>
          </div>

          <h1 className="font-display text-3xl text-text leading-tight mb-4">
            {article.frontmatter.title}
          </h1>

          <p className="font-body text-lg text-text-muted mb-4">
            {article.frontmatter.excerpt}
          </p>

          {author && (
            <a
              href={`/author/${author.slug}`}
              className="font-mono text-sm text-link no-underline hover:text-link-hover"
            >
              {author.displayName}
            </a>
          )}
        </header>

        {/* Embedded player (centerpiece) */}
        {article.frontmatter.embedUrl && article.frontmatter.embedType && (
          <div className="mb-8">
            <EmbedPlayer
              url={article.frontmatter.embedUrl}
              type={article.frontmatter.embedType}
            />
          </div>
        )}

        {/* Body */}
        <ArticleRenderer source={article.content} />

        {/* Tags */}
        {article.frontmatter.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border-light">
            <div className="flex flex-wrap gap-2">
              {article.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-1 border border-border rounded-full text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dead wax */}
        <DeadWax
          author={author?.displayName || "the operator"}
          date={article.frontmatter.publishedAt}
          customInscription={article.frontmatter.deadwaxInscription}
        />
      </article>
    </>
  );
}
