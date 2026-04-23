# phreak.fm :: Canonical URL Fix Spec

## Intent

Fix "Duplicate without user-selected canonical" warnings in Google Search Console. Two root causes: missing canonical tags on several page types, and trailing slash ambiguity on Cloudflare Pages.

## Constraints

- Static export (`output: "export"`). No runtime logic.
- Zero em dashes. CI enforces.
- Do not modify editorial content.

---

## 1. Trailing Slash: next.config.mjs

Add `trailingSlash: false` to make the export behavior explicit:

```js
const nextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};
```

This ensures Next.js generates `/signals/chaos-computer-club.html` not `/signals/chaos-computer-club/index.html`.

---

## 2. Cloudflare Pages Redirects: public/_redirects

Create `public/_redirects` to 301 any trailing-slash request to the non-trailing-slash canonical. Cloudflare Pages supports this file natively.

```
# Redirect trailing slashes to non-trailing (301 permanent)
/signals/   /signals  301
/frequencies/   /frequencies  301
/static/   /static  301
/museum/   /museum  301
/news/   /news  301
/about/   /about  301
/search/   /search  301
/submit/   /submit  301
/dedication/   /dedication  301

# Catch-all trailing slash redirect using splat
/:path/*/ /:path/* 301
```

Note: Cloudflare Pages splat rules handle nested paths. The explicit rules above are belt-and-suspenders for the top-level pages.

---

## 3. Add Canonical Tags to Museum Specimen Pages

**File:** `src/app/museum/specimens/[slug]/page.tsx`

In the `generateMetadata` function, add `alternates.canonical`:

```ts
alternates: {
  canonical: `https://phreak.fm/museum/specimens/${params.slug}`,
},
```

Also add OpenGraph metadata if missing: type, url, title, description, siteName.

---

## 4. Add Canonical Tags to Label Hub Pages

**File:** `src/app/frequencies/labels/[slug]/page.tsx`

In `generateMetadata`, add:

```ts
alternates: {
  canonical: `https://phreak.fm/frequencies/labels/${params.slug}`,
},
```

---

## 5. Add Canonical Tags to Artist Hub Pages

**File:** `src/app/frequencies/artists/[slug]/page.tsx`

In `generateMetadata`, add:

```ts
alternates: {
  canonical: `https://phreak.fm/frequencies/artists/${params.slug}`,
},
```

---

## 6. Add Canonical Tags to Museum Landing Page

**File:** `src/app/museum/page.tsx`

In the metadata export, add:

```ts
alternates: {
  canonical: "https://phreak.fm/museum",
},
```

---

## 7. Add Canonical Tags to Museum Family Pages

**File:** `src/app/museum/families/[slug]/page.tsx`

In `generateMetadata`, add:

```ts
alternates: {
  canonical: `https://phreak.fm/museum/families/${params.slug}`,
},
```

---

## 8. Add Canonical Tags to Museum Year Pages

**File:** `src/app/museum/years/[year]/page.tsx`

In `generateMetadata`, add:

```ts
alternates: {
  canonical: `https://phreak.fm/museum/years/${params.year}`,
},
```

---

## 9. Add Canonical Tags to Museum Author Pages

**File:** `src/app/museum/authors/[slug]/page.tsx`

In `generateMetadata`, add:

```ts
alternates: {
  canonical: `https://phreak.fm/museum/authors/${params.slug}`,
},
```

---

## 10. Audit Remaining Pages Without Canonical

Check these pages and add canonical if missing:

- `src/app/about/page.tsx` -> `https://phreak.fm/about`
- `src/app/news/page.tsx` -> `https://phreak.fm/news`
- `src/app/search/page.tsx` -> `https://phreak.fm/search`
- `src/app/submit/page.tsx` -> `https://phreak.fm/submit`
- `src/app/dedication/page.tsx` -> `https://phreak.fm/dedication`
- `src/app/legal/terms/page.tsx` -> `https://phreak.fm/legal/terms`
- `src/app/legal/privacy/page.tsx` -> `https://phreak.fm/legal/privacy`
- `src/app/author/[slug]/page.tsx` -> `https://phreak.fm/author/{slug}`
- `src/app/signals/page.tsx` -> `https://phreak.fm/signals`
- `src/app/frequencies/page.tsx` -> `https://phreak.fm/frequencies`
- `src/app/static/page.tsx` -> `https://phreak.fm/static`
- `src/app/museum/glossary/page.tsx` -> `https://phreak.fm/museum/glossary`
- `src/app/museum/about/page.tsx` -> `https://phreak.fm/museum/about`

If any of these already have canonical set (article pages via buildArticleMetadata, vertical landing pages via buildVerticalMetadata), skip them. Add to any that are missing.

---

## 11. Verification

After deploy, wait 48 hours, then check GSC coverage report. The "Duplicate without user-selected canonical" count should drop as Google recrawls. Use URL Inspection on a few previously-flagged URLs to confirm the canonical tag is now present and the trailing slash redirects are working.

---

*End of spec.*
