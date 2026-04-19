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
  keysmith: {
    slug: "keysmith",
    displayName: "keysmith",
    avatar: "/avatars/keysmith.png",
    bio: "Civil liberties and cryptography correspondent. Covers the crypto wars across decades, surveillance policy, regulatory fights, and the long arc of how individuals retain control over their own communications. Reads court filings and standards documents so you don't have to.",
    primaryVertical: "signals",
    specialties: [
      "cryptography",
      "civil liberties",
      "privacy",
      "surveillance policy",
      "crypto wars",
      "regulation",
    ],
    signature: "~ cut by keysmith / phreak.fm ~",
  },
  slipmat: {
    slug: "slipmat",
    displayName: "slipmat",
    avatar: "/avatars/slipmat.png",
    bio: "Music writer covering electronic scenes, club nights, label histories, and the long arc of dance music. Less interested in synth specs, more interested in why a particular kick drum changed how a particular city dances. Lives in the room, not in the studio.",
    primaryVertical: "frequencies",
    specialties: [
      "club culture",
      "scene history",
      "label profiles",
      "DJ history",
      "drum and bass",
      "music criticism",
    ],
    signature: "~ cut by slipmat / phreak.fm ~",
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
