import { Author } from "@/types";

export const authors: Record<string, Author> = {
  "the-archivist": {
    slug: "the-archivist",
    displayName: "The Archivist",
    avatar: "/avatars/the-archivist.png",
    bio: "Hacker history, scene culture, phreaker elders, and old-school coverage. Digging through the archives so you do not have to.",
    primaryVertical: "signals",
    specialties: [
      "hacker history",
      "phreaking",
      "scene culture",
      "2600",
      "Phrack",
      "cDc",
    ],
    signature: "~ cut by the archivist / phreak.fm ~",
  },
  "the-analyst": {
    slug: "the-analyst",
    displayName: "The Analyst",
    avatar: "/avatars/the-analyst.png",
    bio: "Exploit breakdowns, CVE deep dives, and technical post-mortems. Reading the packet dumps so you can sleep at night.",
    primaryVertical: "signals",
    specialties: [
      "exploit analysis",
      "CVE breakdowns",
      "incident response",
      "malware analysis",
      "zero days",
    ],
    signature: "~ cut by the analyst / phreak.fm ~",
  },
  "the-listener": {
    slug: "the-listener",
    displayName: "The Listener",
    avatar: "/avatars/the-listener.png",
    bio: "Reviews, close-read album pieces, and artist features. Headphones on, world off.",
    primaryVertical: "frequencies",
    specialties: [
      "album reviews",
      "artist profiles",
      "ambient",
      "IDM",
      "progressive",
      "techno",
    ],
    signature: "~ cut by the listener / phreak.fm ~",
  },
  "the-historian": {
    slug: "the-historian",
    displayName: "The Historian",
    avatar: "/avatars/the-historian.png",
    bio: "Genre essays, label profiles, and scene retrospectives. Tracing the lineage from the first drum machine to now.",
    primaryVertical: "frequencies",
    specialties: [
      "genre history",
      "label profiles",
      "scene retrospectives",
      "electronic music culture",
    ],
    signature: "~ cut by the historian / phreak.fm ~",
  },
  "the-operator": {
    slug: "the-operator",
    displayName: "The Operator",
    avatar: "/avatars/the-operator.png",
    bio: "Pirate Signal: outsider music finds, bedroom genius showcases, and the strange transmissions nobody else is picking up.",
    primaryVertical: "frequencies",
    specialties: [
      "outsider music",
      "bedroom producers",
      "bandcamp finds",
      "lo-fi",
      "experimental",
      "noise",
    ],
    signature: "~ cut by the operator / phreak.fm ~",
  },
  "the-correspondent": {
    slug: "the-correspondent",
    displayName: "The Correspondent",
    avatar: "/avatars/the-correspondent.png",
    bio: "Tech news commentary, industry coverage, and shorter pieces. Dispatches from the signal floor.",
    primaryVertical: "static",
    specialties: [
      "tech commentary",
      "industry analysis",
      "platform coverage",
      "digital culture",
    ],
    signature: "~ cut by the correspondent / phreak.fm ~",
  },
  "the-nightshift": {
    slug: "the-nightshift",
    displayName: "The Nightshift",
    avatar: "/avatars/the-nightshift.png",
    bio: "Late-night essays and cross-vertical odd connections. The 3am voice that notices what everyone else missed.",
    primaryVertical: "static",
    specialties: [
      "essays",
      "cross-vertical",
      "weird internet",
      "cultural connections",
    ],
    signature: "~ cut by the nightshift / phreak.fm ~",
  },
};

export function getAuthor(slug: string): Author | undefined {
  return authors[slug];
}

export function getAuthorsByVertical(
  vertical: "signals" | "frequencies" | "static"
): Author[] {
  return Object.values(authors).filter(
    (a) => a.primaryVertical === vertical
  );
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
