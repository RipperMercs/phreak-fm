export type MediaType = "png" | "gif" | "mp4";

export interface MediaItem {
  url: string;
  type: MediaType;
  alt: string;
  caption?: string;
}

export interface Source {
  title: string;
  url?: string;
  citation: string;
}

export type PayloadType =
  | "visual"
  | "audio"
  | "destructive"
  | "prank"
  | "polymorphic"
  | "boot sector";

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface SpecimenFrontmatter {
  name: string;
  slug: string;
  aliases: string[];
  discovered: string;
  discoveredYear?: number;
  discoveredLocation: string;
  firstReportedBy: string;
  author: string;
  authorSlug?: string;
  authorNotes?: string;
  family: string;
  familySlug: string;
  variants: string[];
  size: number;
  platform: string;
  infectionVector: string;
  payloadType: PayloadType[];
  trigger: string;
  payloadDescription: string;
  famousRating: Rating;
  aestheticRating: Rating;
  heroMedia: string;
  heroMediaType: MediaType;
  heroMediaAlt: string;
  additionalMedia: MediaItem[];
  sources: Source[];
  relatedArticles: string[];
  tags: string[];
  lastUpdated: string;
}

export interface Specimen {
  frontmatter: SpecimenFrontmatter;
  content: string;
}
