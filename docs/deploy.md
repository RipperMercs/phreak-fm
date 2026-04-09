# phreak.fm Deployment Guide

## Prerequisites

- Cloudflare account with phreak.fm domain
- Google Workspace configured for email
- Node.js 18+
- Wrangler CLI (`npm install -g wrangler`)

## 1. DNS Setup

1. Add phreak.fm to Cloudflare DNS
2. Configure MX records for Google Workspace (do NOT use Cloudflare Email Routing)
3. Add required Google Workspace TXT records for SPF, DKIM, DMARC

## 2. Cloudflare KV Namespaces

Create two KV namespaces:

```bash
wrangler kv:namespace create "FEED_KV"
wrangler kv:namespace create "CONTENT_KV"
```

Copy the IDs into `worker/wrangler.toml` and `.env`.

## 3. Cloudflare R2 Buckets

```bash
wrangler r2 bucket create phreak-audio
wrangler r2 bucket create phreak-media
```

## 4. Deploy the Worker

```bash
cd worker
npm install
wrangler deploy
```

Verify the cron trigger is registered:

```bash
wrangler deployments list
```

## 5. Create Cloudflare Pages Project

1. Go to Cloudflare Dashboard, Pages
2. Create project: `phreak-fm`
3. Connect to GitHub repo `RipperMercs/phreak-fm`
4. Build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Build output: `.next`
   - Root directory: `/`
5. Set environment variables:
   - `NEXT_PUBLIC_SITE_DOMAIN=phreak.fm`
   - `NEXT_PUBLIC_SITE_NAME=phreak.fm`
   - `NEXT_PUBLIC_API_URL=https://phreak-api.<your-subdomain>.workers.dev`

## 6. Custom Domain

1. In the Pages project settings, add custom domain: `phreak.fm`
2. Cloudflare will automatically configure the DNS CNAME

## 7. Verify Deployment

1. Visit https://phreak.fm and verify the homepage loads
2. Check /signals, /frequencies, /static landing pages
3. Check /news (will be empty until cron fires)
4. Check /about, /search, /submit
5. Verify /robots.txt, /sitemap.xml, /llms.txt
6. Check that the Worker cron fires: `wrangler tail` and wait for the 30-min mark
7. After cron fires, verify /news populates with items

## 8. Post-Deploy

1. Submit sitemap to Google Search Console: https://phreak.fm/sitemap.xml
2. Write the dedication page content for Dirk
3. Write 3 to 5 real articles before announcing
4. Add phreak.fm to TerminalFeed/TensorFeed/VR.org/DramaRadar cross-link footers
5. Wait for 20+ articles and 45+ days before AdSense application
