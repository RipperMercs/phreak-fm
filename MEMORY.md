# phreak.fm :: MEMORY

This is the master context file for phreak.fm. It lives at the repo root and serves as persistent memory for Claude Code, Claude sessions, and Ripper himself. Update it whenever something important changes. Read it at the start of every session before doing anything else.

**Last updated:** April 8, 2026 (post-museum-session)

---

## 1. Project Identity

**phreak.fm** is an independent editorial archive and publication covering hacker culture and history, boundary-pushing electronic music, tech/nerd news, and a permanent historical DOS Virus Museum. Four content areas, one unified voice.

**Editorial framing:** Personal Ripper project. The public face, the voice, the byline, the brand, and the aesthetic are all personal. phreak.fm is "a Ripper project" in every place a reader sees the site.

**Legal framing:** Operated by Pizza Robot Studios LLC for liability protection only. The LLC is named exclusively on `/legal/*` pages and a small footer copyright line (`© 2026 Pizza Robot Studios LLC, publishing as phreak.fm`). It does NOT appear in the masthead, About page, author bios, editorial copy, dedication page, or museum pages. Never leak the LLC into editorial content.

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
**Deployment:** Live on phreak.fm via Cloudflare Pages direct upload
**Email:** Google Workspace with aliases `contact@`, `tips@`, `alerts@`, `legal@`, `evan@`

