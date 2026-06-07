import Link from "next/link";
import { getTermBySlug } from "@/lib/lexicon";

interface TermProps {
  slug: string;
  children: React.ReactNode;
}

// Inline link from an article to a Lexicon definition. Hovering shows the
// definition as a tooltip; clicking jumps to the term on /lexicon. If the slug
// is unknown, the text renders plainly so nothing ever breaks.
export function Term({ slug, children }: TermProps) {
  const entry = getTermBySlug(slug);
  if (!entry) return <>{children}</>;
  return (
    <Link
      href={`/lexicon#${slug}`}
      title={entry.definition}
      className="border-b border-dotted border-accent/60 text-text hover:text-accent transition-colors"
    >
      {children}
    </Link>
  );
}
