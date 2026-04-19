// RSS feed is generated at build time via scripts/generate-rss.js
// The static file at public/feed.xml takes precedence in static export.
export const dynamic = "force-static";

export function GET() {
  return new Response("", { status: 200, headers: { "Content-Type": "application/xml" } });
}
