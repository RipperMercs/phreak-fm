import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signals Topics",
  description: "Topic hubs for hacker culture, security analysis, and breach narratives.",
};

const topics = [
  {
    slug: "famous-breaches",
    title: "Famous Breaches",
    description: "The intrusions that made headlines and changed the game. From the Morris Worm to SolarWinds, the stories behind the biggest breaches in history.",
  },
  {
    slug: "ransomware-era",
    title: "Ransomware Era",
    description: "How ransomware went from a curiosity to a global crisis. The gangs, the payouts, the infrastructure, and the defenders holding the line.",
  },
  {
    slug: "nation-state-operations",
    title: "Nation State Operations",
    description: "State-sponsored hacking campaigns, APT groups, and the invisible wars fought across networks. When governments go on offense.",
  },
  {
    slug: "phreaker-elders-and-hacker-culture",
    title: "Phreaker Elders & Hacker Culture",
    description: "The phreakers, the hackers, the zines, and the cons. From Cap'n Crunch's whistle to the L0pht testimony. The people who built the underground and the stories that defined it.",
  },
  {
    slug: "zero-days-and-exploit-chains",
    title: "Zero Days & Exploit Chains",
    description: "The vulnerabilities nobody knew about and the chains of exploits that turned a single flaw into full system compromise.",
  },
  {
    slug: "insider-threats",
    title: "Insider Threats",
    description: "When the call comes from inside the building. Rogue employees, compromised insiders, and the human element in security failures.",
  },
];

export default function SignalsTopicsPage() {
  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <h1 className="font-mono text-3xl text-signals mb-3">
          Signals :: Topics
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          Deep-dive topic hubs covering the major threads in hacker culture,
          security, and breach history.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <a
            key={topic.slug}
            href={`/signals/topics/${topic.slug}`}
            className="group block p-6 bg-surface border border-border rounded hover:border-signals/50 transition-colors"
          >
            <h2 className="font-mono text-lg text-foreground group-hover:text-signals transition-colors mb-2">
              {topic.title}
            </h2>
            <p className="font-serif text-sm text-muted">
              {topic.description}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
