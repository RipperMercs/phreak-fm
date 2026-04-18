"use client";
import { useEffect, useRef } from "react";

/**
 * AsciiRain
 * Slow-breathing ASCII character field in phosphor teal.
 * Reads --accent live; falls back to teal. ~30fps. Reduced-motion aware.
 */

const CHARS = ['.',',',':',';','|','/','\\','+','-','=','*','#','@','0','1','>','<','%','~','&','^'];

type Props = {
  /** 5-100. Lower = sparser. Default 10 (matches approved demo). */
  intensity?: number;
  /** Grid cell size in px. Default 12. */
  cell?: number;
  /** Disable cursor attractor. Default false. */
  noCursor?: boolean;
  /** 0-1 multiplier on final opacity. Lower = quieter background. Default 0.65. */
  dim?: number;
  /** Slow diagonal brightening band that sweeps the field. Default true. */
  rift?: boolean;
};

export default function AsciiRain({
  intensity = 10,
  cell = 12,
  noCursor = false,
  dim = 0.65,
  rift = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1;
    let cols = 0, rows = 0;
    let grid: { ch: number; p: number }[] = [];
    let t = 0;
    let riftPhase = 0;
    let px = 0.5, py = 0.5;
    let raf = 0;
    let last = 0;

    const readAccent = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      return v || "#2dd4bf";
    };
    const hexToRgb = (hex: string): [number, number, number] => {
      const m = hex.replace("#", "");
      const s = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
      const n = parseInt(s, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    let rgb = hexToRgb(readAccent());

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / cell);
      rows = Math.ceil(H / cell);
      grid = new Array(cols * rows);
      for (let i = 0; i < grid.length; i++) {
        grid[i] = { ch: (Math.random() * CHARS.length) | 0, p: Math.random() * Math.PI * 2 };
      }
    };

    const onPointer = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth;
      py = e.clientY / window.innerHeight;
    };

    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      if (ts - last < 33) return;
      last = ts;

      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      riftPhase += 0.0015;
      ctx.font = `${cell}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const cx = px * cols;
      const cy = py * rows;
      const intScalar = 0.3 + Math.max(5, Math.min(100, intensity)) / 100 * 0.7;
      // diagonal sweeping band, periodic, enters at -0.2 and exits past 1.2
      const wavePos = (riftPhase % 1.4) - 0.2;
      const riftWidth = 0.09;
      const riftDenom = 2 * riftWidth * riftWidth;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const c = grid[i];
          const v = Math.sin(x * 0.18 + t * 1.2) * Math.cos(y * 0.22 - t * 0.8);
          let field = (v * 0.5 + 0.5) * intScalar;
          if (!noCursor) {
            const dx = x - cx, dy = y - cy;
            const d = Math.sqrt(dx * dx + dy * dy) / Math.max(cols, rows);
            field += Math.max(0, 1 - d * 3) * 0.5;
          }
          if (rift) {
            const proj = (x / cols + y / rows) * 0.5;
            const dr = proj - wavePos;
            field += 0.55 * Math.exp(-(dr * dr) / riftDenom);
          }
          if (field < 0.12) continue;
          if (Math.random() < 0.004) c.ch = (Math.random() * CHARS.length) | 0;
          const op = Math.min(0.5, field * 0.55) * dim;
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${op.toFixed(3)})`;
          ctx.fillText(CHARS[c.ch], x * cell, y * cell);
        }
      }
    };

    const mo = new MutationObserver(() => { rgb = hexToRgb(readAccent()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "style"] });

    resize();
    window.addEventListener("resize", resize);
    if (!noCursor) window.addEventListener("pointermove", onPointer, { passive: true });
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("resize", resize);
      if (!noCursor) window.removeEventListener("pointermove", onPointer);
    };
  }, [intensity, cell, noCursor, dim, rift]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
