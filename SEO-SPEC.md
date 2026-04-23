# phreak.fm :: SEO Infrastructure Spec

## Intent

Ship the missing SEO infrastructure so phreak.fm indexes properly in Google Search Console, supports AdSense application, and gets maximum visibility from 129+ original articles and 40 museum specimens. All changes are CSS/config/build-tooling. No editorial content changes.

## Constraints

- Static export (`output: "export"`) means no runtime route handlers. Everything must be build-time generated or use Next.js metadata API.
- Zero em dashes anywhere. CI enforces.
- No double hyphens as em dash substitutes in prose.

---

## 1. RSS Feed (build-time generation)

**Why:** Biggest single missing SEO element. Lets Feedly/Inoreader/NetNewsWire discover the archive. Google Discover indexes RSS. Editorial sites live and die by syndication.

**Create:** `scripts/generate-rss.js`

Reads all MDX files from `content/{signals,frequencies,static}/`, sorts by publishedAt desc, takes top 50, outputs valid RSS 2.0 XML to `public/feed.xml`.

Requirements:
- XML declaration, RSS 2.0 with `xmlns:dc` and `xmlns:atom` namespaces
- Channel: title "phreak.fm", link https://phreak.fm, description, language en-us, lastBuildDate, atom:self link to /feed.xml, image element pointing to favicon
- Each item: title, link, guid (isPermaLink=true), description (from excerpt), pubDate (RFC 2822), category (Signals/Frequencies/Static), dc:creator (author display name)
- Escape all XML entities in text content
- Author mapping: ripper=Ripper, nullbyte=nullbyte, synth_error=synth_error, deadpacket=deadpacket, the_curator=the_curator

**Update:** `package.json` build script to run `node scripts/generate-rss.js` before `next build`.

**Add standalone script:** `"build:rss": "node scripts/generate-rss.js"`

---

## 2. OG Image Generation (build-time)

**Why:** Articles without heroImage produce bare link previews on Twitter/Slack/Discord. Every article needs a branded social card.

**Create:** `scripts/generate-og-images.js`

Generates 1200x630 SVG files for every article and museum specimen. Output to `public/og/{vertical}/{slug}.svg` and `public/og/museum/{slug}.svg` plus `public/og/default.svg`.

Each SVG should include:
- Dark gradient background with subtle grid pattern overlay
- Left accent bar (6px) in vertical color
- Vertical label text (SIGNALS/FREQUENCIES/STATIC) in vertical color
- Article title (monospace, bold, white, wrapped to max 4 lines)
- Author and date metadata line in muted gray
- "phreak.fm" branding at bottom left with .fm in accent color
- Decorative faded code fragments in corners (0x2600, ATDT, trunk.seize(), signal.bend(), CONNECT 2400) at very low opacity

Vertical color schemes:
- signals: bg gradient #0f1a1a to #151518, accent #2dd4bf
- frequencies: bg gradient #1a0f1a to #151518, accent #a78bfa
- static: bg gradient #1a1a0f to #151518, accent #fbbf24

Museum specimens use signals color scheme.

**Update:** `package.json` build script to run `node scripts/generate-og-images.js` before `next build`.

**Add standalone script:** `"build:og": "node scripts/generate-og-images.js"`

---

## 3. Enhanced Metadata in layout.tsx

**Update** the `metadata` export in `src/app/layout.tsx`:

- Title default: `"phreak.fm | Hacker Culture, Electronic Music, and Tech News"`
- Description: expand to include "Original long-form stories about phreakers, hackers, security breaches, electronic music producers, and the people who bend technology."
- Add `keywords` array: "hacker culture", "phreaking", "electronic music", "cybersecurity", "hacker history", "2600", "DOS viruses", "malware history", "IDM", "ambient music", "security narratives", "tech news", "exploit analysis", "breach narratives", "Warp Records", "demoscene", "BBS history"
- Update OG title to match new default title
- Add `alternates.canonical`: "https://phreak.fm"
- Add `alternates.types`: `{ "application/rss+xml": "https://phreak.fm/feed.xml" }` (this adds the RSS autodiscovery link tag)
- Add `other: { "google-adsense-account": "ca-pub-XXXXXXXXXXXXXXXX" }` (placeholder, Evan will provide real ID after AdSense approval)

---

## 4. Enhanced robots.txt

**Update** `src/app/robots.ts` to block AI training crawlers while keeping search engines allowed:

Keep existing rule (allow /, disallow /api/).

Add additional disallow for `/_next/` and `/search` under the wildcard rule.

Add separate deny rules for AI scrapers:
- GPTBot: disallow /
- CCBot: disallow /
- ChatGPT-User: disallow /
- anthropic-ai: disallow /
- Claude-Web: disallow /
- Google-Extended: disallow /

Keep sitemap reference.

---

## 5. ads.txt

**Create:** `public/ads.txt`

