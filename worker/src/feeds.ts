import { FeedSource } from "./types";

export const feedSources: FeedSource[] = [
  // Signals
  { name: "Krebs on Security", slug: "krebs-on-security", url: "https://krebsonsecurity.com/feed/", vertical: "signals", trustTier: 1 },
  { name: "The Record", slug: "the-record", url: "https://therecord.media/feed", vertical: "signals", trustTier: 1 },
  { name: "BleepingComputer", slug: "bleepingcomputer", url: "https://www.bleepingcomputer.com/feed/", vertical: "signals", trustTier: 1 },
  { name: "The Hacker News", slug: "the-hacker-news", url: "https://feeds.feedburner.com/TheHackersNews", vertical: "signals", trustTier: 2 },
  { name: "DarkReading", slug: "darkreading", url: "https://www.darkreading.com/rss.xml", vertical: "signals", trustTier: 2 },
  { name: "SecurityWeek", slug: "securityweek", url: "https://www.securityweek.com/feed/", vertical: "signals", trustTier: 2 },
  { name: "Risky Business", slug: "risky-business", url: "https://risky.biz/feeds/risky-business/", vertical: "signals", trustTier: 1 },
  { name: "Ars Technica Security", slug: "ars-technica-security", url: "https://feeds.arstechnica.com/arstechnica/security", vertical: "signals", trustTier: 1 },
  { name: "Wired Security", slug: "wired-security", url: "https://www.wired.com/feed/tag/security/latest/rss", vertical: "signals", trustTier: 1 },
  { name: "404 Media Security", slug: "404-media-security", url: "https://www.404media.co/tag/security/rss/", vertical: "signals", trustTier: 1 },
  { name: "SANS ISC", slug: "sans-isc", url: "https://isc.sans.edu/rssfeed.xml", vertical: "signals", trustTier: 1 },

  // Frequencies
  { name: "Resident Advisor", slug: "resident-advisor", url: "https://ra.co/xml/news.xml", vertical: "frequencies", trustTier: 1 },
  { name: "Mixmag", slug: "mixmag", url: "https://mixmag.net/feed", vertical: "frequencies", trustTier: 1 },
  { name: "DJ Mag", slug: "dj-mag", url: "https://djmag.com/feed", vertical: "frequencies", trustTier: 2 },
  { name: "Data Transmission", slug: "data-transmission", url: "https://datatransmission.co/feed/", vertical: "frequencies", trustTier: 2 },
  { name: "Boomkat", slug: "boomkat", url: "https://boomkat.com/feed", vertical: "frequencies", trustTier: 1 },
  { name: "Pitchfork Electronic", slug: "pitchfork-electronic", url: "https://pitchfork.com/feed/feed-electronic/rss", vertical: "frequencies", trustTier: 1 },
  { name: "FACT Magazine", slug: "fact-magazine", url: "https://www.factmag.com/feed/", vertical: "frequencies", trustTier: 1 },
  { name: "The Quietus", slug: "the-quietus", url: "https://thequietus.com/feed", vertical: "frequencies", trustTier: 1 },
  { name: "Bandcamp Daily", slug: "bandcamp-daily", url: "https://daily.bandcamp.com/feed", vertical: "frequencies", trustTier: 1 },
  { name: "XLR8R", slug: "xlr8r", url: "https://xlr8r.com/feed/", vertical: "frequencies", trustTier: 2 },
  { name: "A Closer Listen", slug: "a-closer-listen", url: "https://acloserlisten.com/feed/", vertical: "frequencies", trustTier: 2 },
  { name: "Attack Magazine", slug: "attack-magazine", url: "https://www.attackmagazine.com/feed/", vertical: "frequencies", trustTier: 2 },
  { name: "Crack Magazine", slug: "crack-magazine", url: "https://crackmagazine.net/feed/", vertical: "frequencies", trustTier: 2 },

  // Static
  { name: "404 Media", slug: "404-media", url: "https://www.404media.co/rss/", vertical: "static", trustTier: 1 },
  { name: "The Verge", slug: "the-verge", url: "https://www.theverge.com/rss/index.xml", vertical: "static", trustTier: 2 },
  { name: "Ars Technica", slug: "ars-technica", url: "https://feeds.arstechnica.com/arstechnica/index", vertical: "static", trustTier: 1 },
  { name: "Hacker News", slug: "hacker-news", url: "https://hnrss.org/frontpage", vertical: "static", trustTier: 2 },
  { name: "Waxy.org", slug: "waxy", url: "https://waxy.org/feed/", vertical: "static", trustTier: 1 },
  { name: "Kottke.org", slug: "kottke", url: "https://feeds.kottke.org/main", vertical: "static", trustTier: 1 },
  { name: "Rest of World", slug: "rest-of-world", url: "https://restofworld.org/feed/latest/", vertical: "static", trustTier: 1 },
  { name: "The Markup", slug: "the-markup", url: "https://themarkup.org/feeds/rss.xml", vertical: "static", trustTier: 1 },
  { name: "MIT Technology Review", slug: "mit-tech-review", url: "https://www.technologyreview.com/feed/", vertical: "static", trustTier: 1 },
  { name: "Low-Tech Magazine", slug: "low-tech-magazine", url: "https://solar.lowtechmagazine.com/feeds/all-en.atom.xml", vertical: "static", trustTier: 2 },
];
