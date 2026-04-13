import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllSpecimenAuthors, getSpecimensByAuthor } from "@/lib/museum";
import { SpecimenCard } from "@/components/SpecimenCard";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSpecimenAuthors().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const author = getAllSpecimenAuthors().find((a) => a.slug === params.slug);
  if (!author) return {};
  return {
    title: `${author.name} :: DOS Virus Museum`,
    description: `Virus specimens attributed to ${author.name}.`,
  };
}

export default function AuthorPage({ params }: PageProps) {
  const author = getAllSpecimenAuthors().find((a) => a.slug === params.slug);
  if (!author) notFound();
  const specimens = getSpecimensByAuthor(params.slug);
  const notes = specimens.find((s) => s.frontmatter.authorNotes)?.frontmatter
    .authorNotes;

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <nav className="font-mono text-xs text-text-muted mb-6">
        <Link href="/museum" className="hover:text-accent">/museum</Link>
        <span className="px-1">/</span>
        <span>authors</span>
        <span className="px-1">/</span>
        <span className="text-text">{author.slug}</span>
      </nav>

      <header className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1">
          author
        </p>
        <h1 className="font-display text-4xl text-text-bright mb-2">
          {author.name}
        </h1>
        <p className="font-mono text-xs text-text-muted">
          {specimens.length} specimen{specimens.length === 1 ? "" : "s"}
        </p>
        {notes && (
          <p className="font-body text-text-muted mt-4 max-w-2xl leading-relaxed">
            {notes}
          </p>
        )}
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {specimens.map((s) => (
          <SpecimenCard key={s.frontmatter.slug} specimen={s} />
        ))}
      </div>
    </main>
  );
}