Content:
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Comment at top explaining Evan needs to replace the placeholder pub ID after AdSense approval.

---

## 6. Structured Data Enhancements in src/lib/seo.ts

### 6.1 buildArticleJsonLd changes

Currently returns a single object. Change to return an array of two objects:

**First object (Article):** Keep existing fields. Add:
- `wordCount`: `frontmatter.readingTimeMinutes * 250`
- `articleSection`: vertical name (Signals/Frequencies/Static)
- `keywords`: `frontmatter.tags`
- `isAccessibleForFree`: true
- Author should include `url` field: `https://phreak.fm/author/{slug}`
- Publisher should use shared Organization builder (see 6.3)

**Second object (BreadcrumbList):** Schema.org BreadcrumbList with three items:
1. Home (https://phreak.fm)
2. Vertical name (https://phreak.fm/{vertical})
3. Article title (https://phreak.fm/{vertical}/{slug})

### 6.2 buildSiteJsonLd changes

Currently returns a single object. Change to return an array of three objects:

**First (WebSite):** Keep existing fields. Add `potentialAction` with SearchAction schema:
- target EntryPoint urlTemplate: `https://phreak.fm/search?q={search_term_string}`
- query-input: `required name=search_term_string`
- Publisher should use shared Organization builder

**Second (Organization):** See 6.3.

**Third (SiteNavigationElement):** Schema with name array [Signals, Static, Music, Museum, Wire, Search] and corresponding URL array.

### 6.3 New: buildOrganizationJsonLd

Shared Organization schema used by Article and WebSite:
- @type: Organization
- @id: https://phreak.fm/#organization
- name: phreak.fm
- url: https://phreak.fm
- description: site description
- foundingDate: "2026"
- founder: { @type: Person, name: Ripper, url: https://ripper.tools }

### 6.4 New: buildBreadcrumbJsonLd

Generic breadcrumb builder. Takes array of `{ name, url }`, returns BreadcrumbList schema with ListItem positions.

### 6.5 New: buildVerticalJsonLd

For vertical landing pages. Returns array of CollectionPage schema + BreadcrumbList (Home > Vertical).

### 6.6 New: buildMuseumSpecimenJsonLd

For museum specimen pages. Takes specimen data, returns Article schema + BreadcrumbList (Home > Museum > Specimen Name).

### 6.7 buildArticleMetadata changes

Update OG image fallback: when no heroImage in frontmatter, use `https://phreak.fm/og/{vertical}/{slug}.svg` instead of undefined. Set width: 1200, height: 630. Add `keywords: frontmatter.tags` to metadata return.

---

## 7. Update JSON-LD Consumers

Since `buildArticleJsonLd` and `buildSiteJsonLd` now return arrays instead of single objects, update all pages that consume them:

**Files to update:**
- `src/app/page.tsx`: Change `const jsonLd = buildSiteJsonLd()` to `const jsonLdSchemas = buildSiteJsonLd()`, then map over array to render multiple `<script type="application/ld+json">` tags
- `src/app/signals/[slug]/page.tsx`: Same pattern for `buildArticleJsonLd`
- `src/app/frequencies/[slug]/page.tsx`: Same pattern
- `src/app/static/[slug]/page.tsx`: Same pattern

Pattern:
```tsx
{jsonLdSchemas.map((schema, i) => (
  <script
    key={i}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
))}
```

---

## 8. Wire New JSON-LD Into Existing Pages

These pages exist but don't have JSON-LD yet. Wire them up:

- `src/app/signals/page.tsx`: Add `buildVerticalJsonLd("signals")`
- `src/app/frequencies/page.tsx`: Add `buildVerticalJsonLd("frequencies")`
- `src/app/static/page.tsx`: Add `buildVerticalJsonLd("static")`
- Museum specimen pages: Add `buildMuseumSpecimenJsonLd()` with specimen data

---

## 9. Post-Implementation: Manual Steps (Evan only)

These are NOT for CC. Documenting here for completeness.

1. **Google Search Console:** Verify ownership, submit https://phreak.fm/sitemap.xml
2. **Bing Webmaster Tools:** Separate verification and sitemap submission
3. **AdSense:** Apply when ready, replace placeholder pub ID in layout.tsx and public/ads.txt
4. **Content distribution:** Submit best longform pieces to HN, Lobsters, relevant subreddits
5. **Google Search Console URL Inspection:** After deploy, use "Request Indexing" on key pages to accelerate crawl

---

## 10. File Corruption Note

Three component files have been corrupted (truncated or null bytes at EOF) from a previous session. CC should verify and restore from git HEAD if needed:

- `src/components/Nav.tsx` (null bytes at line 80)
- `src/components/Footer.tsx` (truncated, missing closing tags)
- `src/components/SystemBar.tsx` (truncated, missing closing tags)

Fix: `git checkout HEAD -- src/components/Nav.tsx src/components/Footer.tsx src/components/SystemBar.tsx`

---

*End of spec.*
