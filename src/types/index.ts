export type Vertical = "signals" | "frequencies" | "static";

export type TrustTier = 1 | 2 | 3;

export interface FeedItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceSlug: string;
  vertical: Vertical;
  publishedAt: number;
  excerpt: string;
  author?: string;
  tags: string[];
  imageUrl?: string;
  hash: string;
  trustTier: TrustTier;
}

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  vertical: Vertical;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  heroImage?: string;
  heroGrain?: boolean;
  tags: string[];
  pillar?: string;
  readingTimeMinutes: number;
  featured?: boolean;
  audioUrl?: string;
  artist?: string;
  label?: string;
  releaseYear?: number;
  rating?: number;
}

export interface Author {
  slug: string;
  displayName: string;
  avatar: string;
  bio: string;
  primaryVertical: Vertical;
  specialties: string[];
  twitter?: string;
  signature?: string;
}

export interface Release {
  artist: string;
  title: string;
  label: string;
  releaseDate: string;
  format: ("vinyl" | "cd" | "digital" | "cassette")[];
  catalogNumber?: string;
  preOrderUrl?: string;
  coverImage?: string;
  featured?: boolean;
}

export interface FeedSource {
  name: string;
  slug: string;
  url: string;
  vertical: Vertical;
  trustTier: TrustTier;
}

export interface ArtistData {
  slug: string;
  name: string;
  bio: string;
  imageUrl?: string;
  links: Record<string, string>;
  relatedArtists: string[];
  featured?: boolean;
}

export interface LabelData {
  slug: string;
  name: string;
  bio: string;
  imageUrl?: string;
  links: Record<string, string>;
  featured?: boolean;
}

export interface PillarData {
  slug: string;
  title: string;
  vertical: Vertical;
  description: string;
}
