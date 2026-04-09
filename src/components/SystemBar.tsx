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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-xs text-text-muted border-b border-border/50">
      <span>SYS.DATE: {dateStr}</span>
      <span className="text-border">|</span>
      <span>ARTICLES: {articleCount}</span>
      <span className="text-border">|</span>
      <span>FEED.SOURCES: {feedCount}</span>
      <span className="text-border">|</span>
      <span>STATUS: <span className="text-accent">ONLINE</span></span>
    </div>
  );
}
