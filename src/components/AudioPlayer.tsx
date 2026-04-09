"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface AudioPlayerProps {
  src: string;
  title: string;
}

const SPEEDS = [1, 1.25, 1.5, 2] as const;

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);

  const formatTime = useCallback((seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const cycleSpeed = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextIndex = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(nextIndex);
    audio.playbackRate = SPEEDS[nextIndex];
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border z-50">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="max-w-content mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Transport controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => skip(-15)}
              className="font-mono text-xs text-text-muted hover:text-text transition-colors"
              aria-label="Skip back 15 seconds"
            >
              -15
            </button>

            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center border border-border rounded-sm font-mono text-sm text-text hover:bg-bg-surface-hover transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "||" : ">"}
            </button>

            <button
              onClick={() => skip(15)}
              className="font-mono text-xs text-text-muted hover:text-text transition-colors"
              aria-label="Skip forward 15 seconds"
            >
              +15
            </button>
          </div>

          {/* Title and progress bar */}
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-text truncate">
              {title}
            </p>
            <div
              className="mt-1 h-[2px] bg-border cursor-pointer"
              onClick={seek}
              role="slider"
              aria-label="Audio progress"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-riso-cyan transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Time readout and speed */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-text-muted whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button
              onClick={cycleSpeed}
              className="font-mono text-xs text-text-muted hover:text-text transition-colors"
              aria-label={`Playback speed: ${SPEEDS[speedIndex]}x`}
            >
              {SPEEDS[speedIndex]}x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
