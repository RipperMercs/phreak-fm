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
4. Set up Google Workspace aliases: hello@phreak.fm, tips@phreak.fm

## 2. Cloudflare KV Namespaces

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

## 4. Cloudflare Turnstile

1. Go to Cloudflare Dashboard, Turnstile
2. Create a site widget for phreak.fm
3. Copy site key and secret key into `.env`

## 5. Email Relay (for submission notifications)

1. Create a Resend or SendGrid account
2. Configure a sending domain or verify tips@phreak.fm
3. Copy the API endpoint and key into `.env`

## 6. Deploy the Worker

```bash
cd worker
npm install
wrangler deploy
```

Verify the cron trigger is registered:

```bash
wrangler deployments list
```

## 7. Create Cloudflare Pages Project

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
   - `NEXT_PUBLIC_DEFAULT_MODE=paper`
   - `NEXT_PUBLIC_API_URL=https://phreak-api.<your-subdomain>.workers.dev`

## 8. Custom Domain

1. In the Pages project settings, add custom domain: `phreak.fm`
2. Cloudflare will automatically configure the DNS CNAME

## 9. Verify Deployment

1. Visit https://phreak.fm and verify the homepage loads (paper mode)
2. Toggle to blueprint mode
3. Check /signals, /frequencies, /static landing pages
4. Check /frequencies/pirate-signal
5. Check /news (will be empty until cron fires)
6. Check /about, /search, /submit, /dedication
7. Verify /robots.txt, /sitemap.xml, /llms.txt
8. Test the 404 page (any non-existent URL)
9. Test submission forms end to end
10. Check Worker cron: `wrangler tail` and wait for the 30-min mark
11. After cron fires, verify /news populates with items

## 10. Post-Deploy

1. Submit sitemap to Google Search Console: https://phreak.fm/sitemap.xml
2. Write the dedication page content for Dirk
3. Add ProtonMail and Signal contacts to /submit/secure
4. Write 3 to 5 real articles before announcing
5. Write first real Pirate Signal post
6. Add phreak.fm to sibling site footer rotations
7. Set up @phreakfm X handle (do not launch bot in V1)
8. Review submission queue weekly
