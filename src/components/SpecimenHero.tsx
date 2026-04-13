"use client";

import { useState, useEffect, useRef } from "react";
import { MediaItem, MediaType } from "@/types/museum";

interface SpecimenHeroProps {
  url: string;
  type: MediaType;
  alt: string;
  caption?: string;
}

export function SpecimenHero({ url, type, alt, caption }: SpecimenHeroProps) {
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isAnimated = type === "gif" || type === "mp4";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) setPaused(true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  return (
    <figure className="bg-bg-surface border border-border">
      <div className="relative aspect-[4/3] bg-bg overflow-hidden">
        {type === "mp4" ? (
          <video
            ref={videoRef}
            src={url}
            className="w-full h-full object-contain"
            muted
            loop
            playsInline
            autoPlay
            aria-label={alt}
          />
        ) : (
          <img
            src={url}
            alt={alt}
            className="w-full h-full object-contain"
            loading="eager"
            data-paused={paused ? "true" : "false"}
          />
        )}
        {isAnimated && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="absolute bottom-2 right-2 font-mono text-[10px] uppercase px-2 py-1 bg-bg/80 border border-border text-text-muted hover:text-accent hover:border-accent"
            aria-label={paused ? "Resume animation" : "Pause animation"}
          >
            {paused ? "[ play ]" : "[ pause ]"}
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="px-3 py-2 font-mono text-xs text-text-muted border-t border-border">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function MediaGallery({ items }: { items: MediaItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {items.map((item, i) => (
        <SpecimenHero
          key={i}
          url={item.url}
          type={item.type}
          alt={item.alt}
          caption={item.caption}
        />
      ))}
    </div>
  );
}
