// Ephemera: a curio cabinet of artifacts from the signal underground, wider
// than the DOS Virus Museum. Entries live in content/ephemera.json and are
// appended over time. Text-based exhibits carry hand-drawn ASCII until a real
// scan exists; set `image` to a path when one arrives (the payphone is first).

import ephemeraData from "../../content/ephemera.json";

export interface EphemeraLink {
  href: string;
  label: string;
}

export interface Exhibit {
  id: string; // anchor on /ephemera
  title: string;
  category: string;
  caption: string;
  year?: string;
  source?: string;
  image?: string | null; // path to a scan, when one exists
  ascii?: string | null; // hand-drawn stand-in until then
  link?: EphemeraLink | null;
}

const EXHIBITS = ephemeraData as unknown as Exhibit[];

// Display order for the categories. Anything not listed falls to the end.
const CATEGORY_ORDER = [
  "Payphones",
  "Schematics",
  "Hardware",
  "BBS Art",
  "Cracktros",
  "Zines",
  "Flyers",
  "Tape",
  "Signals",
];

export function getEphemeraByCategory(): [string, Exhibit[]][] {
  const map = new Map<string, Exhibit[]>();
  for (const e of EXHIBITS) {
    const bucket = map.get(e.category);
    if (bucket) bucket.push(e);
    else map.set(e.category, [e]);
  }
  const ordered: [string, Exhibit[]][] = [];
  for (const category of CATEGORY_ORDER) {
    const items = map.get(category);
    if (items) ordered.push([category, items]);
  }
  for (const [category, items] of Array.from(map.entries())) {
    if (!CATEGORY_ORDER.includes(category)) ordered.push([category, items]);
  }
  return ordered;
}
