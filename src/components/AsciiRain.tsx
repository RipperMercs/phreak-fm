"use client";
import { useEffect, useRef } from "react";

/**
 * AsciiRain
 * Slow-breathing ASCII character field in phosphor teal.
 * Reads --accent live; falls back to teal. ~30fps. Reduced-motion aware.
 *
 * Apparitions: every ~20s a phreaker-era ASCII relic (skull, laptop, CRT,
 * cassette, floppy, phone, 2600 mag, modem) materializes by reorganizing
 * the rain chars into the silhouette, holds briefly with a per-cell color
 * shimmer in a contrast tint, then demorphs back to noise. The chars
 * themselves do the work, so the shape reads as the rain transforming.
 */

const CHARS = ['.',',',':',';','|','/','\\','+','-','=','*','#','@','0','1','>','<','%','~','&','^','_','o','O','(',')'];

const SPRITES: Record<string, string[]> = {
  skull: [
    "    ______    ",
    "   /      \\   ",
    "  /  .--.  \\  ",
    " |  ( oo )  | ",
    " |   \\__/   | ",
    "  \\  ||||  /  ",
    "   '--||--'   ",
    "     ||||     ",
  ],
  laptop: [
    "  ,--------------.  ",
    "  |  .--------.  |  ",
    "  |  |  ><_   |  |  ",
    "  |  |  phreak|  |  ",
    "  |  '--------'  |  ",
    "  '--------------'  ",
    " /________________\\ ",
  ],
  crt: [
    "  ___________________  ",
    " |  _______________  | ",
    " | |               | | ",
    " | |   NO CARRIER  | | ",
    " | |               | | ",
    " | |_______________| | ",
    " |___________________| ",
    "      \\_________/      ",
    "      [_________]      ",
  ],
  cassette: [
    " ,-------------------, ",
    " | ,---, HF90 ,---,  | ",
    " | | O |-----| O |  | ",
    " | '---'     '---'  | ",
    " |   |||||||||||    | ",
    " '---o-----------o--' ",
  ],
  floppy: [
    "  ,----------------,  ",
    "  |[]|           | |  ",
    "  |  |           | |  ",
    "  |  '-----------' |  ",
    "  |                |  ",
    "  |  ,----------,  |  ",
    "  |  | 3.5\" HD  |  |  ",
    "  |  '----------'  |  ",
    "  '----------------'  ",
  ],
  phone: [
    "   ___________   ",
    "  /   _____   \\  ",
    " | []       [] | ",
    " |  .-.-.-.-.  | ",
    " |  '-'-'-'-'  | ",
    " |   1  2  3   | ",
    " |   4  5  6   | ",
    " |   7  8  9   | ",
    " |   *  0  #   | ",
    "  \\___________/  ",
  ],
  mag2600: [
    "  .----------------.  ",
    "  |                |  ",
    "  |  2 6 0 0       |  ",
    "  |                |  ",
    "  |  HACKER QTRLY  |  ",
    "  |                |  ",
    "  '----------------'  ",
  ],
  modem: [
    "  ,------------------,  ",
    "  | [ ] [ ] [ ] [ ]  |  ",
    "  | MODEM  300/1200  |  ",
    "  '--[][]-----[][]---'  ",
  ],
};

const SPRITE_KEYS = Object.keys(SPRITES);

const APP_COLORS: [number, number, number][] = [
  [120, 230, 140],
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
  /** Average ms between apparitions. Default 20000 (jittered 0.6-1.4x). */
  apparitionIntervalMs?: number;
};

type AppCell = { x: number; y: number; idx: number; ch: string };
type ActiveApparition = {
  cells: AppCell[];
  index: Map<number, string>;
  rgb: [number, number, number];
  bornAt: number;
  fadeInMs: number;
  holdMs: number;
  fadeOutMs: number;
};

