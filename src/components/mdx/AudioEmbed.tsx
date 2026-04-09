interface AudioEmbedProps {
  src: string;
  title?: string;
}

export function AudioEmbed({ src, title }: AudioEmbedProps) {
  return (
    <div className="my-6 p-4 bg-surface rounded border border-border">
      {title && (
        <p className="font-mono text-sm text-foreground mb-3">{title}</p>
      )}
      <audio
        src={src}
        controls
        className="w-full"
        preload="metadata"
        aria-label={title || "Audio embed"}
      />
    </div>
  );
}
