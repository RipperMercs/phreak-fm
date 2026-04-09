# phreak.fm :: MEMORY

This is the master context file for phreak.fm. It lives at the repo root and serves as persistent memory for Claude Code, Claude sessions, and Ripper himself. Update it whenever something important changes. Read it at the start of every session before doing anything else.

**Last updated:** April 9, 2026

---

## 1. Project Identity

**phreak.fm** is an independent editorial archive and publication covering hacker culture and history, boundary-pushing electronic music, and tech/nerd news. Three verticals, one unified voice.

**Editorial framing:** Personal Ripper project. The public face, the voice, the byline, the brand, and the aesthetic are all personal. phreak.fm is "a Ripper project" in every place a reader sees the site.

**Legal framing:** Operated by Pizza Robot Studios LLC for liability protection only. The LLC is named exclusively on `/legal/*` pages and a small footer copyright line (`© 2026 Pizza Robot Studios LLC, publishing as phreak.fm`). It does NOT appear in the masthead, About page, author bios, editorial copy, or dedication page. Never leak the LLC into editorial content.

**Dedication:** Silent memorial to Dirk Bajema at `/dedication`, footer link only, content written by Ripper.

**Editorial frame / tagline:** "signals, frequencies, and the people who bend them"

**Sibling sites** (cross-linked, not affiliated editorially):
- TerminalFeed (terminalfeed.io)
- TensorFeed (tensorfeed.ai)
- VR.org
- DramaRadar (dramaradar.com)

---

## 2. Current State

**Domain:** phreak.fm, registered through Cloudflare Registrar
**Repo:** github.com/RipperMercs/phreak-fm
**Stack:** Next.js 14 (App Router) + Cloudflare Pages + Cloudflare Worker + KV + R2
**Deployment:** Live on phreak.fm via Cloudflare Pages, auto-deployed by GitHub Actions on push to main (`.github/workflows/deploy.yml`). Scheduled rebuild every 6 hours to keep feed cache fresh.
**Email:** Google Workspace with aliases `contact@`, `tips@`, `alerts@`, `legal@`, `evan@`

