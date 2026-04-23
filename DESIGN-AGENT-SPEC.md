# phreak.fm :: Design Agent Spec

## Intent

This spec briefs a Claude design agent on the full context needed to deliver a frontend facelift for phreak.fm's homepage (hero/main page). The goal is to make the site more visually alive, more true to its intended aesthetic identity, and more distinct from its sibling sites. The agent should work primarily through CSS custom properties, Tailwind config, and component-level styling. No backend changes. No content changes. No new routes.

---

## 1. Project Identity

**phreak.fm** is a personal editorial archive by Ripper (RipperMercs). It covers hacker culture and history, boundary-pushing electronic music, and outsider nerd culture. Three verticals, one voice: "signals, frequencies, and the people who bend them."

This is NOT a corporate site. It is a love project, a personal passion archive. It should feel like something one obsessive person built in their home studio at 3am, not something a design agency shipped.

**Tagline:** "signals, frequencies, and the people who bend them"

**Three verticals:**
- **Signals** :: hacker stories, security long-form, phreaker history, exploit post-mortems
- **Frequencies** :: electronic music reviews, artist features, label profiles, the Pirate Signal outsider showcase
- **Static** :: tech and nerd news, commentary, cross-vertical essays

**Content scale:** 129+ original MDX articles, 40 DOS Virus Museum specimens, 52 artist profiles, 18 label profiles, live RSS feed panels pulling from 38 sources.

**Sibling sites (for differentiation):** TerminalFeed, TensorFeed, VR.org, DramaRadar. These are dashboard-style, grid-forward, cool-toned tech sites. phreak.fm must look and feel DIFFERENT from them.

---

## 2. Target Aesthetic

This is the single most important section. Read it twice.

**The aesthetic north star:** "Xerox zine meets Warp Records liner notes meets 2600 Magazine schematic cover."

What that means in practice:
- **Warm** where the sibling sites are cool
- **Analog** where they are digital
- **Editorial** where they are dashboard
- **Asymmetric** where they are grid
- A site that feels like **a physical object that got scanned and uploaded**

Think: photocopied zine pages with slightly misregistered ink. Warp Records' early sleeve art (Artificial Intelligence, Music Has the Right to Children era). The hand-drawn schematics on 2600 Magazine covers. Risograph printing with its slightly off-register color layers. A BBS printout taped to a dorm room wall.

**NOT a terminal dashboard.** The current dark-bg + monospace + CRT-scanlines look is functional but reads too much like TerminalFeed/TensorFeed. The facelift should move toward the zine aesthetic while keeping the hacker DNA.

---

## 3. Color System

### 3.1 Current State (what exists now)

Single dark mode, hardcoded in `globals.css`:

```css
:root {
  --bg: #151518;
  --bg-surface: #1c1c20;
  --bg-surface-hover: #232328;
  --text: #d4d4d8;
  --text-bright: #fafafa;
  --text-muted: #71717a;
  --border: #27272a;
  --border-light: #2e2e33;
  --accent: #2dd4bf;
  --accent-dim: #1a9e8f;
  --accent-glow: rgba(45, 212, 191, 0.08);
  --color-signals: #2dd4bf;
  --color-frequencies: #a78bfa;
  --color-static: #fbbf24;
}
```

### 3.2 Intended Color Modes (from CLAUDE.md)

Two modes are planned. The toggle should live in the header/nav.

**Paper mode (default):**
- Background: warm off-white `#f4f0e8` (like aged newsprint or recycled zine paper)
- Text: near-black `#1a1a1a`
- Should feel warm, tactile, like holding a printed zine

