import { Metadata } from "next";
import { getAllArtists, getFeaturedArtists } from "@/config/artists";

export const metadata: Metadata = {
  title: "Artists",
  description: "Electronic music artist hub pages on phreak.fm. Spanning progressive, ambient, IDM, techno, and experimental.",
};

export default function ArtistsIndexPage() {
  const allArtists = getAllArtists();
  const featured = getFeaturedArtists();
  const rest = allArtists.filter((a) => !a.featured);

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-frequencies mb-2">Frequencies</p>
        <h1 className="font-mono text-3xl text-foreground mb-3">Artists</h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Artist hub pages aggregating all related content and news mentions.
          From the Digweed/Sasha progressive lineage to the Aphex/BoC ambient
          tradition, and everything in between.
        </p>
      </header>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
            Featured
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featured.map((artist) => (
              <a
                key={artist.slug}
                href={`/frequencies/artists/${artist.slug}`}
                className="block p-4 bg-surface border border-accent/30 rounded hover:border-accent/60 transition-colors"
              >
                <span className="font-mono text-sm text-accent">
                  {artist.name}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* All artists */}
      <section>
        <h2 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">
          All Artists
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {rest.map((artist) => (
            <a
              key={artist.slug}
              href={`/frequencies/artists/${artist.slug}`}
              className="block p-3 bg-surface border border-border rounded hover:border-frequencies/50 transition-colors"
            >
              <span className="font-mono text-sm text-foreground">
                {artist.name}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
