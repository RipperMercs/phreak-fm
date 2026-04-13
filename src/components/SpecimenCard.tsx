import Link from "next/link";
import { Specimen } from "@/types/museum";

interface SpecimenCardProps {
  specimen: Specimen;
  variant?: "default" | "compact";
}

function Rating({ value, label }: { value: number; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${label}: ${value} of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`block w-1.5 h-1.5 ${
            i < value ? "bg-accent" : "bg-border"
          }`}
        />
      ))}
    </span>
  );
}

export function SpecimenCard({ specimen, variant = "default" }: SpecimenCardProps) {
  const fm = specimen.frontmatter;
  const href = `/museum/specimens/${fm.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group block py-2 border-b border-border-light no-underline"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-text-muted w-12 shrink-0">
            {fm.discoveredYear ?? "????"}
          </span>
          <span className="font-mono text-sm text-text group-hover:text-accent transition-colors flex-1 truncate">
            {fm.name}
          </span>
          <Rating value={fm.aestheticRating} label="aesthetic" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block bg-bg-surface border border-border hover:border-accent transition-colors no-underline"
    >
      <div className="aspect-[4/3] bg-bg overflow-hidden border-b border-border">
        {fm.heroMediaType === "mp4" ? (
          <video
            src={fm.heroMedia}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            aria-label={fm.heroMediaAlt}
          />
        ) : (
          <img
            src={fm.heroMedia}
            alt={fm.heroMediaAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-mono text-sm text-text-bright group-hover:text-accent transition-colors truncate">
            {fm.name}
          </h3>
          <span className="font-mono text-xs text-text-muted shrink-0">
            {fm.discoveredYear ?? ""}
          </span>
        </div>
        <p className="font-mono text-xs text-text-muted truncate">
          family: {fm.family}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
            aesthetic
          </span>
          <Rating value={fm.aestheticRating} label="aesthetic" />
        </div>
      </div>
    </Link>
  );
}
