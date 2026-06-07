import { getRelayEntries } from "@/lib/relay";

// RSS feed for The Relay linkblog. Generated from content/relay.json, the same
// source the page uses. Statically exported, served at /relay.xml. Each item
// links straight to the thing being relayed; the guid points back to the
// on-site permalink so readers stay deduplicated.

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const SITE = "https://phreak.fm";

export async function GET() {
  const entries = getRelayEntries();

  const items = entries
    .map((e) => {
      const note = e.via ? `${e.note} (via ${e.via})` : e.note;
      const pubDate = new Date(`${e.date}T12:00:00Z`).toUTCString();
      return `    <item>
      <title>${esc(e.title)}</title>
      <link>${esc(e.url)}</link>
      <guid isPermaLink="false">${SITE}/relay#${esc(e.id)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${esc(note)}</description>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>phreak.fm :: the relay</title>
    <link>${SITE}/relay</link>
    <atom:link href="${SITE}/relay.xml" rel="self" type="application/rss+xml" />
    <description>Hand-picked signals, relayed with a note on why. A curated linkblog from phreak.fm.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
