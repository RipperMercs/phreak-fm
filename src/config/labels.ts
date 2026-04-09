import { LabelData } from "@/types";

export const labels: LabelData[] = [
  { slug: "warp", name: "Warp", bio: "", links: {}, featured: false },
  { slug: "ghost-box", name: "Ghost Box", bio: "", links: {}, featured: false },
  { slug: "modern-love", name: "Modern Love", bio: "", links: {}, featured: false },
  { slug: "hyperdub", name: "Hyperdub", bio: "", links: {}, featured: false },
  { slug: "pan", name: "PAN", bio: "", links: {}, featured: false },
  { slug: "editions-mego", name: "Editions Mego", bio: "", links: {}, featured: false },
  { slug: "kranky", name: "Kranky", bio: "", links: {}, featured: false },
  { slug: "ninja-tune", name: "Ninja Tune", bio: "", links: {}, featured: false },
  { slug: "erased-tapes", name: "Erased Tapes", bio: "", links: {}, featured: false },
  { slug: "touch", name: "Touch", bio: "", links: {}, featured: false },
  { slug: "room40", name: "Room40", bio: "", links: {}, featured: false },
  { slug: "12k", name: "12k", bio: "", links: {}, featured: false },
  { slug: "shelter-press", name: "Shelter Press", bio: "", links: {}, featured: false },
  { slug: "bedrock", name: "Bedrock", bio: "", links: {}, featured: false },
  { slug: "global-underground", name: "Global Underground", bio: "", links: {}, featured: false },
  { slug: "renaissance", name: "Renaissance", bio: "", links: {}, featured: false },
  { slug: "perfecto", name: "Perfecto", bio: "", links: {}, featured: false },
  { slug: "hunya-munya-records", name: "Hunya Munya Records", bio: "", links: {}, featured: true },
];

export function getLabel(slug: string): LabelData | undefined {
  return labels.find((l) => l.slug === slug);
}

export function getAllLabels(): LabelData[] {
  return labels;
}

export function getFeaturedLabels(): LabelData[] {
  return labels.filter((l) => l.featured);
}
