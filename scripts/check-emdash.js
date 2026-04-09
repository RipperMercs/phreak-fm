/**
 * CI-style check: fails the build if any em dash characters are found
 * in the codebase. This is a hard rule at phreak.fm.
 *
 * Checks for:
 * - Unicode em dash (U+2014)
 * - Unicode en dash (U+2013)
 * - HTML entity &mdash;
 * - HTML entity &ndash;
 */

const { execSync } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const patterns = [
  "\u2014",      // em dash
  "\u2013",      // en dash
  "&mdash;",     // HTML em dash entity
  "&ndash;",     // HTML en dash entity
];

const extensions = "ts,tsx,mdx,md,json,css,html,txt,toml,yaml,yml";
const excludeDirs = "node_modules,.next,.git,out,build";

let found = false;

for (const pattern of patterns) {
  try {
    const cmd = process.platform === "win32"
      ? `findstr /S /R /C:"${pattern === "\u2014" || pattern === "\u2013" ? pattern : pattern}" *.ts *.tsx *.mdx *.md *.json *.css`
      : `grep -r --include="*.{${extensions}}" --exclude-dir={${excludeDirs}} "${pattern}" "${rootDir}" || true`;

    // Use a cross-platform approach: read files with Node
    const { readdirSync, readFileSync, statSync } = require("fs");

    function walkDir(dir) {
      const entries = readdirSync(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        if (excludeDirs.split(",").some((d) => fullPath.includes(path.sep + d + path.sep) || fullPath.endsWith(path.sep + d))) continue;

        try {
          const stat = statSync(fullPath);
          if (stat.isDirectory()) {
            walkDir(fullPath);
          } else if (extensions.split(",").some((ext) => fullPath.endsWith("." + ext))) {
            const content = readFileSync(fullPath, "utf8");
            if (content.includes(pattern)) {
              const lines = content.split("\n");
              for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes(pattern)) {
                  console.error(`EMDASH FOUND: ${fullPath}:${i + 1}`);
                  console.error(`  ${lines[i].trim()}`);
                  found = true;
                }
              }
            }
          }
        } catch {
          // Skip unreadable files
        }
      }
    }

    walkDir(rootDir);
    break; // Only need to walk once, checking all patterns
  } catch {
    // Continue
  }
}

// Check remaining patterns if we walked above
const { readdirSync, readFileSync, statSync } = require("fs");

function checkPatterns(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const excl = excludeDirs.split(",");
    if (excl.some((d) => fullPath.includes(path.sep + d + path.sep) || fullPath.endsWith(path.sep + d))) continue;

    try {
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        checkPatterns(fullPath);
      } else if (extensions.split(",").some((ext) => fullPath.endsWith("." + ext))) {
        const content = readFileSync(fullPath, "utf8");
        for (const pattern of patterns) {
          if (content.includes(pattern)) {
            const lines = content.split("\n");
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].includes(pattern)) {
                console.error(`EMDASH FOUND: ${fullPath}:${i + 1}`);
                console.error(`  ${lines[i].trim()}`);
                found = true;
              }
            }
          }
        }
      }
    } catch {
      // Skip
    }
  }
}

// Re-check to ensure all patterns are covered
found = false;
checkPatterns(rootDir);

if (found) {
  console.error("\nBuild failed: em dashes found in codebase. Remove them.");
  process.exit(1);
} else {
  console.log("Em dash check passed: zero em dashes found.");
}
