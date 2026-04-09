# phreak.fm

## Project Identity

phreak.fm is a personal project by Ripper (RipperMercs). NOT Pizza Robot Studios, NOT corporate. A personal passion archive for hacker stories, boundary-pushing electronic music, and outsider nerd culture. Built for the love of it.

## Editorial Frame

Three verticals (Signals, Frequencies, Static), one unified voice: "signals, frequencies, and the people who bend them." Phreaking was always about manipulating sound to manipulate systems. That lineage holds hackers, producers, and weird internet nerds in one voice.

## Aesthetic Identity

**Xerox zine meets Warp Records liner notes meets 2600 Magazine schematic cover.** Warm where the sibling sites are cool. Analog where they are digital. Editorial where they are dashboard. Asymmetric where they are grid. A site that feels like a physical object that got scanned and uploaded.

This is NOT a terminal dashboard. phreak.fm explicitly differs from the TerminalFeed/TensorFeed/VR.org family in visual identity.

Two color modes: Paper (warm off-white, default) and Blueprint (washed-out navy). Toggle in header.

## Stack

- Next.js 14 (App Router) with TypeScript strict mode
- Cloudflare Pages for hosting
- Cloudflare Worker (`phreak-api`) for RSS ingestion and API
- Cloudflare KV for cached RSS and submissions
- Cloudflare R2 for audio and media storage
- Tailwind CSS for styling
- MDX for editorial content

## Three Verticals

- **Signals** :: hacker stories, security long-form, breach narratives, phreaker history, exploit post-mortems
- **Frequencies** :: electronic music reviews, features, artist/label hubs, scene coverage, release calendar, Pirate Signal outsider showcase
- **Static** :: tech and nerd news, commentary, cross-vertical essays

## Hard Rules

- **ZERO em dashes anywhere.** Not in code, not in copy, not in metadata, not in comments. CI grep check enforces this. Build fails on hit.
- **ZERO double hyphens** (--) used as em dash substitutes in prose.
- **Google Workspace email only.** Aliases: hello@phreak.fm, tips@phreak.fm. Never use Cloudflare Email Routing.
- **No ad code, ever in V1.** phreak.fm is a love project, not an SEO play.
- **Archive cadence.** Articles drop when they are ready, not on a schedule. The RSS aggregator and release calendar keep the site alive between originals.

## Content Structure

- Editorial articles: `/content/[vertical]/*.mdx`
- Pirate Signal posts: `/content/frequencies/pirate-signal/*.mdx`
- Author personas: `/src/lib/authors.ts` (7 personas including The Operator)
- RSS feed config: `/src/config/feeds.ts`
- Artist data: `/src/config/artists.ts`
- Label data: `/src/config/labels.ts`
- Release calendar: `/content/releases.json`
- Worker source: `/worker/src/`

## Design Tokens

- Paper mode bg: #f4f0e8, text: #1a1a1a
- Blueprint mode bg: #1a2433, text: #c8d8e4
- Risograph accents: faded red #c83c30, ochre #d9a441, schematic cyan #4a7a8c, muted forest #4d5f3a
- Vertical tags: Signals=cyan, Frequencies=red, Static=ochre
- Display font: Instrument Serif (headlines, masthead)
- Body font: Source Serif 4 (long-form reading)
- Mono font: JetBrains Mono (metadata, timestamps, wire items)
- Handwritten font: Caveat (marginalia annotations)

## Submission System

Three tiers: web forms (Tier 1), email drop to tips@phreak.fm (Tier 2), secure submission docs (Tier 3). Cloudflare Turnstile on all forms. Rate limiting: 3/hour per IP.

## Sibling Sites

TerminalFeed, TensorFeed, VR.org, DramaRadar. Cross-linked in footer as "cross-references." phreak.fm is independent in identity.

## Dedication Page

`/dedication` honors Dirk Bajema. Footer link only, never primary nav. Deep navy background regardless of mode. Content written by Ripper, not generated.

## Podcast Plumbing

Audio player and frontmatter ready. Waiting for voice AI quality threshold OR Ripper's own voice recording. No AI narration until quality is acceptable for emotional narrative content.

## Build Notes

- Em dash check runs before every build (`npm run check:emdash`)
- Worker has its own tsconfig, excluded from Next.js build
- Search index rebuilt when articles change (`npm run build:search`)
- Worker deploys separately via `npm run worker:deploy`
- See `/docs/deploy.md` for full Cloudflare setup
- See `/docs/editorial-workflow.md` for submission handling process
