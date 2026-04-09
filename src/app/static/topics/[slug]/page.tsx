import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticlesByPillar } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";

interface PageProps {
  params: { slug: string };
}

const pillars: Record<string, { title: string; description: string }> = {
  "tech-culture": {
    title: "Tech Culture",
    description: "How technology shapes culture and culture shapes technology. The social systems that emerge around the machines we build.",
  },
  "platform-politics": {
    title: "Platform Politics",
    description: "Power, moderation, monopoly, and resistance. What happens when a handful of companies control the public square.",
  },
  "weird-internet": {
    title: "Weird Internet",
    description: "The corners of the internet that remind you it was built by humans, not product managers. Oddities, curiosities, and digital folk art.",
  },
};

export function generateStaticParams() {
  return Object.keys(pillars).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pillar = pillars[params.slug];
  if (!pillar) return {};
  return {
    title: `${pillar.title} | Static`,
    description: pillar.description,
  };
}

export default function StaticPillarPage({ params }: PageProps) {
  const pillar = pillars[params.slug];
  if (!pillar) notFound();

  const articles = getArticlesByPillar(params.slug, "static");

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-static-v mb-2">
          Static :: Topics
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
