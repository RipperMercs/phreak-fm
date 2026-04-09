export async function GET() {
  const content = `# phreak.fm

> Signals, frequencies, and the people who bend them.

phreak.fm is a single editorial publication covering three connected worlds:

1. Signals: hacker culture, security long-form, breach narratives, exploit post-mortems
2. Frequencies: electronic music reviews, features, interviews, artist and label hubs
3. Static: tech and nerd news editorial, commentary, culture coverage

## Content Verticals

- /signals: hacker stories, security analysis, breach narratives, scene history
- /frequencies: electronic music reviews, artist features, label profiles, genre coverage
- /static: tech news commentary, industry coverage, digital culture
- /news: unified RSS aggregator across all three verticals

## Key Features

- Artist and label hub pages that aggregate all related content and news
- Genre pillar pages for electronic music (ambient, IDM, progressive, techno, experimental)
- Topic pillar pages for security (famous breaches, ransomware, nation state operations, hacker culture)
- Unified news feed from trusted security, music, and tech sources

## API

- /api/feed/latest: latest RSS items across all verticals
- /api/feed/vertical/:slug: items filtered by vertical
- /api/feed/source/:slug: items filtered by source
- /api/artist/:slug: news mentioning a specific artist
- /api/label/:slug: news mentioning a specific label
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
