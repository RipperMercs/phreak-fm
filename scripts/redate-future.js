/**
 * One-shot date hygiene script.
 *
 * Walks /content recursively for .mdx files, finds any with a publishedAt
 * value in the future relative to the cutoff date, and redistributes those
 * dates across a window in the past using a deterministic slug hash. This
 * exists because a large batch of articles were originally drafted with
 * placeholder future dates intended for a phased rollout that never
 * happened, and those future dates were pinning the same items to the top
 * of the homepage chronological listing forever.
 *
 * Usage: node scripts/redate-future.js
 *
 * Idempotent: re-running on a clean tree is a no-op (no future dates to fix).
 */

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const CUTOFF = new Date("2026-04-18T23:59:59Z");
const WINDOW_END = new Date("2026-04-11T00:00:00Z");
const WINDOW_START = new Date("2025-10-01T00:00:00Z");
const WINDOW_DAYS = Math.floor(
  (WINDOW_END.getTime() - WINDOW_START.getTime()) / (1000 * 60 * 60 * 24),
);

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (entry.name.endsWith(".mdx")) files.push(p);
  }
  return files;
}

const files = walk(CONTENT_DIR);
let changed = 0;
const updates = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const m = content.match(/^publishedAt:\s*"([^"]+)"/m);
  if (!m) continue;
  const original = new Date(m[1]);
  if (original <= CUTOFF) continue;

  const slug = path.basename(file, ".mdx");
  const dayOffset = hashString(slug) % WINDOW_DAYS;
  const hour = hashString(slug + ":h") % 24;
  const minute = hashString(slug + ":m") % 60;
  const newDate = new Date(WINDOW_START.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  newDate.setUTCHours(hour, minute, 0, 0);
  const newDateStr = newDate.toISOString().replace(/\.000Z$/, "Z");

  const newContent = content.replace(m[0], `publishedAt: "${newDateStr}"`);
  fs.writeFileSync(file, newContent);
  updates.push({ slug, from: m[1], to: newDateStr });
  changed++;
}

updates.sort((a, b) => a.to.localeCompare(b.to));
for (const u of updates) {
  console.log(`${u.slug}: ${u.from} -> ${u.to}`);
}
console.log(`\n${changed} file${changed === 1 ? "" : "s"} updated`);