**Visual direction (current):** Dark gray background (#151518), teal accent (#2dd4bf), monospace-forward typography, CRT scan lines, blinking cursor, DOS-window feed panels, MOTD with rotating hacker quotes, system status bar, scrolling headline ticker. NOT the v2 zine spec direction (that was rejected in favor of this more hacker-native aesthetic).

**What's built:**
- 137+ static pages across three verticals
- Homepage: MOTD, system status bar, scrolling headline ticker, two-column layout (articles left, live feeds right)
- Signals vertical with 18 phreaker elder story stubs queued
- Frequencies vertical with Pirate Signal outsider music showcase
- Static vertical for tech/nerd commentary
- Three-tier submission system (web form, email drop to tips@, secure submission docs)
- Legal pages (Terms, Privacy, DMCA, Submissions Agreement, Corrections Policy)
- Live RSS feeds via build-time server-side fetching (cached as static JSON, refreshed every 6h via GitHub Actions cron)
- Author personas: Ripper (credited on 35-50% of content), nullbyte (Signals), synth_error (Frequencies), deadpacket (Static)

**What's NOT built yet:**
- DMCA agent registration with US Copyright Office
- Cross-link rotation with sibling sites
- Any original long-form article content (only stubs exist)

---

## 3. Workflow Rules

This is how Ripper and Claude and Claude Code work together on phreak.fm. These rules are not optional.

### 3.1 Roles

- **Ripper (Evan):** Publisher, editor-in-chief, writer of final content. Makes all editorial, creative, and strategic decisions.
- **Claude (me, conversational assistant):** Editor, researcher, drafter, project manager, spec writer. Supports Ripper with article drafts, research briefs, editorial planning, and all content-oriented work. Writes specs for CC when code changes are needed.
- **Claude Code (CC):** Sole builder. Executes specs, writes all code, manages the repo, deploys. Does not make product decisions.

### 3.2 Communication Format

**Every substantive message from Claude to Ripper is also written for Claude Code.** Anything important, actionable, or persistent must be structured as copy-pasteable markdown. CC should be able to consume any given Claude response as context or as a spec without Ripper having to reformat it.

- Conversational replies can stay conversational (greetings, quick questions, small acknowledgments)
- Anything substantive (plans, drafts, specs, decisions, research, article content) must be markdown-structured and paste-ready
- Full specs are delivered as single downloadable files via the file system, not split across multiple code blocks
- Mid-conversation CC instructions go in a single code block for one-click copy

### 3.3 Spec Delivery

- Single file, one copy, one paste
- No em dashes anywhere, ever (hard rule, CI enforces)
- No split instructions across paragraphs
- Always include the spec's intent at the top
- Always include CC post-implementation notes when relevant

### 3.4 This File (MEMORY.md)

- Lives at repo root
- Updated whenever a substantive change happens (new article published, new decision locked, new technical direction, etc.)
- Read at the start of every CC session via CLAUDE.md reference
- Referenced by future Claude sessions for context continuity
- Editorial drafting queue (section 5) is the single source of truth for what pieces are in flight

---

## 4. Editorial Direction

### 4.1 Archive Philosophy

phreak.fm is an archive, not a content farm. Pieces drop when they are ready, not on a schedule. The RSS aggregator and release calendar keep the site visibly alive between originals.

**Target cadence:**
- Signals longform: 1 piece every 4 to 6 weeks
- Frequencies features and reviews: 2 to 4 pieces per month when cruising
- Pirate Signal: 1 to 2 per week when inspired, zero pressure when not
- Static: opportunistic, when Ripper has something to say

### 4.2 The Unifying Thesis

Hackers and electronic musicians are the same kind of person wearing different equipment. Both manipulate signals outside sanctioned channels. Both operate from obsession. Both work in scenes that reward craft and punish pretension. Every piece on phreak.fm should implicitly or explicitly reinforce this connection.

The homepage and main browse pages deliberately INTERLEAVE content from all three verticals rather than siloing them. A reader scrolling phreak.fm sees Joybubbles next to Kali Malone next to a Verge culture piece, which makes the breadth of the site obvious in 10 seconds. The mix IS the message.

Vertical landing pages and article pages filter by context. Default everywhere else is mixed.

### 4.3 Voice and Tone

- Serious but never dry
- Generous, never sneering
- First-person when personal, third-person when historical
- Heavy on primary sources, light on attitude
- Credits where due, protects sources where asked
- Never publishes anything that can't be anchored to at least one verifiable public source
- No em dashes ever

### 4.4 Editorial Standards

- Every claim of fact anchored to a verifiable public source when possible
- Quoted material accurate and in context
- People named in stories treated fairly and without gratuitous harm
- Corrections handled promptly and transparently per `/legal/corrections`
- Sources protected as promised
- Opinion and analysis labeled as such

---

## 5. Editorial Drafting Queue

This is the live pipeline of pieces in consideration, in progress, or recently shipped. Update status as pieces move through the funnel.

**Status key:** `[idea]` `[briefed]` `[drafting]` `[editing]` `[published]`

### 5.1 Signals (hacker culture and history)

**The existing 18 phreaker elder stubs queued by CC:**

1. `[idea]` John Draper / Captain Crunch and the 2600Hz whistle
2. `[idea]` Joe Engressia / Joybubbles and absolute pitch phreaking
3. `[idea]` Wozniak, Jobs, and the blue box origin of Apple
4. `[idea]` Susan Thunder and the early 80s social engineering scene
5. `[idea]` Bernie S and the red box cassette case
6. `[idea]` Kevin Mitnick as social engineer, not technical prodigy
7. `[idea]` Kevin Poulsen / Dark Dante and the Porsche contest
8. `[idea]` Clifford Stoll and The Cuckoo's Egg
9. `[idea]` Karl Koch / Hagbard Celine
10. `[idea]` Jonathan James / c0mrade
11. `[idea]` MOD vs LOD hacker war
12. `[idea]` The L0pht testimony to Congress, 1998
13. `[idea]` Cult of the Dead Cow and Back Orifice
14. `[idea]` Delia Derbyshire and the BBC Radiophonic Workshop (cross-vertical)
15. `[idea]` Daphne Oram and Oramics (cross-vertical)
16. `[idea]` The Roland TB-303 misuse origin of acid house (cross-vertical)
17. `[idea]` Kraftwerk's Computer World as prophecy
18. `[idea]` Aphex Twin's spectrogram hacks (cross-vertical)

**Additional Signals story ideas:**

19. `[idea]` The Morris Worm, 1988
20. `[idea]` The 414s Milwaukee teenage hackers
21. `[idea]` Operation Sundevil and the Steve Jackson Games raid
22. `[idea]` The Hacker Manifesto and Loyd Blankenship
23. `[idea]` Emmanuel Goldstein and the founding of 2600 Magazine
24. `[idea]` Chaos Computer Club and the Haustür postal bank TV hack
25. `[idea]` The Hanover Hacker (Markus Hess, from his perspective)
26. `[idea]` The Legion of Doom BBS era
27. `[idea]` The Crypto Wars of the 90s and Phil Zimmermann / PGP
28. `[idea]` The Mitnick takedown, reconsidered
29. `[idea]` DEF CON origins and Jeff Moss
30. `[idea]` The Farewell Dossier (1982 alleged CIA pipeline sabotage)
31. `[idea]` Fravia and the reverse engineering scene
32. `[idea]` Wau Holland and the German hacker elders

### 5.2 Frequencies (electronic music)

1. `[idea]` Rykard and Hunya Munya label portrait (most personal, Ripper-only piece)
2. `[idea]` The Roland TB-303, from failure to acid house (cross-posted with Signals 16)
3. `[idea]` Delia Derbyshire and the BBC Radiophonic Workshop (cross-posted with Signals 14)
4. `[idea]` Daphne Oram and Oramics (cross-posted with Signals 15)
5. `[idea]` The Warp Records Artificial Intelligence series, 1992 to 1994
6. `[idea]` Music Has the Right to Children at anniversary
7. `[idea]` Selected Ambient Works Volume II retrospective
8. `[idea]` Basic Channel and the Berlin minimalism lineage
9. `[idea]` Boomkat as the last great music newsletter
10. `[idea]` The cassette revival (Constellation Tatsu, Sacred Phrases, Orange Milk, Crash Symbols)
11. `[idea]` The DAW wars (Ableton vs Cubase vs FL vs Logic, Ripper as Cubase lifer)
12. `[idea]` Bedrock Records and the progressive house lineage (personal to Ripper / Dirk era)
13. `[idea]` Oneohtrix Point Never and the vaporwave problem
14. `[idea]` Sarah Davachi, Caterina Barbieri, Kali Malone and the return of the pipe organ

### 5.3 Static (tech and nerd culture)

1. `[idea]` Why everyone is posting to nowhere in 2026 (fractured social web)
2. `[idea]` RSS is back and nobody told the mainstream tech press
3. `[idea]` The one-person publication renaissance
4. `[idea]` llms.txt and the AI scraping question
5. `[idea]` Cloudflare as infrastructure monoculture (self-interrogating)
6. `[idea]` The death of flat image hosting (ImageShack, Photobucket, etc.)
7. `[idea]` The Wayback Machine as the last public library

### 5.4 Cross-Vertical (pieces only phreak.fm can publish)

1. `[idea]` The 2600Hz Note :: the flagship thesis piece, hackers and ambient at the same frequency
2. `[idea]` The 1984 CCC postal bank TV hack (cross-posted with Signals 24)
3. `[idea]` Every major hacker from 1970 to 2000 also loved electronic music (pattern essay)
4. `[idea]` The Amiga demoscene as the first music video
5. `[idea]` The cracked software intro screen as outsider graphic design (Razor 1911, Fairlight, Skid Row)
6. `[idea]` Phreaking was the first DJ culture (argumentative essay)

### 5.5 Launch Piece (priority)

`[idea]` **The 2600Hz Welcome Post** :: 600 to 800 words. Opens with Joybubbles and the 2600Hz tone, pivots through Draper and Apple's origin, lands on Aphex Twin's spectrograms and the observation that 2600Hz sits near an E7 on a piano. Closes with a paragraph introducing phreak.fm and a sign-off. Doubles as launch piece AND permanent About-adjacent content. This is piece number one. Draft opening paragraphs already written by Claude, awaiting Ripper to finish the landing paragraphs in his voice.

### 5.6 Pirate Signal Beat (ongoing)

Target cadence: 1 to 2 per week when inspired. Zero queue needed, these are reactive finds. Any weird Bandcamp release, outsider YouTube ambient, cassette-only label compilation, or bedroom producer with 40 monthly listeners. Three paragraphs each, embed the player, ship it.

---

## 6. Known Technical Issues

### 6.1 RSS Feeds (RESOLVED April 9, 2026)

Replaced client-side CORS proxy fetching (rss2json, corsproxy.io, allorigins.win) with build-time server-side fetching. `scripts/fetch-feeds.js` runs during build, fetches all feeds via Node.js (no CORS issues, no rate limits), caches results as `public/feed-cache.json`. The `LiveFeed` component reads from this static file. GitHub Actions rebuilds every 6 hours to keep content fresh. The unused `@cloudflare/next-on-pages` package was also removed (was causing CI peer dep conflicts).

### 6.2 DMCA Agent Registration (priority: high)

Not a code issue, but required before publishing first real article. Register at [dmca.copyright.gov](https://dmca.copyright.gov) under Pizza Robot Studios LLC with phreak.fm as alternate name. Use `legal@phreak.fm` as agent email. Cost $6 for 3 years. Required for Section 512 safe harbor protection.

### 6.3 Cross-Link Rotation (priority: low)

Add phreak.fm to sibling site footers (TerminalFeed, TensorFeed, VR.org, DramaRadar) after first 3 to 5 real articles are published. Not before.

---

## 7. Next Actions

**Immediate (this week):**

1. Draft the 2600Hz Welcome Post (opening already written, landing paragraphs pending)
2. Publish one Pirate Signal post to prove the format
3. Pick next Signals longform (recommended: Captain Crunch full profile)
4. Register DMCA agent

**Short-term (next 2 to 4 weeks):**

5. ~~Migrate RSS feeds to Cloudflare Worker~~ (DONE: build-time fetching, April 9 2026)
6. Publish 3 to 5 real pieces across all three verticals
7. Write the dedication page for Dirk
8. Soft launch: add phreak.fm to sibling site footer rotation

**Medium-term (next 2 to 3 months):**

9. Build out the drafting queue at 1 Signals longform per 4 to 6 weeks
10. Establish Pirate Signal rhythm at 1 to 2 per week
11. Consider AdSense application (not a V1 priority, revisit after 20+ articles and meaningful traction)

**Longer-term:**

12. Evaluate audio/podcast readiness when voice AI hits quality threshold OR when Ripper decides to record in his own voice
13. Evaluate Ephemera section (Payphones of the World as flagship sub-feature)
14. Evaluate wire linkblog at `/wire` for shortform linkblog content

---

## 8. Change Log

Append entries here whenever this file is meaningfully updated.

- **April 8, 2026:** Initial MEMORY.md created. Codifies workflow rules, editorial direction, full drafting queue, and known technical issues. Replaces scattered context across earlier specs and chat history.
- **April 9, 2026:** RSS feeds fixed: replaced flaky CORS proxy client-side fetching with build-time server-side caching. GitHub Actions auto-deploy pipeline added (push to main = live site). Removed unused `@cloudflare/next-on-pages`. Removed hardcoded deploy instructions from /news page. Removed legal email from footer (already on /legal/* pages).

---

*End of MEMORY.md. CC: read this file at the start of every session before doing anything else. Claude: reference this file for all phreak.fm context and keep the drafting queue up to date as pieces move through the pipeline. Ripper: update anything here whenever a substantive decision or change happens.*
