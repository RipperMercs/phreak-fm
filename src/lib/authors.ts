import { Author } from "@/types";

export const authors: Record<string, Author> = {
  ripper: {
    slug: "ripper",
    displayName: "Ripper",
    avatar: "/avatars/ripper.png",
    bio: "Founder of phreak.fm. Music producer, hacker culture archivist, and the voice behind the long-form pieces. Writing about the people who bend signals since before most of you were born.",
    primaryVertical: "signals",
    specialties: [
      "hacker history",
      "phreaking",
      "electronic music",
      "scene culture",
      "long-form",
    ],
    signature: "~ cut by ripper / phreak.fm ~",
  },
  nullbyte: {
    slug: "nullbyte",
    displayName: "nullbyte",
    avatar: "/avatars/nullbyte.png",
    bio: "Security researcher by day, phreak.fm contributor by night. Breaks things to understand how they work, writes about it so you can too.",
    primaryVertical: "signals",
    specialties: [
      "exploit analysis",
      "CVE breakdowns",
      "malware",
      "incident response",
      "zero days",
    ],
    signature: "~ cut by nullbyte / phreak.fm ~",
  },
  synth_error: {
    slug: "synth_error",
    displayName: "synth_error",
    avatar: "/avatars/synth_error.png",
    bio: "Noise maker, gear nerd, and occasional writer. Covers the intersection of technology and sound, from modular rigs to bedroom production.",
    primaryVertical: "frequencies",
    specialties: [
      "electronic music",
      "production",
      "synths",
      "album reviews",
      "artist profiles",
    ],
    signature: "~ cut by synth_error / phreak.fm ~",
  },
  deadpacket: {
    slug: "deadpacket",
    displayName: "deadpacket",
    avatar: "/avatars/deadpacket.png",
    bio: "Tech culture observer and late-night internet archaeologist. Writes about the weird corners of the web and the systems we built that built us.",
    primaryVertical: "static",
    specialties: [
      "tech culture",
      "internet history",
      "platform politics",
      "weird internet",
      "digital culture",
    ],
    signature: "~ cut by deadpacket / phreak.fm ~",
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
