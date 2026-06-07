import type { Metadata } from "next";
import Link from "next/link";
import { getEphemeraByCategory, type Exhibit } from "@/lib/ephemera";

export const metadata: Metadata = {
  title: "Ephemera",
  description:
    "A cabinet of curiosities from the signal underground: payphones, blue box schematics, BBS login screens, cracktros, zine covers, and the sounds of the old network. Scans, stand-ins, and captions from the world this archive keeps.",
  alternates: {
    canonical: "https://phreak.fm/ephemera",
  },
};

function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function ExhibitCard({ e }: { e: Exhibit }) {
  const meta = [e.year, e.source].filter(Boolean).join("  ::  ");
  return (
    <article id={e.id} className="scroll-mt-20 border border-border bg-bg-surface">
      <div className="flex min-h-[7rem] items-center justify-center overflow-hidden border-b border-border bg-bg p-4">
        {e.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={e.image} alt={e.title} className="max-h-56 w-auto" />
        ) : e.ascii ? (
          <pre className="w-full overflow-x-auto font-mono text-[0.6rem] leading-tight text-accent sm:text-xs">
            {e.ascii}
          </pre>
        ) : (
          <span className="font-mono text-xs text-text-muted">
            [ awaiting scan ]
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-mono text-sm text-text-bright">{e.title}</h3>
        {meta && (
          <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-text-muted">
            {meta}
          </p>
        )}
        <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">
          {e.caption}
        </p>
        {e.link && (
          <Link
            href={e.link.href}
            className="mt-3 inline-block font-mono text-xs text-accent hover:text-accent-dim"
          >
            {"->"} {e.link.label}
          </Link>
        )}
      </div>
    </article>
  );
}

export default function EphemeraPage() {
  const groups = getEphemeraByCategory();

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10 border-b border-border pb-6">
        <p className="mb-2 text-xs uppercase tracking-widest text-text-muted">
          {">"} ls /ephemera
        </p>
        <h1 className="mb-3 font-display text-4xl text-text-bright">Ephemera</h1>
        <p className="max-w-2xl font-body leading-relaxed text-text-muted">
          A cabinet of curiosities from the signal underground: the artifacts of
          phreaking, the early network, and the scenes that grew in the dark.
          Scans, schematics, screen grabs, and the sounds themselves. The
          collection is small and growing. For the DOS virus wing, see the{" "}
          <Link href="/museum" className="text-accent hover:text-accent-dim">
            museum
          </Link>
          .
        </p>
      </header>

      <div className="space-y-12">
        {groups.map(([category, items]) => (
          <section
            key={category}
            id={categorySlug(category)}
            className="scroll-mt-20"
          >
            <h2 className="mb-5 font-mono text-sm uppercase tracking-widest text-accent">
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {items.map((e) => (
                <ExhibitCard key={e.id} e={e} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
