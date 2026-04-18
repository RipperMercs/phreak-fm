"use client";
import { usePathname } from "next/navigation";
import AsciiRain from "./AsciiRain";

// Pages where the rain IS the experience: home and section landings. Reading
// pages and forms get a heavily dimmed field with no apparitions so the
// background never competes with content.
const LOUD_PATHS = new Set<string>([
  "/",
  "/signals",
  "/frequencies",
  "/frequencies/pirate-signal",
  "/static",
  "/museum",
  "/news",
]);

export default function AsciiRainMount() {
  const pathname = usePathname();
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const loud = LOUD_PATHS.has(normalized);
  return <AsciiRain dim={loud ? 0.65 : 0.12} apparitions={loud} />;
}
