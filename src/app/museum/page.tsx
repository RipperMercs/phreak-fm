import { Metadata } from "next";
import Link from "next/link";
import { getAllSpecimens } from "@/lib/museum";
import { SpecimenCard } from "@/components/SpecimenCard";

export const metadata: Metadata = {
  title: "DOS Virus Museum :: phreak.fm",
  description:
    "A historical archive of MS-DOS-era computer viruses. Static specimens, technical writeups, and cultural context. Curated by the_curator.",
};

export default function MuseumPage() {
  const specimens = getAllSpecimens();

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-text-bright mb-3">
          DOS Virus Museum
        </h1>
        <p className="font-body text-text-muted max-w-2xl leading-relaxed">
          A historical archive of MS-DOS-era computer viruses, roughly 1986
          through the late 1990s. Static specimens, technical writeups,
          authorship history, and cultural context. No executables. No
          downloads. Curated by{" "}
          <Link href="/museum/about" className="text-accent hover:underline">
            the_curator
          </Link>
          .
        </p>
      </header>

      <section>
        <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">
          Specimens ({specimens.length})
        </h2>
        {specimens.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {specimens.map((s) => (
              <SpecimenCard key={s.frontmatter.slug} specimen={s} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-xs text-text-muted">
            ~ archive being assembled ~
          </p>
        )}
      </section>
    </main>
  );
}
