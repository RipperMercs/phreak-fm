import Link from "next/link";
import { ArticleFrontmatter } from "@/types";
import { VerticalTag } from "./VerticalTag";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";

interface ArticleCardProps {
  frontmatter: ArticleFrontmatter;
  variant?: "featured" | "default" | "compact";
}

export function ArticleCard({
  frontmatter,
  variant = "default",
}: ArticleCardProps) {
  const author = getAuthor(frontmatter.author);
  const href = `/${frontmatter.vertical}/${frontmatter.slug}`;

  if (variant === "compact") {
    return (
      <article className="group py-2">
        <Link href={href} className="flex items-center gap-3 no-underline">
          <VerticalTag vertical={frontmatter.vertical} />
          <h3 className="font-display text-sm text-text group-hover:text-link transition-colors truncate flex-1">
            {frontmatter.title}
          </h3>
          <span className="text-xs text-text-muted font-mono whitespace-nowrap">
            {formatDate(frontmatter.publishedAt)}
          </span>
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group">
        <Link href={href} className="block no-underline space-y-4">
          {frontmatter.heroImage && (
            <div className="halftone-overlay grain-overlay aspect-[16/9] bg-bg-surface overflow-hidden rounded-sm">
              <img
                src={frontmatter.heroImage}
                alt={frontmatter.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          )}
          <div className="space-y-3">
            <VerticalTag vertical={frontmatter.vertical} />
            <h2 className="font-display text-3xl md:text-4xl text-text leading-tight group-hover:text-link transition-colors text-balance">
              {frontmatter.title}
            </h2>
            <p className="font-body text-text-muted text-base leading-relaxed line-clamp-3">
              {frontmatter.excerpt}
            </p>
            <p className="font-mono text-xs tracking-wide">
              <span className="text-text-muted">{author?.displayName}</span>
              <span className="text-border"> :: </span>
              <span className="text-accent">{formatDate(frontmatter.publishedAt)}</span>
              <span className="text-border"> :: </span>
              <span className="text-text-muted">{frontmatter.readingTimeMinutes} min read</span>
            </p>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group py-6 border-b border-border-light last:border-b-0">
      <Link href={href} className="block no-underline space-y-2">
        <div className="flex items-center gap-3">
          <VerticalTag vertical={frontmatter.vertical} />
        </div>
        <h3 className="font-display text-xl text-text group-hover:text-link transition-colors leading-snug">
          {frontmatter.title}
        </h3>
        <p className="font-body text-text-muted text-sm line-clamp-2 leading-relaxed">
          {frontmatter.excerpt}
        </p>
        <p className="font-mono text-xs tracking-wide">
          <span className="text-text-muted">{author?.displayName}</span>
          <span className="text-border"> :: </span>
          <span className="text-accent">{formatDate(frontmatter.publishedAt)}</span>
          <span className="text-border"> :: </span>
          <span className="text-text-muted">{frontmatter.readingTimeMinutes} min read</span>
        </p>
      </Link>
    </article>
  );
}
