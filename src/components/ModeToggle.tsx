"use client";

import { useState, useEffect } from "react";

export function ModeToggle() {
  const [mode, setMode] = useState<"paper" | "blueprint">("blueprint");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("phreak-mode");
    const initial = stored === "paper" ? "paper" : "blueprint";
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
      <span className={mode === "blueprint" ? "text-text" : "text-text-muted"}>
        dark
      </span>
      {" / "}
      <span className={mode === "paper" ? "text-text" : "text-text-muted"}>
        light
      </span>
    </button>
  );
}
