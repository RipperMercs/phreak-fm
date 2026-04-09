# phreak.fm

## What This Is

phreak.fm is a single editorial publication covering three connected worlds: hacker culture and security narratives (Signals), boundary-pushing electronic music (Frequencies), and tech/nerd news (Static). The unifying editorial frame: signals, frequencies, and the people who bend them.

## Stack

- Next.js 14 (App Router) with TypeScript strict mode
- Cloudflare Pages for hosting
- Cloudflare Worker (`phreak-api`) for RSS ingestion and API
- Cloudflare KV for cached RSS and submissions
- Cloudflare R2 for audio and media storage
- Tailwind CSS for styling
- MDX for editorial content

## Three Verticals

- **Signals** :: hacker stories, security long-form, breach narratives, exploit post-mortems
- **Frequencies** :: electronic music reviews, features, interviews, artist/label hubs
- **Static** :: tech and nerd news, commentary, culture coverage

## Hard Rules

- **ZERO em dashes anywhere.** Not in code, not in copy, not in metadata, not in comments. Use commas, periods, colons, semicolons, or parentheses. Rewrite the sentence if needed. CI grep check enforces this.
- **ZERO double hyphens** (--) used as em dash substitutes in prose.
- **Google Workspace email only.** Never use Cloudflare Email Routing.
- **No AdSense code in V1.** Ads deferred until 20+ original articles and 45+ days of RSS history.

## Conventions

- React functional components with hooks
- Tailwind CSS only (no CSS modules, no styled-components)
- CSS custom properties for theming colors
- Semantic HTML (article, nav, aside, main, section)
- ARIA labels on interactive elements
- Monospace font for headings, metadata, nav. Serif font for body copy.
- Dark mode default, light mode toggle available

## Content Structure

- Editorial articles: `/content/[vertical]/*.mdx`
- Author personas defined in `/src/lib/authors.ts`
- RSS feed config in `/config/feeds.ts`
- Artist data in `/config/artists.ts`
- Label data in `/config/labels.ts`

## Sister Sites

TerminalFeed, TensorFeed, VR.org, DramaRadar. Cross-linked in footer. phreak.fm shares aesthetic DNA with TerminalFeed specifically.

## Dedication Page

`/dedication` is a quiet page honoring Dirk Bajema. Footer link only, not in primary nav. Content written by Evan, not generated.

## Design Tokens

- Background: #0a0a0a (dark), #f5f3ef (light)
- Foreground: #e8e6e1 (dark), #1a1a1a (light)
- Accent: signal green #00ff9f
- Signals tag: muted cyan #4ecdc4
- Frequencies tag: muted magenta #c77dff
- Static tag: muted yellow #ffd166
- Type scale: 1.25 ratio (Major Third)
- Spacing: 4px base grid
