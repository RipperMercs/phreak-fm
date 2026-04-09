import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticlesByPillar } from "@/lib/mdx";
import { ArticleCard } from "@/components/ArticleCard";

interface PageProps {
  params: { slug: string };
}

const genrePillars: Record<string, { title: string; description: string }> = {
  ambient: {
    title: "Ambient",
    description: "From Brian Eno's airports to the deepest drone fields. Music designed to surround, envelop, and alter the space it occupies.",
  },
  idm: {
    title: "IDM",
    description: "Intelligent dance music (a label nobody loves but everyone uses). Aphex Twin, Autechre, Boards of Canada, and the artists who made electronic music think.",
  },
  "progressive-house": {
    title: "Progressive House",
    description: "The Digweed/Sasha/Bedrock lineage. Long builds, deep grooves, and the sound of the 3am dancefloor when the music stops being background and becomes architecture.",
  },
  "experimental-techno": {
    title: "Experimental Techno",
    description: "Techno that left the four-on-the-floor behind and went somewhere stranger. Industrial textures, broken rhythms, and machines that sound like they are thinking.",
  },
  downtempo: {
    title: "Downtempo",
    description: "Slow beats, warm textures, and the electronic music you play when the club is closed. Trip-hop descendants and beat scientists.",
  },
  hauntology: {
    title: "Hauntology",
    description: "Music haunted by futures that never arrived. Ghost Box, The Caretaker, Burial's rain-soaked UK pirate radio memories. The sound of cultural memory degrading.",
  },
  "modular-synth": {
    title: "Modular / Synth",
    description: "Patch cables, voltage control, and the art of making sound from electricity. Caterina Barbieri, Kali Malone, and the new generation of synthesists.",
  },
  "drone-and-minimalism": {
    title: "Drone & Minimalism",
    description: "Sustained tones, slow evolution, and the beauty of barely changing. From La Monte Young to Sarah Davachi, music that rewards patience.",
  },
  glitch: {
    title: "Glitch",
    description: "The art of the error. Oval, Fennesz, Jan Jelinek, and the producers who found beauty in broken digital artifacts.",
  },
  breaks: {
    title: "Breaks",
    description: "Breakbeats, broken rhythms, and the lineage that runs from jungle through to modern bass music. Underserved elsewhere, it belongs here.",
  },
};

export function generateStaticParams() {
  return Object.keys(genrePillars).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const genre = genrePillars[params.slug];
  if (!genre) return {};
  return {
    title: `${genre.title} | Frequencies`,
    description: genre.description,
  };
}

export default function GenrePillarPage({ params }: PageProps) {
  const genre = genrePillars[params.slug];
  if (!genre) notFound();

  const articles = getArticlesByPillar(params.slug, "frequencies");

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="font-mono text-sm text-frequencies mb-2">
          Frequencies :: Genres
        </p>
        <h1 className="font-mono text-3xl text-foreground mb-3">
          {genre.title}
        </h1>
        <p className="font-serif text-muted text-lg max-w-2xl">
          {genre.description}
        </p>
      </header>

      <section>
        {articles.length > 0 ? (
          articles.map((a) => (
            <ArticleCard key={a.frontmatter.slug} frontmatter={a.frontmatter} />
          ))
        ) : (
          <p className="text-muted font-serif">
            Genre coverage is being built. Check back soon for reviews,
            features, and deep dives into {genre.title.toLowerCase()}.
          </p>
        )}
      </section>
    </main>
  );
}