export default function AsciiRain({
  intensity = 10,
  cell = 12,
  noCursor = false,
  dim = 0.65,
  rift = true,
  apparitions = true,
  apparitionIntervalMs = 20000,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Refs let dim and apparitions update live without restarting the canvas
  // on route changes. The animation loop reads .current each frame.
  const dimRef = useRef(dim);
  const apparitionsRef = useRef(apparitions);
  useEffect(() => { dimRef.current = dim; }, [dim]);
  useEffect(() => { apparitionsRef.current = apparitions; }, [apparitions]);

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
      // Cells use idx = y*cols + x; resize invalidates that mapping.
      activeApp = null;
    };

    const onPointer = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth;
      py = e.clientY / window.innerHeight;
    };

    const scheduleNext = (now: number) => {
      const jitter = 0.6 + Math.random() * 0.8;
      nextAppMs = now + apparitionIntervalMs * jitter;
    };

    const trySpawn = (now: number) => {
      const key = SPRITE_KEYS[(Math.random() * SPRITE_KEYS.length) | 0];
      const sprite = SPRITES[key];
      const sh = sprite.length;
      const sw = Math.max(...sprite.map((r) => r.length));
      if (sw + 2 >= cols || sh + 2 >= rows) {
        // Viewport too small for this sprite; try another in 4s.
        nextAppMs = now + 4000;
        return;
      }
      const marginX = Math.max(1, Math.floor((cols - sw) / 2));
      const marginY = Math.max(1, Math.floor((rows - sh) / 2));
      const gx = Math.max(1, Math.min(cols - sw - 1,
        marginX + (((Math.random() - 0.5) * cols * 0.5) | 0)));
      const gy = Math.max(1, Math.min(rows - sh - 1,
        marginY + (((Math.random() - 0.5) * rows * 0.4) | 0)));
      const cells: AppCell[] = [];
      const index = new Map<number, string>();
      for (let yy = 0; yy < sh; yy++) {
        const row = sprite[yy];
        for (let xx = 0; xx < row.length; xx++) {
          const ch = row[xx];
          if (ch === ' ') continue;
          const ax = gx + xx, ay = gy + yy;
          const idx = ay * cols + ax;
          cells.push({ x: ax, y: ay, idx, ch });
          index.set(idx, ch);
        }
      }
      activeApp = {
        cells,
        index,
        rgb: APP_COLORS[(Math.random() * APP_COLORS.length) | 0],
        bornAt: now,
        fadeInMs: 1800,
        holdMs: 1600 + Math.random() * 1400,
        fadeOutMs: 2200,
      };
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

      // Apparition lifecycle. Only spawn new ones when enabled, but always
      // let an in-flight apparition finish naturally so navigation away from
      // a loud page doesn't snap-cut a visible silhouette.
      if (apparitionsRef.current) {
        if (nextAppMs === 0) {
          // First reveal lands 5-10s after mount so the feature is discoverable.
          nextAppMs = ts + (5000 + Math.random() * 5000);
        }
        if (!activeApp && ts >= nextAppMs) trySpawn(ts);
      }
      if (activeApp) {
        const total = activeApp.fadeInMs + activeApp.holdMs + activeApp.fadeOutMs;
        if (ts - activeApp.bornAt >= total) {
          activeApp = null;
          if (apparitionsRef.current) scheduleNext(ts);
          else nextAppMs = 0;
        }
      }

      let aAlpha = 0;
      let morphProb = 0;
      let demorphProb = 0;
      if (activeApp) {
        const age = ts - activeApp.bornAt;
        if (age < activeApp.fadeInMs) {
          aAlpha = age / activeApp.fadeInMs;
          morphProb = Math.max(0.04, aAlpha * 0.15);
        } else if (age < activeApp.fadeInMs + activeApp.holdMs) {
          aAlpha = 1;
          // Catch any stragglers that didn't morph during fade-in.
          morphProb = 0.05;
        } else {
          aAlpha = 1 - (age - activeApp.fadeInMs - activeApp.holdMs) / activeApp.fadeOutMs;
          // Demorph during fade-out so the silhouette dissolves with the color
          // instead of leaving a teal afterimage in the rain for a minute.
          demorphProb = (1 - aAlpha) * 0.10;
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

          const artCh = activeApp ? activeApp.index.get(i) : undefined;

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
          // Lift the field for committed apparition cells so the silhouette
          // holds through wave troughs.
          const isMorphed = !!artCh && ch === artCh;
          if (isMorphed) field = Math.max(field, 0.5);

          if (field < 0.12) continue;

          // Pause natural mutation inside the apparition footprint; the
          // demorph rate above controls dissolve so timing is predictable.
          if (!artCh && Math.random() < 0.004) {
            ch = CHARS[(Math.random() * CHARS.length) | 0];
            grid[i] = ch;
          }

          const op = Math.min(0.5, field * 0.55) * dimRef.current;
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${op.toFixed(3)})`;
          ctx.fillText(ch, x * cell, y * cell);
        }
      }

      // Color overlay pass: only morphed cells get a tinted draw on top, with
      // per-cell sin shimmer so the apparition flickers like phosphor instead
      // of sitting flat.
      if (activeApp && aAlpha > 0.02) {
        const ink = activeApp.rgb;
        for (const cc of activeApp.cells) {
          if (grid[cc.idx] !== cc.ch) continue;
          const shimmer = Math.sin(cc.x * 0.7 + cc.y * 0.9 + t * 4) * 0.15 + 0.85;
          const op = aAlpha * 0.9 * shimmer;
          ctx.fillStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},${op.toFixed(3)})`;
          ctx.fillText(cc.ch, cc.x * cell, cc.y * cell);
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
  }, [intensity, cell, noCursor, rift, apparitionIntervalMs]);

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
