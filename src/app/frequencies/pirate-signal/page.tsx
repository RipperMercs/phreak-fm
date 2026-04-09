import { Metadata } from "next";
import { getAllArticles } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Pirate Signal",
  description: "Outsider music finds, bedroom genius showcases, and the strange transmissions nobody else is picking up. phreak.fm wants to be one of those fourteen listeners, and then bring the other ten thousand.",
};

const tagOptions = [
  "ambient", "noise", "bedroom pop", "outsider electronic", "lo-fi",
  "hauntological", "drone", "experimental", "modular", "tape",
];

export default function PirateSignalPage() {
  const allArticles = getAllArticles("frequencies");
  const pirateSignalPosts = allArticles.filter(
    (a) => a.frontmatter.subsection === "pirate-signal"
  );

  return (
    <main className="max-w-wire mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-xs text-frequencies uppercase tracking-widest mb-2">
          Frequencies
        </p>
        <h1 className="font-display text-4xl text-text mb-4">
          Pirate Signal
        </h1>
        <p className="font-body text-text-muted text-lg max-w-2xl leading-relaxed">
          Outsider music finds, bedroom genius showcases, and the strange
          transmissions nobody else is picking up. There is a direct line
          from the phreaker who whistled into a payphone to the bedroom
          producer uploading one strange MP3 to Bandcamp that only fourteen
          people will ever hear. We want to be one of those fourteen.
        </p>
      </header>

      {/* Tag filter chips */}
      <nav className="mb-8 flex flex-wrap gap-2" aria-label="Filter by tag">
        {tagOptions.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2.5 py-1 border border-border rounded-full text-text-muted hover:text-text hover:border-frequencies/40 cursor-pointer transition-colors"
          >
            {tag}
          </span>
        ))}
      </nav>

      {/* Posts */}
      <section>
        {pirateSignalPosts.length > 0 ? (
          pirateSignalPosts.map((post) => (
            <article
              key={post.frontmatter.slug}
              className="py-8 border-b border-border-light last:border-b-0"
            >
              <ArticleCard frontmatter={post.frontmatter} variant="default" />
            </article>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="font-mono text-sm text-text-muted mb-2">
              No transmissions received yet.
            </p>
            <p className="font-body text-sm text-text-muted">
              Pirate Signal posts will appear here as Ripper finds and shares
              outsider music. Check back soon.
            </p>
          </div>
        )}
      </section>

      {/* Submit CTA */}
      <section className="mt-12 pt-8 border-t border-border text-center">
        <p className="font-mono text-sm text-text-muted mb-3">
          Found something strange and beautiful?
        </p>
        <a
          href="/submit/pirate-signal"
          className="no-underline inline-block font-mono text-sm px-5 py-2 border border-frequencies rounded-sm text-frequencies hover:bg-frequencies/10 transition-colors"
        >
          Submit a track
        </a>
      </section>
    </main>
  );
}
