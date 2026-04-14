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

export interface FeedSource {
  name: string;
  slug: string;
  url: string;
  vertical: Vertical;
  trustTier: TrustTier;
}

export interface Env {
  FEED_KV: KVNamespace;
  CONTENT_KV: KVNamespace;
  AUDIO_R2?: R2Bucket;
  MEDIA_R2?: R2Bucket;
  ENVIRONMENT: string;
}
