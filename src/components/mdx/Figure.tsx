interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  grain?: boolean;
  halftone?: boolean;
}

export function Figure({ src, alt, caption, grain, halftone }: FigureProps) {
  const overlayClasses = [
    grain ? "grain-overlay" : "",
    halftone ? "halftone-overlay" : "",
  ].join(" ");

  return (
    <figure className="my-8">
      <div className={`overflow-hidden rounded-sm ${overlayClasses}`}>
        <img src={src} alt={alt} className="w-full" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-xs text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
