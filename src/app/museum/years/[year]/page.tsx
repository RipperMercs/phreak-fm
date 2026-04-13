import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllYears, getSpecimensByYear } from "@/lib/museum";
import { SpecimenCard } from "@/components/SpecimenCard";

interface PageProps {
  params: { year: string };
}

export function generateStaticParams() {
  return getAllYears().map((y) => ({ year: String(y) }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `Viruses of ${params.year} :: DOS Virus Museum`,
    description: `All MS-DOS-era virus specimens discovered in ${params.year}.`,
  };
}

export default function YearPage({ params }: PageProps) {
  const year = parseInt(params.year, 10);
  if (Number.isNaN(year)) notFound();
  const specimens = getSpecimensByYear(year);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <nav className="font-mono text-xs text-text-muted mb-6">
        <Link href="/museum" className="hover:text-accent">/museum</Link>
        <span className="px-1">/</span>
        <span>years</span>
        <span className="px-1">/</span>
        <span className="text-text">{year}</span>
      </nav>

      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1">
          year
        </p>
        <h1 className="font-display text-4xl text-text-bright mb-2">{year}</h1>
        <p className="font-mono text-xs text-text-muted">
          {specimens.length} specimen{specimens.length === 1 ? "" : "s"}
        </p>
      </header>

      {specimens.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {specimens.map((s) => (
            <SpecimenCard key={s.frontmatter.slug} specimen={s} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-xs text-text-muted">~ no specimens cataloged for this year ~</p>
      )}
    </main>
  );
}
