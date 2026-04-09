import { Env, FeedItem, Vertical } from "./types";
import { ingestFeeds } from "./ingestor";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

function error(message: string, status: number = 400): Response {
  return json({ error: message }, status);
}

async function getItemsFromIndex(
  env: Env,
  indexKey: string,
  limit: number
): Promise<FeedItem[]> {
  const indexStr = await env.FEED_KV.get(indexKey);
  if (!indexStr) return [];

  const ids: string[] = JSON.parse(indexStr);
  const items: FeedItem[] = [];

  for (const id of ids.slice(0, limit)) {
    const itemStr = await env.FEED_KV.get(`feed:item:${id}`);
    if (itemStr) {
      items.push(JSON.parse(itemStr));
    }
  }

  return items;
}

async function handleFeedLatest(
  env: Env,
  url: URL
): Promise<Response> {
  const vertical = url.searchParams.get("vertical") as Vertical | null;
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);

  const indexKey = vertical
    ? `feed:index:${vertical}`
    : "feed:index:latest";

  const items = await getItemsFromIndex(env, indexKey, limit);
  return json(items);
}

async function handleFeedSource(
  env: Env,
  sourceSlug: string,
  url: URL
): Promise<Response> {
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);

  // Get all items and filter by source
  const items = await getItemsFromIndex(env, "feed:index:latest", 500);
  const filtered = items
    .filter((i) => i.sourceSlug === sourceSlug)
    .slice(0, limit);

  return json(filtered);
}

async function handleFeedVertical(
  env: Env,
  vertical: string,
  url: URL
): Promise<Response> {
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
  const items = await getItemsFromIndex(env, `feed:index:${vertical}`, limit);
  return json(items);
}

async function handleArtist(
  env: Env,
  artistSlug: string,
  url: URL
): Promise<Response> {
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
  const artistName = artistSlug.replace(/-/g, " ");

  // Search all frequency items for artist name mentions
  const items = await getItemsFromIndex(env, "feed:index:frequencies", 500);
  const matches = items
    .filter((i) => {
      const searchText = `${i.title} ${i.excerpt}`.toLowerCase();
      return searchText.includes(artistName.toLowerCase());
    })
    .slice(0, limit);

  return json(matches);
}

async function handleLabel(
  env: Env,
  labelSlug: string,
  url: URL
): Promise<Response> {
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
  const labelName = labelSlug.replace(/-/g, " ");

  const items = await getItemsFromIndex(env, "feed:index:frequencies", 500);
  const matches = items
    .filter((i) => {
      const searchText = `${i.title} ${i.excerpt}`.toLowerCase();
      return searchText.includes(labelName.toLowerCase());
    })
    .slice(0, limit);

  return json(matches);
}

async function handleReleasesUpcoming(env: Env): Promise<Response> {
  // In V1, return static data. In V2, this could pull from KV.
  return json([]);
}

async function handlePirateSignalLatest(
  env: Env,
  url: URL
): Promise<Response> {
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
  const items = await getItemsFromIndex(env, "feed:index:frequencies", 500);
  // Filter for items mentioning pirate signal related terms
  return json(items.slice(0, limit));
}

async function checkRateLimit(
  env: Env,
  ip: string
): Promise<boolean> {
  const key = `ratelimit:submit:${ip}`;
  const current = await env.CONTENT_KV.get(key);
  const count = current ? parseInt(current) : 0;

  if (count >= 3) return false;

  await env.CONTENT_KV.put(key, String(count + 1), {
    expirationTtl: 3600, // 1 hour window
  });
  return true;
}

async function handleSubmit(
  env: Env,
  request: Request
): Promise<Response> {
  // Rate limiting: 3 submissions per IP per hour
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const allowed = await checkRateLimit(env, ip);
  if (!allowed) {
    return error("Rate limit exceeded. Try again in an hour.", 429);
  }

  try {
    const body = await request.json() as Record<string, unknown>;
    const { type, title, body: storyBody, email, credit, sources, embedUrl, embedType } = body;

    if (!title || !type) {
      return error("Title and type are required.");
    }

    const id = crypto.randomUUID();
    const timestamp = Date.now();
    const submission = {
      id,
      type,
      title,
      body: storyBody,
      email: email || null,
      credit: credit || null,
      sources: sources || null,
      embedUrl: embedUrl || null,
      embedType: embedType || null,
      submittedAt: new Date().toISOString(),
      ip,
      triageStatus: "pending",
    };

    await env.CONTENT_KV.put(
      `submission:${timestamp}:${id}`,
      JSON.stringify(submission)
      // No expiration: keep submissions indefinitely per editorial workflow
    );

    // Send notification email if configured
    // (email relay configured via env vars, not implemented in V1 worker code)

    return json({ success: true, id });
  } catch {
    return error("Invalid request body.", 400);
  }
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Route matching
    if (request.method === "GET") {
      if (path === "/api/feed/latest") {
        return handleFeedLatest(env, url);
      }

      const sourceMatch = path.match(/^\/api\/feed\/source\/(.+)$/);
      if (sourceMatch) {
        return handleFeedSource(env, sourceMatch[1], url);
      }

      const verticalMatch = path.match(/^\/api\/feed\/vertical\/(.+)$/);
      if (verticalMatch) {
        return handleFeedVertical(env, verticalMatch[1], url);
      }

      const artistMatch = path.match(/^\/api\/artist\/(.+)$/);
      if (artistMatch) {
        return handleArtist(env, decodeURIComponent(artistMatch[1]), url);
      }

      const labelMatch = path.match(/^\/api\/label\/(.+)$/);
      if (labelMatch) {
        return handleLabel(env, decodeURIComponent(labelMatch[1]), url);
      }

      if (path === "/api/releases/upcoming") {
        return handleReleasesUpcoming(env);
      }

      if (path === "/api/pirate-signal/latest") {
        return handlePirateSignalLatest(env, url);
      }
    }

    if (request.method === "POST") {
      if (path === "/api/submit") {
        return handleSubmit(env, request);
      }
    }

    return error("Not found", 404);
  },

  async scheduled(
    _event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(
      ingestFeeds(env).then((result) => {
        console.log(
          `Feed ingestion complete: ${result.total} new items, ${result.errors} feed errors`
        );
      })
    );
  },
};
