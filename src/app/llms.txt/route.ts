import { getAllSpecimens } from "@/lib/museum";

export async function GET() {
  const specimens = getAllSpecimens();
  const specimenList = specimens
    .map(
      (s) =>
        `- /museum/specimens/${s.frontmatter.slug}: ${s.frontmatter.name} (${
          s.frontmatter.discoveredYear ?? "unknown"
        })`
    )
    .join("\n");

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
- /museum: DOS Virus Museum, a static historical archive of MS-DOS-era computer viruses

## DOS Virus Museum

The /museum section is a strictly educational archive of MS-DOS-era computer viruses
from roughly 1986 through 1998. It contains no executables, no binaries, and no
downloadable payloads. All material is historical documentation, still images,
animated captures, technical writeups, and cultural commentary sourced from public
educational archives like the Internet Archive Malware Museum and Virus Bulletin.

Specimen pages:
${specimenList}

## Key Features

- Artist and label hub pages that aggregate all related content and news
- Genre pillar pages for electronic music (ambient, IDM, progressive, techno, experimental)
- Topic pillar pages for security (famous breaches, ransomware, nation state operations, hacker culture)
- Unified news feed from trusted security, music, and tech sources
- DOS Virus Museum specimen catalog and family/year/author indexes

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
