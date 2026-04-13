/**
 * Generates simple placeholder PNG files for each museum specimen that
 * does not yet have a hero image. Pure Node, no external deps.
 *
 * Usage: node scripts/generate-museum-placeholders.js
 *
 * Reads /content/museum/specimens/*.mdx, finds the slug, and writes
 * /public/museum/[slug]/placeholder.png if it does not already exist.
 */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.resolve(__dirname, "..");
const specimensDir = path.join(root, "content", "museum", "specimens");
const publicMuseumDir = path.join(root, "public", "museum");

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makePng(width, height, rgb) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihd = Buffer.alloc(13);
  ihd.writeUInt32BE(width, 0);
  ihd.writeUInt32BE(height, 4);
  ihd[8] = 8;
  ihd[9] = 2;
  ihd[10] = 0;
  ihd[11] = 0;
  ihd[12] = 0;
  const ihdr = chunk("IHDR", ihd);

  const rowLen = width * 3 + 1;
  const raw = Buffer.alloc(rowLen * height);
  for (let y = 0; y < height; y++) {
    raw[y * rowLen] = 0;
    for (let x = 0; x < width; x++) {
      const off = y * rowLen + 1 + x * 3;
      raw[off] = rgb[0];
      raw[off + 1] = rgb[1];
      raw[off + 2] = rgb[2];
    }
  }
  const idat = chunk("IDAT", zlib.deflateSync(raw));
  const iend = chunk("IEND", Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

function getSlugs() {
  if (!fs.existsSync(specimensDir)) return [];
  return fs
    .readdirSync(specimensDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  ensureDir(publicMuseumDir);
  const slugs = getSlugs();
  let written = 0;
  const png = makePng(400, 300, [28, 28, 32]);
  for (const slug of slugs) {
    const dir = path.join(publicMuseumDir, slug);
    ensureDir(dir);
    const out = path.join(dir, "placeholder.png");
    if (!fs.existsSync(out)) {
      fs.writeFileSync(out, png);
      written += 1;
    }
  }
  console.log(`museum placeholders: ${written} new, ${slugs.length} total specimens`);
}

main();
