import Link from "next/link";
import { getSpecimenBySlug } from "@/lib/museum";

interface SpecimenReferenceProps {
  slug: string;
}

export function SpecimenReference({ slug }: SpecimenReferenceProps) {
  const specimen = getSpecimenBySlug(slug);
  if (!specimen) {
    return (
      <span className="font-mono text-xs text-text-muted">
        [missing specimen: {slug}]
      </span>
    );
  }

  const fm = specimen.frontmatter;
  const href = `/museum/specimens/${fm.slug}`;

  return (
    <Link
      href={href}
      className="not-prose my-6 flex items-center gap-3 bg-bg-surface border border-border hover:border-accent transition-colors p-3 no-underline"
    >
      <div className="w-16 h-16 shrink-0 bg-bg overflow-hidden border border-border-light">
        <img
          src={fm.heroMedia}
          alt={fm.heroMediaAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          museum specimen
        </p>
        <p className="font-mono text-sm text-text-bright truncate">
          {fm.name}
          {fm.discoveredYear ? (
            <span className="text-text-muted"> :: {fm.discoveredYear}</span>
          ) : null}
        </p>
        <p className="font-mono text-xs text-text-muted truncate">
          {fm.payloadDescription}
        </p>
      </div>
      <span className="font-mono text-xs text-accent shrink-0">[ view ]</span>
    </Link>
  );
}
