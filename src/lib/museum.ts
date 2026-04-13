import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Specimen, SpecimenFrontmatter } from "@/types/museum";

const specimensDir = path.join(process.cwd(), "content", "museum", "specimens");

export function getSpecimenSlugs(): string[] {
  if (!fs.existsSync(specimensDir)) return [];
  return fs
    .readdirSync(specimensDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function parseDiscoveredYear(value: string): number | undefined {
  if (!value) return undefined;
  const match = value.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : undefined;
}

export function getSpecimenBySlug(slug: string): Specimen | null {
  const filePath = path.join(specimensDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const frontmatter: SpecimenFrontmatter = {
    name: data.name ?? slug,
    slug: data.slug ?? slug,
    aliases: data.aliases ?? [],
    discovered: data.discovered ?? "unknown",
    discoveredYear: parseDiscoveredYear(String(data.discovered ?? "")),
    discoveredLocation: data.discoveredLocation ?? "unknown",
    firstReportedBy: data.firstReportedBy ?? "unknown",
    author: data.author ?? "unknown",
    authorSlug: data.authorSlug,
    authorNotes: data.authorNotes,
    family: data.family ?? "unknown",
    familySlug: data.familySlug ?? slugify(data.family ?? "unknown"),
    variants: data.variants ?? [],
    size: data.size ?? 0,
    platform: data.platform ?? "DOS",
    infectionVector: data.infectionVector ?? "unknown",
    payloadType: data.payloadType ?? [],
    trigger: data.trigger ?? "unknown",
    payloadDescription: data.payloadDescription ?? "",
    famousRating: data.famousRating ?? 3,
    aestheticRating: data.aestheticRating ?? 3,
    heroMedia: data.heroMedia ?? `/museum/${slug}/placeholder.png`,
    heroMediaType: data.heroMediaType ?? "png",
    heroMediaAlt: data.heroMediaAlt ?? `${data.name ?? slug} screenshot`,
    additionalMedia: data.additionalMedia ?? [],
    sources: data.sources ?? [],
    relatedArticles: data.relatedArticles ?? [],
    tags: data.tags ?? [],
    lastUpdated: data.lastUpdated ?? new Date().toISOString().slice(0, 10),
  };

  return { frontmatter, content };
}

export function getAllSpecimens(): Specimen[] {
  return getSpecimenSlugs()
    .map((slug) => getSpecimenBySlug(slug))
    .filter((s): s is Specimen => s !== null)
    .sort((a, b) => {
      const ay = a.frontmatter.discoveredYear ?? 9999;
      const by = b.frontmatter.discoveredYear ?? 9999;
      if (ay !== by) return ay - by;
      return a.frontmatter.name.localeCompare(b.frontmatter.name);
    });
}

export function getSpecimensByFamily(familySlug: string): Specimen[] {
  return getAllSpecimens().filter(
    (s) => s.frontmatter.familySlug === familySlug
  );
}

export function getSpecimensByYear(year: number): Specimen[] {
  return getAllSpecimens().filter(
    (s) => s.frontmatter.discoveredYear === year
  );
}

export function getSpecimensByAuthor(authorSlug: string): Specimen[] {
  return getAllSpecimens().filter(
    (s) => s.frontmatter.authorSlug === authorSlug
  );
}

export function getRelatedSpecimens(
  current: Specimen,
  limit = 6
): Specimen[] {
  const all = getAllSpecimens().filter(
    (s) => s.frontmatter.slug !== current.frontmatter.slug
  );

  const scored = all.map((s) => {
    let score = 0;
    if (s.frontmatter.familySlug === current.frontmatter.familySlug) score += 5;
    if (
      s.frontmatter.authorSlug &&
      s.frontmatter.authorSlug === current.frontmatter.authorSlug
    )
      score += 4;
    if (s.frontmatter.discoveredYear === current.frontmatter.discoveredYear)
      score += 2;
    const sharedPayloads = s.frontmatter.payloadType.filter((p) =>
      current.frontmatter.payloadType.includes(p)
    ).length;
    score += sharedPayloads;
    return { specimen: s, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.specimen);
}

export function getAllFamilies(): { slug: string; name: string; count: number }[] {
  const map = new Map<string, { name: string; count: number }>();
  for (const s of getAllSpecimens()) {
    const key = s.frontmatter.familySlug;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, { name: s.frontmatter.family, count: 1 });
    }
  }
  return Array.from(map.entries())
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllYears(): number[] {
  const set = new Set<number>();
  for (const s of getAllSpecimens()) {
    if (s.frontmatter.discoveredYear) set.add(s.frontmatter.discoveredYear);
  }
  return Array.from(set).sort((a, b) => a - b);
}

export function getAllSpecimenAuthors(): { slug: string; name: string; count: number }[] {
  const map = new Map<string, { name: string; count: number }>();
  for (const s of getAllSpecimens()) {
    if (!s.frontmatter.authorSlug) continue;
    const existing = map.get(s.frontmatter.authorSlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(s.frontmatter.authorSlug, {
        name: s.frontmatter.author,
        count: 1,
      });
    }
  }
  return Array.from(map.entries())
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllPayloadTypes(): string[] {
  const set = new Set<string>();
  for (const s of getAllSpecimens()) {
    for (const p of s.frontmatter.payloadType) set.add(p);
  }
  return Array.from(set).sort();
}

export function getAllPlatforms(): string[] {
  const set = new Set<string>();
  for (const s of getAllSpecimens()) set.add(s.frontmatter.platform);
  return Array.from(set).sort();
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
