import type { Metadata } from "next";
import Link from "next/link";
import { getLexicon, getTermBySlug, type LexiconEntry, type Vertical } from "@/lib/lexicon";

export const metadata: Metadata = {
  title: "Lexicon",
  description:
    "A field guide to the language of phreaking, electronic music, and the old weird internet. 2600 Hz, blue boxes, the TB-303, hauntology, BBSes, and the rest, cross-linked from across the site.",
  alternates: {
    canonical: "https://phreak.fm/lexicon",
  },
};

const TAG: Record<Vertical, { abbr: string; color: string }> = {
  signals: { abbr: "SIG", color: "text-signals" },
  frequencies: { abbr: "MUS", color: "text-frequencies" },
  static: { abbr: "STA", color: "text-static-v" },
};

function groupByLetter(entries: LexiconEntry[]): [string, LexiconEntry[]][] {
  const groups = new Map<string, LexiconEntry[]>();
  for (const e of entries) {
    const letter = e.term[0].toUpperCase();
    const bucket = groups.get(letter);
    if (bucket) bucket.push(e);
    else groups.set(letter, [e]);
  }
  return Array.from(groups.entries());
}

export default function LexiconPage() {
  const entries = getLexicon();
  const groups = groupByLetter(entries);

  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <p className="text-xs text-text-muted tracking-widest uppercase mb-2">
          {">"} cat /etc/lexicon
        </p>
        <h1 className="font-display text-4xl text-text-bright mb-3">Lexicon</h1>
        <p className="font-body text-text-muted leading-relaxed">
          A field guide to the language of the three verticals: phreaking and
          security, electronic music, and the old weird internet. Not
          exhaustive, and growing. For virus-specific terms, see the{" "}
          <Link href="/museum/glossary" className="text-accent hover:text-accent-dim">
            museum glossary
          </Link>
          .
        </p>
      </header>

      {/* Letter jump nav */}
      <nav
        className="mb-10 flex flex-wrap gap-2 border-y border-border py-3"
        aria-label="Jump to letter"
      >
        {groups.map(([letter]) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            {letter}
          </a>
        ))}
      </nav>

      <div className="space-y-10">
        {groups.map(([letter, items]) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
            <h2 className="font-mono text-sm text-accent tracking-widest mb-4">
              {letter}
            </h2>
            <dl className="space-y-6">
              {items.map((e) => {
                const tag = e.vertical ? TAG[e.vertical] : null;
                const related = (e.related ?? [])
                  .map((slug) => getTermBySlug(slug))
                  .filter((x): x is LexiconEntry => Boolean(x));
                return (
                  <div
                    key={e.slug}
                    id={e.slug}
                    className="scroll-mt-20 border-b border-border-light pb-5 last:border-b-0"
                  >
                    <dt className="mb-1 flex items-baseline gap-2">
                      {tag && (
                        <span className={`font-mono text-[0.6rem] ${tag.color}`}>
                          [{tag.abbr}]
                        </span>
                      )}
                      <span className="font-mono text-sm text-text-bright">
                        {e.term}
                      </span>
                    </dt>
                    <dd className="font-body text-sm text-text leading-relaxed">
                      {e.definition}
                      {related.length > 0 && (
                        <span className="mt-1 block font-mono text-xs text-text-muted">
                          see also:{" "}
                          {related.map((r, i) => (
                            <span key={r.slug}>
                              {i > 0 && ", "}
                              <a
                                href={`#${r.slug}`}
                                className="hover:text-accent transition-colors"
                              >
                                {r.term}
                              </a>
                            </span>
                          ))}
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </div>
    </main>
  );
}
