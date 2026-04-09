import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticlesByPillar } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";

interface PageProps {
  params: { slug: string };
}

const pillars: Record<string, { title: string; description: string }> = {
  "famous-breaches": {
    title: "Famous Breaches",
    description: "The intrusions that made headlines and changed the game. From the Morris Worm to SolarWinds, the stories behind the biggest breaches in history.",
  },
  "ransomware-era": {
    title: "Ransomware Era",
    description: "How ransomware went from a curiosity to a global crisis. The gangs, the payouts, the infrastructure, and the defenders holding the line.",
  },
  "nation-state-operations": {
    title: "Nation State Operations",
    description: "State-sponsored hacking campaigns, APT groups, and the invisible wars fought across networks. When governments go on offense.",
  },
  "phreaker-elders-and-hacker-culture": {
    title: "Phreaker Elders & Hacker Culture",
    description: "The phreakers, the hackers, the zines, and the cons. From Cap'n Crunch's whistle to the L0pht testimony. The people who built the underground and the stories that defined it.",
  },
  "zero-days-and-exploit-chains": {
    title: "Zero Days & Exploit Chains",
    description: "The vulnerabilities nobody knew about and the chains of exploits that turned a single flaw into full system compromise.",
  },
  "insider-threats": {
    title: "Insider Threats",
    description: "When the call comes from inside the building. Rogue employees, compromised insiders, and the human element in security failures.",
  },
};

export function generateStaticParams() {
  return Object.keys(pillars).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pillar = pillars[params.slug];
  if (!pillar) return {};
  return {
    title: `${pillar.title} | Signals`,
    description: pillar.description,
  };
}

export default function SignalsPillarPage({ params }: PageProps) {
  const pillar = pillars[params.slug];
  if (!pillar) notFound();

  const articles = getArticlesByPillar(params.slug, "signals");

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-signals mb-2">
          Signals :: Topics
        </p>
        <h1 className="font-mono text-3xl text-foreground mb-3">
          {pillar.title}
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          {pillar.description}
        </p>
      </header>

      <section>
        {articles.length > 0 ? (
          articles.map((a) => (
            <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
          ))
        ) : (
          <p className="text-muted font-serif">
            Pillar content is being assembled. Check back soon.
          </p>
        )}
      </section>
    </main>
  );
}
