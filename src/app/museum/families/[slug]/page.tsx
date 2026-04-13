import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllFamilies, getSpecimensByFamily } from "@/lib/museum";
import { SpecimenCard } from "@/components/SpecimenCard";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllFamilies().map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const family = getAllFamilies().find((f) => f.slug === params.slug);
  if (!family) return {};
  return {
    title: `${family.name} family :: DOS Virus Museum`,
    description: `All specimens in the ${family.name} virus family.`,
  };
}

export default function FamilyPage({ params }: PageProps) {
  const family = getAllFamilies().find((f) => f.slug === params.slug);
  if (!family) notFound();
  const specimens = getSpecimensByFamily(params.slug);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <nav className="font-mono text-xs text-text-muted mb-6">
        <Link href="/museum" className="hover:text-accent">/museum</Link>
        <span className="px-1">/</span>
        <span>families</span>
        <span className="px-1">/</span>
        <span className="text-text">{family.slug}</span>
      </nav>

      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1">
          family
        </p>
        <h1 className="font-display text-4xl text-text-bright mb-2">
          {family.name}
        </h1>
        <p className="font-mono text-xs text-text-muted">
          {specimens.length} specimen{specimens.length === 1 ? "" : "s"}
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {specimens.map((s) => (
          <SpecimenCard key={s.frontmatter.slug} specimen={s} />
        ))}
      </div>
    </main>
  );
}
