import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What phreak.fm is and why it exists.",
};

export default function AboutPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl text-text mb-3">About</h1>
      </header>

      <div className="font-body text-text leading-relaxed space-y-6">
        <p>
          phreak.fm is a publication and living archive covering three
          connected worlds: hacker culture and security narratives,
          boundary-pushing electronic music, and tech/nerd news.
        </p>

        <p>
          The name comes from phone phreaking, the practice of exploring and
          manipulating telephone systems that predates computer hacking.
          Phreakers used tones (frequencies) to control switching equipment
          (signals). That lineage connects hackers, electronic music
          producers, and the broader community of people who care deeply
          about how systems work and what happens when you push them past
          their intended limits.
        </p>

        <p>
          The site publishes under three verticals:
        </p>

        <ul className="space-y-2 ml-5 list-disc">
          <li>
            <span className="text-signals font-mono text-sm">Signals</span> covers
            hacker stories, security long-form, breach narratives, phreaker
            history, and exploit post-mortems.
          </li>
          <li>
            <span className="text-frequencies font-mono text-sm">Frequencies</span> covers
            electronic music reviews, artist features, label profiles, scene
            coverage, and the Pirate Signal outsider-artist showcase.
          </li>
          <li>
            <span className="text-static-v font-mono text-sm">Static</span> covers
            tech and nerd news commentary, culture, and the cross-vertical
            essays that connect all three worlds.
          </li>
        </ul>

        <p>
          phreak.fm is an archive, not a content mill. Articles drop when
          they are ready, not on a schedule. The goal is to build a body of
          work that gets more valuable over time. Stories about Kevin Mitnick,
          Cap&apos;n Crunch, and the L0pht crew. Retrospectives on Northern
          Exposure and the Artificial Intelligence compilation. Essays about
          the 3am internet. These pieces do not expire.
        </p>

        <p>
          The news aggregator pulls from trusted sources across all three
          verticals, keeping the site alive between originals so readers
          always see fresh material.
        </p>

        <p className="font-mono text-sm text-text-muted pt-6 border-t border-border">
          phreak.fm is a personal project by Ripper.
        </p>
      </div>
    </main>
  );
}
