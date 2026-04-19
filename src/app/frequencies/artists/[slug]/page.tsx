import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArtist, getAllArtists } from "@/config/artists";
import { getAllArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllArtists().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const artist = getArtist(params.slug);
  if (!artist) return {};
  return {
    title: `${artist.name} | Frequencies`,
    description: artist.bio || `${artist.name} artist hub on phreak.fm. Articles, reviews, and news.`,
  };
}

export default function ArtistPage({ params }: PageProps) {
  const artist = getArtist(params.slug);
  if (!artist) notFound();

  // Surface articles that either set the artist field explicitly or include
  // the artist slug in tags. Tag matching is the safety net so a feature
  // piece written without the artist field still appears on the hub.
  const articles = getAllArticles("frequencies").filter((a) => {
    if (a.frontmatter.artist === artist.slug) return true;
    const tags = a.frontmatter.tags || [];
    return tags.map((t) => t.toLowerCase()).includes(artist.slug);
  });

  const relatedArtists = artist.relatedArtists
    .map((slug) => {
      const a = getAllArtists().find((ar) => ar.slug === slug);
      return a ? { slug: a.slug, name: a.name } : null;
    })
    .filter(Boolean);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-frequencies mb-2">
          Frequencies :: Artists
        </p>
        <h1 className="font-mono text-3xl text-foreground mb-3">
          {artist.name}
        </h1>
        {artist.bio ? (
          <p className="font-serif text-muted text-lg max-w-2xl">
            {artist.bio}
          </p>
        ) : (
          <p className="font-serif text-muted text-lg max-w-2xl">
            Artist page for {artist.name}. Content and bio coming soon.
          </p>
        )}

        {/* Links */}
        {Object.keys(artist.links).length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.entries(artist.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-2 py-1 bg-surface border border-border rounded hover:border-frequencies/50"
              >
                {key}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Articles */}
      <section className="mb-12">
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
          Articles
        </h2>
        {articles.length > 0 ? (
          articles.map((a) => (
            <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
          ))
        ) : (
          <p className="text-muted font-serif">
            No articles yet for {artist.name}. News aggregation will appear
            once the RSS feeds are active.
          </p>
        )}
      </section>

      {/* Related artists */}
      {relatedArtists.length > 0 && (
        <section className="pt-8 border-t border-border">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
            Related Artists
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedArtists.map((ra) =>
              ra ? (
                <a
                  key={ra.slug}
                  href={`/frequencies/artists/${ra.slug}`}
                  className="font-mono text-sm px-3 py-1.5 bg-surface border border-border rounded hover:border-frequencies/50 transition-colors"
                >
                  {ra.name}
                </a>
              ) : null
            )}
          </div>
        </section>
      )}
    </main>
  );
}
