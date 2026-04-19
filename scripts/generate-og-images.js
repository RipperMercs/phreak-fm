/**
 * generate-og-images.js
 *
 * Generates Open Graph images for all articles and key pages at build time.
 * Uses @vercel/og-compatible approach with canvas (via satori + resvg) to
 * produce 1200x630 PNG images in /public/og/.
 *
 * Since phreak.fm uses `output: "export"`, OG images must be pre-generated
 * rather than rendered on-demand via route handlers.
 *
 * Run: node scripts/generate-og-images.js
 * Requires: npm install -D canvas (or satori + @resvg/resvg-js)
 *
 * For now, this generates simple branded SVG-based images that get
 * converted to a format browsers can use for social cards.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "public", "og");

const VERTICALS = ["signals", "frequencies", "static"];

const VERTICAL_COLORS = {
  signals: { bg: "#0f1a1a", accent: "#2dd4bf", label: "SIGNALS" },
  frequencies: { bg: "#1a0f1a", accent: "#a78bfa", label: "FREQUENCIES" },
  static: { bg: "#1a1a0f", accent: "#fbbf24", label: "STATIC" },
};

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncateTitle(title, maxLen = 80) {
  if (title.length <= maxLen) return title;
  return title.slice(0, maxLen - 3) + "...";
}

function wrapText(text, maxCharsPerLine = 35) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length > maxCharsPerLine && currentLine) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + " " + word : word;
    }
  }
  if (currentLine.trim()) lines.push(currentLine.trim());
  return lines.slice(0, 4); // Max 4 lines
}

function generateArticleSvg(title, vertical, author, date) {
  const colors = VERTICAL_COLORS[vertical] || VERTICAL_COLORS.signals;
  const lines = wrapText(truncateTitle(title, 120), 32);
  const titleY = 200;
  const lineHeight = 56;

  const titleLines = lines
    .map(
      (line, i) =>
        `<text x="60" y="${titleY + i * lineHeight}" font-family="monospace" font-size="42" font-weight="bold" fill="#fafafa">${escapeHtml(line)}</text>`
    )
    .join("\n    ");

  const metaY = titleY + lines.length * lineHeight + 40;

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${colors.accent}" stroke-width="0.3" opacity="0.15"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.bg}"/>
      <stop offset="100%" stop-color="#151518"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#fade)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Accent bar -->
  <rect x="0" y="0" width="6" height="630" fill="${colors.accent}"/>

  <!-- Vertical label -->
  <text x="60" y="100" font-family="monospace" font-size="14" fill="${colors.accent}" letter-spacing="4">${colors.label}</text>
  <line x1="60" y1="115" x2="300" y2="115" stroke="${colors.accent}" stroke-width="1" opacity="0.4"/>

  <!-- Title -->
  ${titleLines}

  <!-- Meta -->
  <text x="60" y="${metaY}" font-family="monospace" font-size="16" fill="#71717a">${escapeHtml(author || "phreak.fm")} :: ${escapeHtml(date || "")}</text>

  <!-- Site branding -->
  <text x="60" y="580" font-family="monospace" font-size="18" fill="#71717a">phreak</text>
  <text x="131" y="580" font-family="monospace" font-size="18" fill="${colors.accent}">.fm</text>

  <!-- Decorative code fragments -->
  <text x="900" y="80" font-family="monospace" font-size="11" fill="${colors.accent}" opacity="0.12">0x2600</text>
  <text x="1020" y="150" font-family="monospace" font-size="11" fill="${colors.accent}" opacity="0.08">ATDT</text>
  <text x="950" y="400" font-family="monospace" font-size="11" fill="${colors.accent}" opacity="0.10">trunk.seize()</text>
  <text x="850" y="520" font-family="monospace" font-size="11" fill="${colors.accent}" opacity="0.06">signal.bend()</text>
  <text x="1050" y="300" font-family="monospace" font-size="11" fill="${colors.accent}" opacity="0.09">CONNECT 2400</text>
</svg>`;
}

function generateDefaultSvg() {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2dd4bf" stroke-width="0.3" opacity="0.15"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#151518"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="0" y="0" width="6" height="630" fill="#2dd4bf"/>

  <text x="60" y="260" font-family="monospace" font-size="72" font-weight="bold" fill="#fafafa">phreak</text>
  <text x="390" y="260" font-family="monospace" font-size="72" font-weight="bold" fill="#2dd4bf">.fm</text>

  <text x="60" y="320" font-family="monospace" font-size="20" fill="#71717a">signals, frequencies, and the people who bend them</text>

  <text x="60" y="400" font-family="monospace" font-size="14" fill="#2dd4bf" opacity="0.6">Hacker culture. Electronic music. Tech news.</text>

  <text x="900" y="80" font-family="monospace" font-size="11" fill="#2dd4bf" opacity="0.12">0x2600</text>
  <text x="1020" y="150" font-family="monospace" font-size="11" fill="#2dd4bf" opacity="0.08">ATDT</text>
  <text x="950" y="450" font-family="monospace" font-size="11" fill="#2dd4bf" opacity="0.10">trunk.seize()</text>
  <text x="1050" y="300" font-family="monospace" font-size="11" fill="#2dd4bf" opacity="0.09">CONNECT 2400</text>
</svg>`;
}

// Authors mapping (simplified from src/lib/authors.ts)
const AUTHORS = {
  ripper: "Ripper",
  nullbyte: "nullbyte",
  synth_error: "synth_error",
  deadpacket: "deadpacket",
  the_curator: "the_curator",
};

function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate default site OG image
  fs.writeFileSync(path.join(OUTPUT_DIR, "default.svg"), generateDefaultSvg());
  console.log("Generated: /og/default.svg");

  let count = 0;

  for (const vertical of VERTICALS) {
    const verticalDir = path.join(CONTENT_DIR, vertical);
    if (!fs.existsSync(verticalDir)) continue;

    const ogVerticalDir = path.join(OUTPUT_DIR, vertical);
    if (!fs.existsSync(ogVerticalDir)) {
      fs.mkdirSync(ogVerticalDir, { recursive: true });
    }

    const files = fs.readdirSync(verticalDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(verticalDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);

      const slug = file.replace(/\.mdx$/, "");
      const author = AUTHORS[data.author] || data.author || "phreak.fm";
      const date = data.publishedAt
        ? new Date(data.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";

      const svg = generateArticleSvg(data.title || slug, vertical, author, date);
      fs.writeFileSync(path.join(ogVerticalDir, `${slug}.svg`), svg);
      count++;
    }
  }

  // Generate museum OG
  const museumDir = path.join(CONTENT_DIR, "museum", "specimens");
  if (fs.existsSync(museumDir)) {
    const museumOgDir = path.join(OUTPUT_DIR, "museum");
    if (!fs.existsSync(museumOgDir)) {
      fs.mkdirSync(museumOgDir, { recursive: true });
    }

    const files = fs.readdirSync(museumDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const filePath = path.join(museumDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);

      const slug = file.replace(/\.mdx$/, "");
      const svg = generateArticleSvg(
        data.name || slug,
        "signals",
        "the_curator",
        data.yearDiscovered ? `Discovered ${data.yearDiscovered}` : ""
      );
      fs.writeFileSync(path.join(museumOgDir, `${slug}.svg`), svg);
      count++;
    }
  }

  console.log(`Generated ${count} article OG images + 1 default`);
  console.log("OG images saved to /public/og/");
}

main();
