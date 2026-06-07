import { feedSources } from "@/config/feeds";

// An OPML 2.0 export of the wire's source feeds, so a reader can import the
// whole curated set into their own RSS app in one move. Generated from the same
// feeds.ts that powers /news. Statically exported, served at /feeds.opml.

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const VERTICALS: { key: "signals" | "frequencies" | "static"; label: string }[] = [
  { key: "signals", label: "Signals" },
  { key: "frequencies", label: "Frequencies" },
  { key: "static", label: "Static" },
];

export async function GET() {
  // OPML carries RSS/Atom feeds. Skip the one JSON feed, which readers cannot import.
  const feeds = feedSources.filter((f) => !f.url.endsWith(".json"));

  const groups = VERTICALS.map(({ key, label }) => {
    const outlines = feeds
      .filter((f) => f.vertical === key)
      .map(
        (f) =>
          `      <outline type="rss" text="${esc(f.name)}" title="${esc(f.name)}" xmlUrl="${esc(f.url)}" />`
      )
      .join("\n");
    return `    <outline text="${label}" title="${label}">\n${outlines}\n    </outline>`;
  }).join("\n");

  const opml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>phreak.fm :: the wire</title>
    <ownerName>phreak.fm</ownerName>
  </head>
  <body>
${groups}
  </body>
</opml>
`;

  return new Response(opml, {
    headers: {
      "Content-Type": "text/x-opml; charset=utf-8",
    },
  });
}
