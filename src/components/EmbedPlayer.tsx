"use client";

interface EmbedPlayerProps {
  url: string;
  type: "bandcamp" | "soundcloud" | "youtube";
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
  );
  const videoId = match ? match[1] : url;
  return `https://www.youtube.com/embed/${videoId}`;
}

export function EmbedPlayer({ url, type }: EmbedPlayerProps) {
  if (type === "youtube") {
    return (
      <div className="my-6 border border-border rounded overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={getYouTubeEmbedUrl(url)}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube embed"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (type === "bandcamp") {
    return (
      <div className="my-6 border border-border rounded overflow-hidden">
        <iframe
          src={url}
          className="w-full border-0"
          style={{ height: "120px" }}
          seamless
          title="Bandcamp embed"
          loading="lazy"
        />
      </div>
    );
  }

  if (type === "soundcloud") {
    return (
      <div className="my-6 border border-border rounded overflow-hidden">
        <iframe
          src={url}
          className="w-full border-0"
          style={{ height: "166px" }}
          allow="autoplay"
          title="SoundCloud embed"
          loading="lazy"
        />
      </div>
    );
  }

  return null;
}
