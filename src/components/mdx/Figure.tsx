interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  grain?: boolean;
}

export function Figure({ src, alt, caption, grain }: FigureProps) {
  return (
    <figure className="my-8">
      <div
        className={`overflow-hidden rounded ${grain ? "grain-overlay" : ""}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
