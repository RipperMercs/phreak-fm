"use client";

import { useState, useEffect } from "react";

export function ModeToggle() {
  const [mode, setMode] = useState<"paper" | "blueprint">("paper");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("phreak-mode");
    const initial = stored === "blueprint" ? "blueprint" : "paper";
    setMode(initial);
    document.documentElement.className = initial;
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = mode === "paper" ? "blueprint" : "paper";
    setMode(next);
    document.documentElement.className = next;
    localStorage.setItem("phreak-mode", next);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="font-mono text-xs text-text-muted hover:text-text transition-colors select-none"
      aria-label={`Switch to ${mode === "paper" ? "blueprint" : "paper"} mode`}
    >
      <span className={mode === "paper" ? "text-text" : "text-text-muted"}>
        paper
      </span>
      {" / "}
      <span className={mode === "blueprint" ? "text-text" : "text-text-muted"}>
        blueprint
      </span>
    </button>
  );
}
