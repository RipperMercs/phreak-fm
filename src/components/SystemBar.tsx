export function SystemBar({
  articleCount,
  feedCount,
}: {
  articleCount: number;
  feedCount: number;
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-xs text-text border-b border-border/50">
      <span><span className="text-text-muted">SYS.DATE:</span> {dateStr}</span>
      <span className="text-border">|</span>
      <span><span className="text-text-muted">ARTICLES:</span> {articleCount}</span>
      <span className="text-border">|</span>
      <span><span className="text-text-muted">FEED.SOURCES:</span> {feedCount}</span>
      <span className="text-border">|</span>
      <span><span className="text-text-muted">STATUS:</span> <span className="text-accent">ONLINE</span></span>
    </div>
  );
}
