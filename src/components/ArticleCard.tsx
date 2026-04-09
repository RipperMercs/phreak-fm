import Link from "next/link";
import { ArticleFrontmatter } from "@/types";
import { VerticalTag } from "./VerticalTag";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";

interface ArticleCardProps {
  frontmatter: ArticleFrontmatter;
  variant?: "default" | "featured" | "compact";
}

export function ArticleCard({
  frontmatter,
  variant = "default",
}: ArticleCardProps) {
  const author = getAuthor(frontmatter.author);
  const href = `/${frontmatter.vertical}/${frontmatter.slug}`;

  if (variant === "compact") {
    return (
      <article className="group py-3 border-b border-border last:border-b-0">
        <Link href={href} className="block">
          <div className="flex items-start gap-3">
            <VerticalTag vertical={frontmatter.vertical} />
            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-sm text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {frontmatter.title}
              </h3>
              <p className="text-xs text-muted mt-1 font-mono">
                {author?.displayName} :: {formatDate(frontmatter.publishedAt)}
              </p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group">
        <Link href={href} className="block space-y-4">
          {frontmatter.heroImage && (
            <div
              className={`aspect-[16/9] bg-surface rounded overflow-hidden ${
                frontmatter.heroGrain ? "grain-overlay" : ""
              }`}
            >
              <img
                src={frontmatter.heroImage}
                alt={frontmatter.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          )}
          <div className="space-y-2">
            <VerticalTag vertical={frontmatter.vertical} />
            <h2 className="font-mono text-2xl text-foreground group-hover:text-accent transition-colors leading-tight">
              {frontmatter.title}
            </h2>
            <p className="font-serif text-muted text-base line-clamp-3">
              {frontmatter.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted font-mono">
              <span>{author?.displayName}</span>
              <span>::</span>
              <span>{formatDate(frontmatter.publishedAt)}</span>
              <span>::</span>
              <span>{frontmatter.readingTimeMinutes} min read</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group py-6 border-b border-border last:border-b-0">
      <Link href={href} className="block space-y-2">
        <div className="flex items-center gap-3">
          <VerticalTag vertical={frontmatter.vertical} />
          <span className="text-xs text-muted font-mono">
            {formatDate(frontmatter.publishedAt)}
          </span>
        </div>
        <h3 className="font-mono text-lg text-foreground group-hover:text-accent transition-colors">
          {frontmatter.title}
        </h3>
        <p className="font-serif text-muted text-sm line-clamp-2">
          {frontmatter.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted font-mono">
          <span>{author?.displayName}</span>
          <span>::</span>
          <span>{frontmatter.readingTimeMinutes} min read</span>
        </div>
      </Link>
    </article>
  );
}
