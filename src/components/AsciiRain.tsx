"use client";
import { useEffect, useRef } from "react";

/**
 * AsciiRain
 * Slow-breathing ASCII character field in phosphor teal.
 * Reads --accent live; falls back to teal. ~30fps. Reduced-motion aware.
 *
 * Apparitions: every ~20s a small ASCII shape (skull, laptop, ghost, mask)
 * morphs out of the field in a contrast color, holds briefly, then demorphs
 * back into noise. The chars themselves reorganize into and out of shape so
 * the silhouette reads as the rain transforming, not a sticker on top.
 * Disable via apparitions={false}.
 */

const CHARS = ['.',',',':',';','|','/','\\','+','-','=','*','#','@','0','1','>','<','%','~','&','^','_','o','O','(',')'];

const APP_SKULL = [
  "    ______    ",
  "   /      \\   ",
  "  / o    o \\  ",
  " |    /\\    | ",
  " |   |  |   | ",
  "  \\  ====  /  ",
  "   \\______/   ",
  "    | || |    ",
  "    ' '' '    ",
];

const APP_LAPTOP = [
  "  ____________  ",
  " /            \\ ",
  "|  > _         |",
  "|              |",
  "|              |",
  " \\____________/ ",
  "================",
];

const APP_GHOST = [
  "    .----.    ",
  "   / o  o \\   ",
  "  |   <>   |  ",
  "  |        |  ",
  "  |        |  ",
  "   \\_/\\_/\\_/  ",
];

const APP_MASK = [
  "  .--------.  ",
  " /  \\    /  \\ ",
  "|    \\  /    |",
  "|     \\/     |",
  " \\   ====   / ",
  "  '--------'  ",
];

const APPARITIONS = [APP_SKULL, APP_LAPTOP, APP_GHOST, APP_MASK].map((art) => ({
  art,
  width: Math.max(...art.map((r) => r.length)),
  height: art.length,
}));

const APP_COLORS: [number, number, number][] = [
  [57, 255, 20],
  [239, 68, 68],
  [251, 191, 36],
  [167, 139, 250],
  [96, 165, 250],
];

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
  /** Periodic colored ASCII apparitions that emerge from the field. Default true. */
  apparitions?: boolean;
  /** Average seconds between apparitions. Default 20 (jittered +0-8s). */
  apparitionIntervalSec?: number;
};

type ActiveApparition = {
  art: string[];
  width: number;
  height: number;
  ox: number;
  oy: number;
  rgb: [number, number, number];
  startMs: number;
  durationMs: number;
};

export default function AsciiRain({
  intensity = 10,
  cell = 12,
  noCursor = false,
  dim = 0.65,
  rift = true,
  apparitions = true,
  apparitionIntervalSec = 20,
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
    let grid: string[] = [];
    let t = 0;
    let riftPhase = 0;
    let px = 0.5, py = 0.5;
    let raf = 0;
    let last = 0;
    let activeApp: ActiveApparition | null = null;
    let nextAppMs = 0;

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
        grid[i] = CHARS[(Math.random() * CHARS.length) | 0];
      }
      // Drop any in-flight apparition: its origin coords are stale on the new grid.
      activeApp = null;
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

      if (apparitions) {
        if (nextAppMs === 0) {
          // Show the first apparition early so users see the feature on landing.
          nextAppMs = ts + (5 + Math.random() * 5) * 1000;
        }
        if (!activeApp && ts >= nextAppMs) {
          const proto = APPARITIONS[(Math.random() * APPARITIONS.length) | 0];
          if (cols >= proto.width + 4 && rows >= proto.height + 4) {
            const ox = 2 + ((Math.random() * (cols - proto.width - 4)) | 0);
            const oy = 2 + ((Math.random() * (rows - proto.height - 4)) | 0);
            const aRgb = APP_COLORS[(Math.random() * APP_COLORS.length) | 0];
            activeApp = {
              art: proto.art,
              width: proto.width,
              height: proto.height,
              ox,
              oy,
              rgb: aRgb,
              startMs: ts,
              durationMs: 6500,
            };
          } else {
            // Viewport too small for this design; try again shortly.
            nextAppMs = ts + 4000;
          }
        }
        if (activeApp && ts - activeApp.startMs > activeApp.durationMs) {
          activeApp = null;
          nextAppMs = ts + (apparitionIntervalSec + Math.random() * 8) * 1000;
        }
      } else if (activeApp) {
        activeApp = null;
      }

      let appAlpha = 0;
      let morphProb = 0;
      let demorphProb = 0;
      if (activeApp) {
        const phase = (ts - activeApp.startMs) / activeApp.durationMs;
        const env = Math.sin(phase * Math.PI);
        appAlpha = Math.min(1, env * 1.4);
        if (phase < 0.5) {
          morphProb = env * 0.18;
        } else {
          // Demorph during fade-out so the shape dissolves with the color
          // instead of leaving a teal silhouette behind for ~minute.
          demorphProb = (1 - env) * 0.05;
        }
      }

      const cx = px * cols;
      const cy = py * rows;
      const intScalar = 0.3 + Math.max(5, Math.min(100, intensity)) / 100 * 0.7;
      const wavePos = (riftPhase % 1.4) - 0.2;
      const riftWidth = 0.09;
      const riftDenom = 2 * riftWidth * riftWidth;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let ch = grid[i];

          let artCh: string | null = null;
          if (activeApp) {
            const ax = x - activeApp.ox;
            const ay = y - activeApp.oy;
            if (ax >= 0 && ax < activeApp.width && ay >= 0 && ay < activeApp.height) {
              const row = activeApp.art[ay];
              if (row && ax < row.length) {
                const aCh = row[ax];
                if (aCh !== ' ') artCh = aCh;
              }
            }
          }

          if (artCh) {
            if (ch !== artCh && Math.random() < morphProb) {
              ch = artCh;
              grid[i] = ch;
            } else if (ch === artCh && Math.random() < demorphProb) {
              ch = CHARS[(Math.random() * CHARS.length) | 0];
              grid[i] = ch;
            }
          }

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
          // Lift the field for cells that have committed to the apparition shape
          // so the silhouette stays visible through wave troughs.
          const isMorphed = artCh !== null && ch === artCh;
          if (isMorphed) field = Math.max(field, 0.5);

          if (field < 0.12) continue;

          // Pause natural mutation inside the apparition area; demorph above
          // controls the dissolve rate so the silhouette ages predictably.
          if (!artCh && Math.random() < 0.004) {
            ch = CHARS[(Math.random() * CHARS.length) | 0];
            grid[i] = ch;
          }

          const op = Math.min(0.5, field * 0.55) * dim;
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${op.toFixed(3)})`;
          ctx.fillText(ch, x * cell, y * cell);

          if (isMorphed && appAlpha > 0.04 && activeApp) {
            ctx.fillStyle = `rgba(${activeApp.rgb[0]},${activeApp.rgb[1]},${activeApp.rgb[2]},${appAlpha.toFixed(3)})`;
            ctx.fillText(ch, x * cell, y * cell);
          }
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
  }, [intensity, cell, noCursor, dim, rift, apparitions, apparitionIntervalSec]);

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
