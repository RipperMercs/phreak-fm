import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit",
  description: "Submit a story or a track to phreak.fm.",
  alternates: {
    canonical: "https://phreak.fm/submit",
  },
};

export default function SubmitPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <h1 className="font-display text-4xl text-text mb-4">Submit</h1>
      </header>

      {/* Editorial policy */}
      <blockquote className="border-l-2 border-riso-cyan pl-6 mb-12 font-body text-text leading-relaxed">
        <p>
          phreak.fm reads every submission. We verify what we can. We publish
          when a story holds up. We credit how you ask to be credited and we
          protect sources when asked. We are a small independent archive, not
          a professional newsroom, but we take this work seriously and we will
          not publish a story we cannot stand behind.
        </p>
      </blockquote>

      {/* Two CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier 1: Story submission */}
        <Link
          href="/submit/story"
          className="no-underline block p-6 border border-border rounded-sm hover:border-signals/50 transition-colors group"
        >
          <h2 className="font-display text-xl text-text group-hover:text-signals transition-colors mb-2">
            Submit a Story
          </h2>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            Hacker history, breach narratives, security post-mortems, tech
            culture commentary. If you have a story for Signals, Frequencies,
            or Static, we want to hear it.
          </p>
        </Link>

        {/* Tier 1: Pirate Signal track */}
        <Link
          href="/submit/pirate-signal"
          className="no-underline block p-6 border border-border rounded-sm hover:border-frequencies/50 transition-colors group"
        >
          <h2 className="font-display text-xl text-text group-hover:text-frequencies transition-colors mb-2">
            Submit a Track
          </h2>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            Found something strange and beautiful on Bandcamp, SoundCloud,
            or YouTube? Making something yourself? Pirate Signal is always
            listening.
          </p>
        </Link>
      </div>

      {/* Tier 2: Email drop */}
      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="font-display text-xl text-text mb-3">
          Email Drop
        </h2>
        <p className="font-body text-text-muted leading-relaxed mb-3">
          Prefer email? Send story tips, pitches, or Pirate Signal
          recommendations directly to:
        </p>
        <p className="font-mono text-sm text-link">
          tips@phreak.fm
        </p>
        <p className="font-body text-sm text-text-muted mt-2">
          Same privacy level as the web forms. Familiar to scene people who
          prefer email over web forms.
        </p>
      </section>
    </main>
  );
}