**Blueprint mode (toggle):**
- Background: washed-out navy `#1a2433` (like an architect's blueprint or a night-shift terminal)
- Text: cool gray-blue `#c8d8e4`
- Should feel nocturnal, technical, like reading microfilm at 2am

### 3.3 Risograph Accent Palette

These are the editorial accent colors. They should feel like Risograph ink: slightly faded, slightly warm, imperfectly saturated. Not neon. Not flat design. Ink on paper.

```
Faded red:      #c83c30   (Signals headlines, danger, exploits)
Ochre/amber:    #d9a441   (Static vertical, warnings, highlights)
Schematic cyan: #4a7a8c   (Technical diagrams, links, metadata)
Muted forest:   #4d5f3a   (Success states, secondary accents)
```

### 3.4 Vertical Tag Colors

Each vertical has a signature color used in tags, labels, and section markers:
- **Signals:** cyan-teal (currently `#2dd4bf`, could shift toward schematic cyan `#4a7a8c`)
- **Frequencies:** purple/violet (currently `#a78bfa`, could shift toward a warmer, more analog purple)
- **Static:** ochre/amber (currently `#fbbf24`, should shift toward `#d9a441` for that Risograph warmth)

---

## 4. Typography

### 4.1 Current State

Two fonts loaded via `next/font/google` in `layout.tsx`:

```tsx
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-body" });
```

Body uses monospace everywhere. Articles switch to serif via `.prose` class.

### 4.2 Intended Typography System

Four fonts, each with a clear role:

| Font | CSS Variable | Role | Where |
|------|-------------|------|-------|
| **Instrument Serif** | `--font-display` | Headlines, masthead, section titles | h1, h2, featured article titles, hero text |
| **Source Serif 4** | `--font-body` | Long-form body text | Article prose, excerpts, descriptions |
| **JetBrains Mono** | `--font-mono` | Metadata, timestamps, system UI | Nav, footer, dates, tags, wire items, SystemBar |
| **Caveat** | `--font-hand` | Marginalia, annotations, asides | Pull quotes, editorial notes, handwritten-feel accents |

**Key change:** Instrument Serif and Caveat are NOT currently loaded. They need to be added to `layout.tsx` via `next/font/google`. Instrument Serif should be the dominant display font, giving headlines an editorial/magazine feel rather than the current monospace terminal feel.

---

## 5. Current Component Architecture

All components live in `/src/components/`. Here is what exists on the homepage and what each does:

### 5.1 SignalRain (`SignalRain.tsx`)

**STATUS: KEEP AS-IS. User loves this component.**

Canvas-based animated background. Fixed position, z-index 0, pointer-events none. Renders floating code fragments (phreaking/hacker themed text like "0x2600", "ATDT", "CONNECT 2400", "trunk.seize()") with three behavior types:
- **Drifters (40%):** Gentle upward float, opacity 0.06-0.14, smooth sine fade
- **Blinkers (35%):** Stationary, star-like flash in/shimmer/fade, opacity 0.12-0.30
- **Pulsers (25%):** Stationary, slow breathing sine wave, opacity 0.08-0.18

All fragments rendered in teal `rgba(45, 212, 191, opacity)`. Density: 1 per 35,000px. Throttled to ~20fps. Respects prefers-reduced-motion.

**Design agent note:** This component's color is currently hardcoded to teal. If the color scheme changes, the SignalRain color should adapt to the active mode. In Paper mode, fragments could render in a muted warm tone (like faded pencil marks or light gray ink). In Blueprint mode, they could stay teal/cyan. The fragments should always be subtle, never competing with content.

### 5.2 Nav (`Nav.tsx`)

Sticky top nav. Monospace text, 12px height. Mobile hamburger toggle with `[=]` / `[x]` text buttons. Links: signals, static, music, museum, wire, /search.

**Design opportunity:** Add the Paper/Blueprint mode toggle here. The nav could feel more editorial (think magazine masthead bar) rather than terminal status bar.

### 5.3 Ticker (`Ticker.tsx`)

Horizontal scrolling headline ticker below the nav. CSS animation, 90s linear loop. Shows article titles with vertical color-coded tags `[SIG]`, `[MUS]`, `[STA]`.

**Design opportunity:** This is one of the strongest "alive" elements on the page. Could be enhanced with better typography (Instrument Serif for titles?), slightly more visual weight, maybe a subtle paper-tape or ticker-tape texture.

### 5.4 SystemBar (`SystemBar.tsx`)

Status line showing date, article count, feed source count, and "STATUS: ONLINE". Pure monospace metadata display.

**Design opportunity:** This could become more of a "colophon" strip. Think of the printer's marks at the bottom of a zine page: issue number, date, print run info. Less "system status" and more "editorial metadata."

### 5.5 LiveFeed (`LiveFeed.tsx`)

Three RSS feed panels on the right column, styled as DOS windows with title bars (`C:\FEEDS\SECURITY.EXE`), minimize/close decorations, and feed items with time-ago timestamps. Tries Cloudflare Worker API first, falls back to static JSON cache.

**Design opportunity:** The DOS window frame is fun but ties the design to the terminal aesthetic. These could become "torn-out clippings" or "wire service printouts" or "bulletin board pinned notes" to match the zine aesthetic. Keep the live-updating behavior but rethink the chrome.

### 5.6 MOTD Banner (inline in `page.tsx`)

Message of the day: rotating hacker quotes in a bordered box. Shows quote text and attribution.

**Design opportunity:** Could be styled as a "cut-and-paste ransom note" element, or a xeroxed quote pinned to a corkboard, or a marginalia annotation. The Caveat handwriting font could shine here.

### 5.7 Hero / Masthead (inline in `page.tsx`)

Currently just:
```html
<h1>phreak<span class="text-accent">.fm</span></h1>
<p>Hacker stories. Security narratives. Phreaker history.
   Electronic music for the people who listen at 3am.</p>
```

**Design opportunity:** This is the single biggest opportunity. The masthead should be the emotional anchor of the entire site. Think bold Instrument Serif type, maybe with a subtle texture or grain overlay. The subtitle could use Caveat for a handwritten annotation feel. Consider asymmetric layout, off-grid positioning, or a collage-like composition that says "zine" not "SaaS landing page."

### 5.8 Article Listing (inline in `page.tsx`)

Terminal-style listing: numbered rows, vertical tag abbreviation, date, title. Like `ls -la` output. Clickable rows with hover highlight.

**Design opportunity:** Could shift from terminal listing to editorial table of contents. Think magazine TOC page: larger featured titles, smaller metadata, maybe alternating visual weight. The vertical color coding should remain but could be expressed as colored sidebar markers or Risograph-style color tabs rather than inline text tags.

### 5.9 Footer (`Footer.tsx`)

Three-column footer: wordmark + tagline, nav links (verticals + about/submit/dedication), sister site links. Bottom bar with copyright and legal links.

### 5.10 SourceOde (`SourceOde.tsx`)

Hidden HTML comment easter egg in the page source. Not visible. Do not modify.

---

## 6. Current CSS Architecture

### 6.1 globals.css

All custom properties defined in `:root` (no mode switching yet). Key features:
- CRT scan line overlay via `body::after` with repeating-linear-gradient (2px transparent, 2px rgba(0,0,0,0.03))
- Blinking cursor animation (`.cursor-blink::after`)
- Loading pulse animation for skeleton states
- Custom scrollbar styling (5px wide, dark track)
- Selection color: accent bg, dark text
- `.prose` class overrides for article body text (serif font, 1.05rem, 1.8 line-height)
- `.wire-rule` and `.dead-wax` utility classes

### 6.2 Tailwind Config (`tailwind.config.ts`)

Custom theme extensions:
- Colors mapped to CSS custom properties
- Font families: mono, body, display (display references `--font-display` but Instrument Serif isn't loaded yet)
- Max-width tokens: article (42rem), content (68rem), wire (48rem)
- Single keyframe animation: fade-in

### 6.3 What Needs to Change

1. **Add mode switching:** CSS custom properties should be defined under `:root` (Paper default) and `[data-theme="blueprint"]` (Blueprint mode). A React context or simple `data-theme` attribute toggle on `<html>` would work.

2. **Update the scan line effect:** In Paper mode, scan lines don't make sense. Replace with a subtle paper grain/texture. In Blueprint mode, keep a subtle scan line or grid pattern.

3. **Add texture layers:** The zine aesthetic benefits from subtle texture. Consider:
   - Paper grain noise overlay (very subtle, like actual paper fiber)
   - Slight "print misregistration" on accent colors (CSS drop-shadow with slight offset in a contrasting color)
   - Halftone dot pattern for image treatments or section backgrounds

4. **Update the accent system:** Move from single teal accent to the Risograph palette. Different verticals and UI elements should use different accents rather than everything being teal.

---

## 7. Technical Constraints

- **Next.js 14 App Router** with TypeScript strict mode
- **Cloudflare Pages** hosting (static export, no server-side rendering at runtime)
- **No em dashes anywhere.** Not in code, not in comments, not in CSS content strings. CI grep check enforces this. Use "---" or rewrite the sentence.
- **No double hyphens** (--) used as em dash substitutes in prose (CSS custom properties with -- prefix are fine)
- Fonts must be loaded via `next/font/google` for performance
- All styling through Tailwind + CSS custom properties
- Components are React (mix of server and client components)
- SignalRain is a client component using canvas. Its color values are currently hardcoded in the render loop, not pulled from CSS properties. If the design changes colors, the SignalRain component needs to read the active theme colors (could use getComputedStyle on mount or accept color props)

---

## 8. Files to Modify

Primary files the design agent will work with:

| File | What to change |
|------|---------------|
| `src/app/globals.css` | Color modes, textures, typography base styles, scan line replacement |
| `tailwind.config.ts` | Updated color tokens, new font entries, any new utility classes |
| `src/app/layout.tsx` | Load Instrument Serif and Caveat fonts, add theme provider/context |
| `src/app/page.tsx` | Hero section redesign, article listing restyle, MOTD restyle |
| `src/components/Nav.tsx` | Add theme toggle, editorial masthead feel |
| `src/components/Ticker.tsx` | Typography upgrade, visual weight |
| `src/components/SystemBar.tsx` | Shift from "system status" to "colophon" |
| `src/components/LiveFeed.tsx` | Rethink DOS window chrome, zine-ify |
| `src/components/SignalRain.tsx` | Adapt fragment color to active theme |
| `src/components/Footer.tsx` | Align with new color/typography system |

Files to NOT modify:
- `src/components/SourceOde.tsx` (hidden easter egg, leave alone)
- Any files in `/content/` (editorial content, do not touch)
- Any files in `/worker/` (backend, do not touch)
- `CLAUDE.md`, `MEMORY.md` (project docs, do not touch)

---

## 9. Specific Requests from Ripper

1. **Make the homepage feel alive.** The SignalRain was a great start. The ticker helps. But the overall page still feels static. More subtle motion, more visual texture, more sense that this is a living, breathing publication.

2. **Paper mode as default.** The site should greet visitors in warm, zine-like Paper mode. Blueprint mode is the night-shift alternative. Both should feel intentional and complete.

3. **The hero/masthead is the emotional anchor.** When someone lands on phreak.fm, the first 2 seconds should communicate: "this is an independent publication about hacker culture and electronic music, made by someone who cares." Instrument Serif headlines. Maybe a subtle grain. Maybe asymmetric layout.

4. **Preserve the hacker DNA.** The zine pivot should NOT remove the hacker identity. Keep the code fragments (SignalRain), keep the vertical color coding, keep the wire-service feed panels (just restyle them). The site should still feel like it was made by someone who knows what 2600Hz means.

5. **Two color modes, one identity.** Paper and Blueprint should feel like the same publication printed on different stock, not like two different websites.

6. **No ad code, no tracking, no analytics scripts.** This is a love project.

---

## 10. Ripper's Background (for tone calibration)

Evan (Ripper) is a sound designer, music composer, business owner, gamer (RPG, MMO, PVP). He grew up in the 90s hacker/phreaker culture, collects old hardware, makes electronic music, and built this site as a personal archive for the stories and sounds that shaped him. He is deeply particular about aesthetics and will iterate on visual details until they feel right. He values craft over convention and personality over polish.

---

## 11. Summary of Deliverables

The design agent should deliver:

1. Updated `globals.css` with Paper (default) and Blueprint color modes via CSS custom properties
2. Updated `tailwind.config.ts` with new color tokens and font entries
3. Updated `layout.tsx` loading all four fonts (JetBrains Mono, Source Serif 4, Instrument Serif, Caveat)
4. A theme toggle mechanism (React context, data-attribute, or similar)
5. Restyled homepage components: hero/masthead, article listing, MOTD, SystemBar
6. Restyled LiveFeed panels (away from DOS windows, toward zine aesthetic)
7. Updated Nav with theme toggle
8. SignalRain color adaptation for both modes
9. Subtle texture/grain overlays appropriate to each mode
10. All changes passing TypeScript strict mode and the em dash CI check

---

*End of spec. This document lives at `/DESIGN-AGENT-SPEC.md` in the phreak-fm repo root.*