**Visual direction (current):** Dark gray background (#151518), teal accent (#2dd4bf), monospace-forward typography, CRT scan lines, blinking cursor, DOS-window feed panels, MOTD with rotating hacker quotes, system status bar, scrolling headline ticker. NOT the v2 zine spec direction (rejected in favor of this more hacker-native aesthetic).

**What's built:**
- 137+ static pages across three verticals plus Museum
- Homepage: MOTD, system status bar, scrolling headline ticker, two-column layout (articles left, live feeds right)
- Signals vertical with 18 phreaker elder story stubs queued
- Frequencies vertical with Pirate Signal outsider music showcase
- Static vertical for tech/nerd commentary
- DOS Virus Museum at `/museum` (scaffolding complete, 25 specimen stubs with placeholder gray PNGs, awaiting real visuals and bodies)
- Three-tier submission system (web form, email drop to tips@, secure submission docs)
- Legal pages (Terms, Privacy, DMCA, Submissions Agreement, Corrections Policy)
- Live RSS feeds via rss2json proxy (security feed working, tech feed rate-limited)
- Author personas: Ripper (credited on 35-50% of content), nullbyte (Signals), synth_error (Frequencies), deadpacket (Static), the_curator (Museum)

**What's NOT built yet:**
- Cloudflare Worker for server-side RSS fetching (currently using rss2json proxy, which rate-limits)
- DMCA agent registration with US Copyright Office
- Cross-link rotation with sibling sites
- Real museum visual assets (Ripper captures starting April 9)
- Cultural payload taxonomy filter on museum index (pending small CC follow-up)

---

## 3. Workflow Rules

This is how Ripper and Claude and Claude Code work together on phreak.fm. These rules are not optional.

### 3.1 Roles

- **Ripper (Evan):** Publisher, editor-in-chief, writer of final content. Makes all editorial, creative, and strategic decisions. Captures museum visual assets.
- **Claude (conversational assistant):** Editor, researcher, drafter, project manager, spec writer. Supports Ripper with article drafts, research briefs, editorial planning, and all content-oriented work. Writes specs for CC when code changes are needed. Drafts specimen page bodies and longform articles on request.
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

phreak.fm is an archive, not a content farm. Pieces drop when they are ready, not on a schedule. The RSS aggregator, release calendar, and museum keep the site visibly alive between originals.

**Target cadence:**
- Signals longform: 1 piece every 4 to 6 weeks
- Frequencies features and reviews: 2 to 4 pieces per month when cruising
- Pirate Signal: 1 to 2 per week when inspired, zero pressure when not
- Static: opportunistic, when Ripper has something to say
- Museum specimens: 1 new complete specimen per week minimum (body + visual), faster during capture sessions

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

**Museum-adjacent Signals story ideas (cross-tagged with museum specimens via `<SpecimenReference />`):**

33. `[briefed]` The Alvi Brothers and the First PC Virus (Brain) :: priority, pairs with completed Brain specimen, outline in progress
34. `[idea]` The Bulgarian Virus Factory (Dark Avenger and the Sofia scene)
35. `[idea]` Spanska and the French Demoscene Crossover
36. `[idea]` CIH / Chernobyl and Chen Ing-hau
37. `[idea]` The Rise and Fall of 40Hex and Phalcon/Skism (VX zines)
38. `[idea]` Michelangelo Panic, 1992 (the media vs the actual threat)
39. `[idea]` The Yankee Doodle Virus and Early Musical Payloads (cross-vertical with Frequencies)
40. `[idea]` Boot Sector Art as Outsider Visual Design
41. `[idea]` Why Eastern Europe Produced So Many Viruses (1988-1994)
42. `[idea]` The Ransomware Era vs The Art Era (a lament)

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

`[drafting]` **The 2600Hz Welcome Post** :: 600 to 800 words. Opens with Joybubbles and the 2600Hz tone, pivots through Draper and Apple's origin, lands on Aphex Twin's spectrograms and the observation that 2600Hz sits near an E7 on a piano. Closes with a paragraph introducing phreak.fm and a sign-off. Doubles as launch piece AND permanent About-adjacent content. Claude has drafted opening 4 paragraphs, awaiting Ripper to finish the landing paragraphs in his voice.

### 5.6 Pirate Signal Beat (ongoing)

Target cadence: 1 to 2 per week when inspired. Zero queue needed, these are reactive finds. Any weird Bandcamp release, outsider YouTube ambient, cassette-only label compilation, or bedroom producer with 40 monthly listeners. Three paragraphs each, embed the player, ship it.

---

## 6. Known Technical Issues

### 6.1 rss2json Rate Limiting (priority: high)

The live RSS feeds are currently fetched client-side via the rss2json public proxy. Free tier is 10k/day and 100/hour. Current behavior: security feed works (hits proxy first), tech feed rate-limits on second batch of requests and goes offline.

**Fix:** Move RSS fetching into the Cloudflare Worker (`phreak-api`) that was in the original spec but skipped during deploy. Worker runs a cron every 30 minutes, fetches feeds directly from source via native Worker fetch, parses with `fast-xml-parser`, writes normalized items to KV, serves them to the site via a Worker endpoint. Client fetches from the Worker, not from an external proxy.

**Benefits:** No CORS issues, no rate limits, cached results in KV, ability to handle 30+ feeds, resilience to single-feed failures.

Spec ready to hand to CC when Ripper says go. Targeted fix, one session, 20 to 30 minutes of work.

### 6.2 DMCA Agent Registration (priority: high)

Not a code issue, but required before publishing first real article. Register at [dmca.copyright.gov](https://dmca.copyright.gov) under Pizza Robot Studios LLC with phreak.fm as alternate name. Use `legal@phreak.fm` as agent email. Cost $6 for 3 years. Required for Section 512 safe harbor protection.

### 6.3 Cross-Link Rotation (priority: low)

Add phreak.fm to sibling site footers (TerminalFeed, TensorFeed, VR.org, DramaRadar) after first 3 to 5 real articles are published. Not before.

### 6.4 Museum Cultural Taxonomy Filter (priority: low)

Addendum A3 shipped with technical payload classification (visual, audio, destructive, prank, polymorphic). Ripper requested a parallel CULTURAL taxonomy for filtering: screen art, sound pieces, hostage pranks, messages, silent spreaders, genuinely destructive. Small CC follow-up needed to add this as a second filter dimension on `/museum`. Can ship alongside the first wave of real visual assets.

---

## 7. Next Actions

**Immediate (this week):**

1. **Ripper:** Start museum visual captures tomorrow (April 9). Brain first. Use `/docs/museum-assets.md` workflow. Upload to `/public/museum/[slug]/execution.gif`.
2. **Claude:** Draft Spanska and CIH specimen bodies (two priority drafts to match the Brain template already written).
3. **Claude:** Draft Alvi Brothers Signals longform outline, cross-links to Brain specimen via `<SpecimenReference />`.
4. **Ripper:** Finish the 2600Hz Welcome Post landing paragraphs using Claude's draft opening.
5. **Ripper:** Publish one Pirate Signal post to prove the format.
6. **Ripper:** Register DMCA agent at dmca.copyright.gov under Pizza Robot Studios LLC.

**Short-term (next 2 to 4 weeks):**

7. Migrate RSS feeds to Cloudflare Worker (fix rss2json rate limiting).
8. Add museum cultural taxonomy filter (small CC follow-up).
9. Publish Brain as first complete museum specimen (body + visual + sources).
10. Publish 3 to 5 real articles across Signals, Frequencies, Static.
11. Write the dedication page for Dirk.
12. Soft launch: add phreak.fm to sibling site footer rotation.

**Medium-term (next 2 to 3 months):**

13. Build out the drafting queue at 1 Signals longform per 4 to 6 weeks.
14. Establish Pirate Signal rhythm at 1 to 2 per week.
15. Museum specimens shipping weekly with real bodies and visuals.
16. Consider AdSense application (not a V1 priority, revisit after 20+ articles and meaningful traction).

**Longer-term:**

17. Evaluate audio/podcast readiness when voice AI hits quality threshold OR when Ripper decides to record in his own voice.
18. Evaluate Ephemera section (Payphones of the World as flagship sub-feature).
19. Evaluate wire linkblog at `/wire` for shortform linkblog content.
20. Museum expands past 50 specimens and becomes a standalone reference.

---

## 8. Museum-Specific State

This section tracks the DOS Virus Museum specifically. Added post-Addendum A3.

### 8.1 Status

V1 scaffolding shipped per Addendum A3. 25 specimen stubs exist with placeholder gray PNGs. Filters, sort, search, family pages, year pages, author pages, glossary, and `/museum/about` all built. Awaiting real visual assets and real specimen bodies.

### 8.2 Launch 25 Roster

All have stub pages with complete frontmatter. Bodies are placeholder. Hero images are placeholder gray PNGs.

1. Brain (1986, Pakistan, Alvi brothers) :: **body complete, awaiting visual**
2. Cascade (1987, Germany)
3. Stoned (1987, New Zealand)
4. Jerusalem (1987, Israel)
5. Vienna (1987, Austria)
6. Ping Pong (1988, Italy)
7. Yankee Doodle (1989, Bulgaria)
8. Walker (1992)
9. Ambulance (1990)
10. Casino (1991)
11. Cookie Monster / Cookie (mid-80s)
12. Michelangelo (1991)
13. Monkey (1991, Canada)
14. Form (1990, Switzerland)
15. Tequila (1991, Switzerland)
16. Maltese Amoeba (1991, UK)
17. V-Sign (1992)
18. Spanska (1997, France) :: **body in drafting queue**
19. Hare (1996)
20. Crazy Boot (1996)
21. Kuku (1996)
22. Mummy (1991, UK)
23. Coffeeshop / Coffee
24. Techno
25. CIH / Chernobyl (1998, Taiwan, Chen Ing-hau) :: **body in drafting queue**

### 8.3 Cultural Payload Taxonomy

Parallel to the technical taxonomy, every specimen gets tagged with one or more cultural payload genres. This powers the "show me just the screen art" and "show me hostage pranks" filtering that nobody else has.

- **Screen art** :: visible animation or graphics (Walker, Ambulance, Spanska, V-Sign)
- **Sound pieces** :: musical or audio payloads (Yankee Doodle, Techno, Ping Pong)
- **Hostage pranks** :: demand something before giving control back (Casino, Cookie Monster, Coffeeshop)
- **Messages** :: text payloads, political or comedic statements (Stoned, Brain's signature)
- **Silent spreaders** :: no visible payload, just propagation (historically important but aesthetically dull)
- **Genuinely destructive** :: actually broke things (CIH, Michelangelo at trigger date)

Ripper tags each specimen as he captures visuals. Filter implementation pending small CC follow-up (see 6.4).

### 8.4 Asset Workflow

Documented in `/docs/museum-assets.md`. Key rules:

- File naming: `/public/museum/[slug]/execution.gif` (or .mp4)
- Additional stills: `still-01.png`, `still-02.png`, etc.
- GIF target: under 2MB, 5-15 second loop
- Primary source: Internet Archive Malware Museum
- Credit sources in specimen frontmatter `sources` array
- Capture tools: ScreenToGif (Win), Kap or LICEcap (Mac), OBS+ffmpeg (cross-platform)
- Special cases documented for date-triggered viruses (Michelangelo, Jerusalem, Yankee Doodle)

### 8.5 Editorial Flywheel

The museum is wired to the longform archive via `<SpecimenReference />` MDX component. Every Signals longform that mentions a cataloged virus should insert an inline specimen card. Every specimen page auto-shows its Related Articles strip. Brain specimen + Alvi Brothers longform is the first flywheel pair.

---

## 9. Change Log

Append entries here whenever this file is meaningfully updated.

- **April 8, 2026 (initial):** Initial MEMORY.md created. Codifies workflow rules, editorial direction, full drafting queue, and known technical issues.
- **April 8, 2026 (museum session):** Added DOS Virus Museum to project identity. New museum-specific state section (8). Added the_curator persona. Added 10 museum-adjacent Signals article ideas (items 33-42). Added cultural payload taxonomy. Added museum asset workflow reference. Updated Next Actions to reflect Brain specimen priority and Ripper's April 9 capture start. Marked Brain specimen body as complete, Spanska and CIH as in Claude's drafting queue.

---

*End of MEMORY.md. CC: read this file at the start of every session before doing anything else. Claude: reference this file for all phreak.fm context and keep the drafting queue up to date as pieces move through the pipeline. Ripper: update anything here whenever a substantive decision or change happens.*
