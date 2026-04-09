import { FeedItem } from "@/types";
import { VerticalTag } from "./VerticalTag";
import { timeAgo } from "@/lib/utils";

interface NewsItemCardProps {
  item: FeedItem;
  showVertical?: boolean;
}

export function NewsItemCard({ item, showVertical = true }: NewsItemCardProps) {
  return (
    <article className="group py-3 border-b border-border last:border-b-0">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start gap-3">
          {showVertical && <VerticalTag vertical={item.vertical} />}
          <div className="flex-1 min-w-0">
            <h3 className="font-mono text-sm text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted font-mono">
                {item.source}
              </span>
              <span className="text-xs text-muted">::</span>
              <span className="text-xs text-muted font-mono">
                {timeAgo(item.publishedAt)}
              </span>
              {item.trustTier === 1 && (
                <span className="text-xs text-accent font-mono opacity-50">
                  T1
                </span>
              )}
            </div>
            {item.excerpt && (
              <p className="text-xs text-muted font-serif mt-1 line-clamp-1">
                {item.excerpt}
              </p>
            )}
          </div>
        </div>
      </a>
    </article>
  );
}
