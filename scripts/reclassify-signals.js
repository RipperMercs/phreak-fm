/**
 * One-shot script to reclassify signals article pillars.
 *
 * Sets the pillar frontmatter field on each /content/signals/*.mdx file to
 * one of the six final topics: phreaker-elders-and-hacker-culture,
 * famous-breaches, nation-state-operations, zero-days-and-exploit-chains,
 * viruses-and-worms, crypto-wars.
 *
 * Idempotent: re-running on a clean tree applies the same mapping again.
 *
 * Usage: node scripts/reclassify-signals.js
 */

const fs = require("fs");
const path = require("path");

const SIGNALS_DIR = path.join(__dirname, "..", "content", "signals");

const MAP = {
  // Phreaker Elders & Hacker Culture (broad culture, people, scenes)
  "2600hz-welcome-post": "phreaker-elders-and-hacker-culture",
  "anonymous-origins": "phreaker-elders-and-hacker-culture",
  "aphex-twin-spectrograms": "phreaker-elders-and-hacker-culture",
  "bernie-s-red-box": "phreaker-elders-and-hacker-culture",
  "blue-box-technical-deep-dive": "phreaker-elders-and-hacker-culture",
  "chaos-computer-club": "phreaker-elders-and-hacker-culture",
  "daphne-oram": "phreaker-elders-and-hacker-culture",
  "def-con-history": "phreaker-elders-and-hacker-culture",
  "delia-derbyshire": "phreaker-elders-and-hacker-culture",
  "emmanuel-goldstein-2600-editor": "phreaker-elders-and-hacker-culture",
  "hackers-the-movie": "phreaker-elders-and-hacker-culture",
  "joe-engressia-joybubbles": "phreaker-elders-and-hacker-culture",
  "john-draper-captain-crunch": "phreaker-elders-and-hacker-culture",
  "jonathan-james-c0mrade": "phreaker-elders-and-hacker-culture",
  "kevin-lee-poulsen-kiis-fm": "phreaker-elders-and-hacker-culture",
  "kevin-mitnick": "phreaker-elders-and-hacker-culture",
  "kevin-poulsen-dark-dante": "phreaker-elders-and-hacker-culture",
  "kim-zetter-stuxnet-journalist": "phreaker-elders-and-hacker-culture",
  "kraftwerk-computer-world": "phreaker-elders-and-hacker-culture",
  "mark-abene-phiber-optik": "phreaker-elders-and-hacker-culture",
  "mod-vs-lod": "phreaker-elders-and-hacker-culture",
  "mudge-zatko-l0pht-to-twitter": "phreaker-elders-and-hacker-culture",
  "phrack-magazine": "phreaker-elders-and-hacker-culture",
  "susan-thunder": "phreaker-elders-and-hacker-culture",
  "tb-303-acid-house": "phreaker-elders-and-hacker-culture",
  "the-demoscene-as-hacking": "phreaker-elders-and-hacker-culture",
  "the-hacker-manifesto": "phreaker-elders-and-hacker-culture",
  "the-jargon-file": "phreaker-elders-and-hacker-culture",
  "the-last-phone-phreaker": "phreaker-elders-and-hacker-culture",
  "the-mentor-profile": "phreaker-elders-and-hacker-culture",
  "tsutomu-shimomura": "phreaker-elders-and-hacker-culture",
  "wardriving-wifi-cartography": "phreaker-elders-and-hacker-culture",
  "wozniak-jobs-blue-box": "phreaker-elders-and-hacker-culture",

  // Famous Breaches (named events, intrusions, the warnings)
  "the-414s": "famous-breaches",
  "operation-sundevil": "famous-breaches",
  "mafiaboy-february-2000": "famous-breaches",
  "l0pht-congress": "famous-breaches",
  "solar-sunrise": "famous-breaches",
  "clifford-stoll-cuckoos-egg": "famous-breaches",
  "marcus-hutchins-wannacry-killswitch": "famous-breaches",

  // Nation State Operations
  "stuxnet-olympic-games": "nation-state-operations",
  "moonlight-maze": "nation-state-operations",
  "karl-koch-hagbard": "nation-state-operations",

  // Zero Days & Exploit Chains
  "anatomy-of-a-zero-day": "zero-days-and-exploit-chains",
  "dan-kaminsky-dns-bug": "zero-days-and-exploit-chains",
  "cdc-back-orifice": "zero-days-and-exploit-chains",

  // Viruses & Worms (new topic)
  "elk-cloner-first-virus": "viruses-and-worms",
  "alvi-brothers-brain-virus": "viruses-and-worms",
  "morris-worm": "viruses-and-worms",
  "dark-avenger-bulgarian-scene": "viruses-and-worms",
  "robert-morris-worm-second-act": "viruses-and-worms",

  // Crypto Wars (new topic)
  "phil-zimmermann-pgp-crypto-wars": "crypto-wars",
  "tim-may-crypto-anarchist-manifesto": "crypto-wars",
  "cypherpunks-mailing-list": "crypto-wars",
  "jude-milhon-st-jude-cypherpunk": "crypto-wars",
};

const files = fs.readdirSync(SIGNALS_DIR).filter((f) => f.endsWith(".mdx"));
let changed = 0;
let unmapped = [];

for (const file of files) {
  const slug = file.replace(".mdx", "");
  const newPillar = MAP[slug];
  if (!newPillar) {
    unmapped.push(slug);
    continue;
  }
  const filePath = path.join(SIGNALS_DIR, file);
  const content = fs.readFileSync(filePath, "utf8");
  const pillarMatch = content.match(/^pillar:\s*"?([^"\n]+)"?$/m);
  if (!pillarMatch) {
    console.log(`SKIP no pillar field: ${slug}`);
    continue;
  }
  const currentPillar = pillarMatch[1].trim();
  if (currentPillar === newPillar) continue;
  const newContent = content.replace(
    /^pillar:\s*"?[^"\n]+"?$/m,
    `pillar: ${newPillar}`,
  );
  fs.writeFileSync(filePath, newContent);
  changed++;
  console.log(`${slug}: ${currentPillar} -> ${newPillar}`);
}

console.log(`\n${changed} files updated`);
if (unmapped.length > 0) {
  console.log(`\nUNMAPPED (no entry in MAP): ${unmapped.length}`);
  unmapped.forEach((s) => console.log(`  ${s}`));
}
