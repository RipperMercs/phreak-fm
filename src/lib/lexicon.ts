// The Lexicon: a site-wide phreak / music / net glossary. Entries live in
// content/lexicon.json and are appended over time. Rendered at /lexicon, and
// linkable inline from any article via the <Term slug="..."> MDX component.

import lexiconData from "../../content/lexicon.json";

export type Vertical = "signals" | "frequencies" | "static";

export interface LexiconEntry {
  term: string;
  slug: string; // anchor on /lexicon, and the id used by <Term>
  definition: string;
  vertical?: Vertical;
  aliases?: string[];
  related?: string[]; // slugs of related terms
}

const ENTRIES = lexiconData as unknown as LexiconEntry[];

const BY_SLUG = new Map<string, LexiconEntry>(ENTRIES.map((e) => [e.slug, e]));

// Alphabetical, case-insensitive.
export function getLexicon(): LexiconEntry[] {
  return ENTRIES.slice().sort((a, b) =>
    a.term.toLowerCase().localeCompare(b.term.toLowerCase())
  );
}

export function getTermBySlug(slug: string): LexiconEntry | undefined {
  return BY_SLUG.get(slug);
}
