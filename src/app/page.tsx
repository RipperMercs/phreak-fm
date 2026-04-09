import { getAllArticles } from "@/lib/mdx";
import { buildSiteJsonLd } from "@/lib/seo";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";
import { Ticker } from "@/components/Ticker";
import { SystemBar } from "@/components/SystemBar";
import { LiveFeed } from "@/components/LiveFeed";

const HACKER_QUOTES = [
  { text: "Information wants to be free.", author: "Stewart Brand" },
  { text: "The street finds its own uses for things.", author: "William Gibson" },
  { text: "We exist without skin color, without nationality, without religious bias.", author: "The Mentor, 1986" },
  { text: "I am a hacker, and this is my manifesto.", author: "The Conscience of a Hacker" },
  { text: "The phone company is a giant computer and we are just users.", author: "Captain Crunch" },
  { text: "We could take down the internet in 30 minutes.", author: "L0pht, Senate testimony, 1998" },
  { text: "Hackers are not criminals. Hackers build things.", author: "2600 Magazine" },
  { text: "Every system has a vulnerability. The question is whether you look for it.", author: "Kevin Mitnick" },
];

export default function Home() {
  const jsonLd = buildSiteJsonLd();
  const allArticles = getAllArticles();
  const featured = allArticles.find((a) => a.frontmatter.featured);
  const latest = allArticles.filter((a) => a !== featured).slice(0, 12);
  const randomQuote = HACKER_QUOTES[Math.floor(Math.random() * HACKER_QUOTES.length)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Scrolling headline ticker */}
      <Ticker articles={allArticles.slice(0, 8)} />

      <main className="max-w-content mx-auto px-4 sm:px-6">
        {/* System status bar */}
        <SystemBar articleCount={allArticles.length} feedCount={38} />

        {/* MOTD Banner */}
        <div className="border border-border bg-bg-surface p-4 my-6">
          <p className="text-xs text-text-muted mb-1">
            {'>'} MOTD :: message of the day
          </p>
          <p className="text-sm text-accent leading-relaxed">
            &quot;{randomQuote.text}&quot;
          </p>
          <p className="text-xs text-text-muted mt-1">
            {randomQuote.author}
          </p>
        </div>

        {/* ASCII Logo */}
        <header className="py-12 sm:py-16 border-b border-border">
          <h1 className="text-3xl sm:text-5xl text-text-bright leading-tight cursor-blink">
            phreak<span className="text-accent">.fm</span>
          </h1>
          <p className="text-text-muted text-sm mt-3">
            Hacker stories. Security narratives. Phreaker history.
            Electronic music for the people who listen at 3am.
          </p>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 lg:gap-8">
          {/* LEFT: Editorial feed */}
          <div>
            {/* Featured */}
            {featured && (
              <section className="py-6 border-b border-border">
                <p className="text-xs text-accent tracking-widest uppercase mb-3">
                  [FEATURED]
                </p>
                <Link
                  href={`/${featured.frontmatter.vertical}/${featured.frontmatter.slug}`}
                  className="group block"
                >
                  <h2 className="text-lg sm:text-xl text-text-bright group-hover:text-accent transition-colors leading-snug mb-2">
                    {featured.frontmatter.title}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed mb-2 font-body max-w-2xl">
                    {featured.frontmatter.excerpt}
                  </p>
                  <p className="text-xs text-text-muted">
                    by {getAuthor(featured.frontmatter.author)?.displayName} :: {formatDate(featured.frontmatter.publishedAt)} :: {featured.frontmatter.readingTimeMinutes} min read
                  </p>
                </Link>
              </section>
            )}

            {/* Article listing styled like BBS/terminal */}
            <section className="py-6">
              <p className="text-xs text-text-muted tracking-widest uppercase mb-4">
                {'>'} ls -la /archive/latest
              </p>
              <div className="space-y-0">
                {latest.map((article, i) => {
                  const sectionColors: Record<string, string> = {
                    signals: "text-signals",
                    frequencies: "text-frequencies",
                    static: "text-static-v",
                  };
                  const sectionAbbr: Record<string, string> = {
                    signals: "SIG",
                    frequencies: "MUS",
                    static: "STA",
                  };
                  const d = new Date(article.frontmatter.publishedAt);
                  const dateStr = `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}.${String(d.getFullYear()).slice(2)}`;

                  return (
                    <Link
                      key={article.frontmatter.slug}
                      href={`/${article.frontmatter.vertical}/${article.frontmatter.slug}`}
                      className="group block py-2.5 border-b border-border/50 last:border-b-0 hover:bg-bg-surface/50 transition-colors -mx-2 px-2"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs text-text-muted w-5 shrink-0 text-right">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`text-xs ${sectionColors[article.frontmatter.vertical]} shrink-0 w-7`}>
                          {sectionAbbr[article.frontmatter.vertical]}
                        </span>
                        <span className="text-xs text-text-muted shrink-0 w-16">
                          {dateStr}
                        </span>
                        <span className="text-sm text-text group-hover:text-accent transition-colors truncate flex-1">
                          {article.frontmatter.title}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT: Live feed panels */}
          <aside className="hidden lg:block py-6 space-y-4">
            <LiveFeed
              title="C:\FEEDS\SECURITY.EXE"
              color="signals"
              feeds={[
                "https://krebsonsecurity.com/feed/",
                "https://www.bleepingcomputer.com/feed/",
                "https://feeds.arstechnica.com/arstechnica/security",
                "https://feeds.feedburner.com/TheHackersNews",
                "https://www.wired.com/feed/tag/security/latest/rss",
              ]}
              maxItems={8}
            />

            <LiveFeed
              title="C:\FEEDS\TECHNEWS.EXE"
              color="static-v"
              feeds={[
                "https://hnrss.org/frontpage?count=10",
                "https://feeds.arstechnica.com/arstechnica/index",
                "https://www.techmeme.com/feed.xml",
              ]}
              maxItems={6}
            />

            <LiveFeed
              title="C:\FEEDS\DEVWIRE.EXE"
              color="accent"
              feeds={[
                "https://www.techdirt.com/feed/",
                "https://thenewstack.io/feed",
                "https://hackernoon.com/feed",
              ]}
              maxItems={6}
            />
          </aside>
        </div>
      </main>
    </>
  );
}

