import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What phreak.fm is and why it exists.",
};

export default function AboutPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-mono text-3xl text-foreground mb-3">About</h1>
      </header>

      <div className="font-serif text-foreground leading-relaxed space-y-6">
        <p>
          phreak.fm is a publication covering three connected worlds: hacker
          culture and security narratives, boundary-pushing electronic music,
          and tech/nerd news.
        </p>

        <p>
          The name comes from phone phreaking, the practice of exploring and
          manipulating telephone systems that predates computer hacking. Phreakers
          used tones (frequencies) to control switching equipment (signals). That
          lineage connects hackers, electronic music producers, and the broader
          community of people who care deeply about how systems work.
        </p>

        <p>
          The site publishes under three verticals:
        </p>

        <ul className="space-y-2 ml-4">
          <li>
            <span className="text-signals font-mono text-sm">Signals</span> covers
            hacker stories, security long-form, breach narratives, and exploit
            post-mortems.
          </li>
          <li>
            <span className="text-frequencies font-mono text-sm">Frequencies</span> covers
            electronic music reviews, artist features, label profiles, and scene
            coverage.
          </li>
          <li>
            <span className="text-static-v font-mono text-sm">Static</span> covers
            tech and nerd news commentary, culture, and the things that do not
            fit the other two verticals but belong in the same conversation.
          </li>
        </ul>

        <p>
          phreak.fm is not a content mill. It is an archive, built slowly over
          years. The goal is to create a body of work that gets more valuable
          over time, not less. Stories about Kevin Mitnick, Cap&apos;n Crunch, and
          the L0pht crew. Retrospectives on Northern Exposure and the Artificial
          Intelligence compilation. Essays about the 3am internet. These pieces
          do not expire.
        </p>

        <p>
          The news aggregator pulls from trusted sources across all three
          verticals, giving readers a unified feed without having to check
          dozens of sites individually.
        </p>

        <p className="font-mono text-sm text-muted pt-6 border-t border-border">
          phreak.fm is a Pizza Robot Studios project.
        </p>
      </div>
    </main>
  );
}
