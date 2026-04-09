import { FeedItem } from "@/types";
import { verticalColor } from "@/lib/utils";

interface WireItemProps {
  item: FeedItem;
  showVertical?: boolean;
}

const verticalAbbr: Record<string, string> = {
  signals: "SIG",
  frequencies: "FRQ",
  static: "STA",
};

function formatWireTimestamp(timestamp: number): string {
  const d = new Date(timestamp);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${mm}.${dd}.${yy} ${hh}:${min}`;
}

export function WireItem({ item, showVertical = true }: WireItemProps) {
  return (
    <article className="animate-paper-feed py-4 border-b border-dashed border-border last:border-b-0">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline group"
      >
        {/* Header line: [TAG] timestamp  SOURCE */}
        <div className="flex items-center gap-3 font-mono text-xs tracking-wide">
          {showVertical && (
            <span className={`font-mono uppercase font-semibold ${verticalColor(item.vertical)}`}>
              [{verticalAbbr[item.vertical]}]
            </span>
          )}
          <span className="text-text-muted">
            {formatWireTimestamp(item.publishedAt)}
          </span>
          <span className="text-text-muted uppercase">
            {item.source}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-body text-base text-text mt-1.5 leading-snug group-hover:text-link transition-colors">
          {item.title}
        </h3>

        {/* Excerpt */}
        {item.excerpt && (
          <p className="font-body text-sm text-text-muted mt-1 line-clamp-2 leading-relaxed">
            {item.excerpt}
          </p>
        )}
      </a>
    </article>
  );
}
