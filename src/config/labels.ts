import { LabelData } from "@/types";

export const labels: LabelData[] = [
  { slug: "warp", name: "Warp", bio: "Sheffield's visionary since 1989, defining digital acceleration through Aphex Twin, Autechre, and Boards of Canada. Warp didn't follow the rave; they rewired the future.", links: { website: "warp.net", bandcamp: "warp.bandcamp.com" }, featured: false },
  { slug: "ghost-box", name: "Ghost Box", bio: "Spectral hauntology through Jim Jupp and Paul Whitehead, channeling phantom UK culture into synth-driven narrative. A label that sounds like inherited memory.", links: { website: "ghostbox.uk", bandcamp: "ghostbox.bandcamp.com" }, featured: false },
  { slug: "modern-love", name: "Modern Love", bio: "Berlin's beating heart of raw techno and leftfield funk through basic_elements, VTSS, and Levon Vincent. Minimal in name, maximal in vision.", links: { website: "modern-love.de", bandcamp: "modernlove.bandcamp.com" }, featured: false },
  { slug: "hyperdub", name: "Hyperdub", bio: "Kode9's London laboratory for bass frequencies and digital abstraction, capturing grime's shadow and the click's mathematics. Sound design as rebellion.", links: { website: "hyperdub.net", bandcamp: "hyperdub.bandcamp.com" }, featured: false },
  { slug: "pan", name: "PAN", bio: "A Berlin void where extreme micro and experimental rigor meet the beautiful and fractured. Jlin, Arca, and the outer edges of digital form.", links: { website: "pan-agency.net", bandcamp: "pan-agency.bandcamp.com" }, featured: false },
  { slug: "editions-mego", name: "Editions Mego", bio: "Vienna's portal to electro-acoustic space, where Fennesz meets Dusweber in a dialogue between silence and grain. Micro-tonal precision as poetry.", links: { website: "editions-mego.com", bandcamp: "editionsmego.bandcamp.com" }, featured: false },
  { slug: "kranky", name: "Kranky", bio: "Chicago's apostle of post-rock and ambient drift through stars like Godspeed You! Black Emperor and Fennesz. Cinematic without cinema, expansive without clutter.", links: { website: "kranky.net", bandcamp: "kranky.bandcamp.com" }, featured: false },
  { slug: "ninja-tune", name: "Ninja Tune", bio: "London's crossover alchemist since 1990, bridging electronic and acoustic worlds through Amon Tobin, Cm101010 Binary Set, and Nightmares on Wax. Hip-hop nerves, electronic soul.", links: { website: "ninjatune.net", bandcamp: "ninjatune.bandcamp.com" }, featured: false },
  { slug: "erased-tapes", name: "Erased Tapes", bio: "Berlin's troubadour for modern composition, Nils Frahm's cathedral of strings and keys. Quietly radical in how it refuses to choose between classical grace and electronic futures.", links: { website: "erased-tapes.com", bandcamp: "erasedtapes.bandcamp.com" }, featured: false },
  { slug: "touch", name: "Touch", bio: "Carsten Nicolai's gateway between sound, science, and art installation. Touch records as if they were field recordings from a future laboratory.", links: { website: "touch.net", bandcamp: "touch.bandcamp.com" }, featured: false },
  { slug: "room40", name: "Room40", bio: "Brisbane's sovereign ambient and acoustic ecology through Fennesz, Keiji Haino, and Lawrence English. A label that sounds like listening to the void think.", links: { website: "room40.org", bandcamp: "room40.bandcamp.com" }, featured: false },
  { slug: "12k", name: "12k", bio: "NYC's minimalist carrier of digital silence and space through Ryoji Ikeda and Robert Henke. 12k measures sound by what it removes, not what it adds.", links: { website: "12k.com", bandcamp: "12k-music.bandcamp.com" }, featured: false },
  { slug: "shelter-press", name: "Shelter Press", bio: "Paris-based purveyor of material tangibility and physical ritual through Eleh, Éliane Radigue, and John Cage interpreters. Where analog isn't nostalgia, it's infrastructure.", links: { website: "shelterpress.net", bandcamp: "shelterpress.bandcamp.com" }, featured: false },
  { slug: "bedrock", name: "Bedrock", bio: "John Digweed's foundation label for deep house and techno archaeology. A landmark portal where peak-time sophistication meets underground interiority.", links: { website: "bedrockrecords.com", bandcamp: "bedrock.bandcamp.com" }, featured: false },
  { slug: "global-underground", name: "Global Underground", bio: "Compact Disc compilation series mapping techno's lineage through resident DJs across cities. A paper trail of dancefloor consciousness through the 1990s.", links: { website: "globalunderground.com" }, featured: false },
  { slug: "renaissance", name: "Renaissance", bio: "Ultra-chic compilation series documenting club DJ culture through Sasha, Digweed, and others. A time-stamped snapshot of what transcendence sounded like in the booth.", links: { website: "renaissance-music.com" }, featured: false },
  { slug: "perfecto", name: "Perfecto", bio: "Paul Oakenfold's trance temple, encoding the euphoric ascent and Balearic transmission for the mainfloor. A nexus where Ibiza met the world.", links: { website: "perfectorecords.com" }, featured: false },
  { slug: "hunya-munya-records", name: "Hunya Munya Records", bio: "A small light burning in the dark: Ripper's own imprint for archival recovery and insider cuts. Where the signal breaks and something true leaks out.", links: { bandcamp: "hunyamunya.bandcamp.com" }, featured: true },
];

export function getLabel(slug: string): LabelData | undefined {
  return labels.find((l) => l.slug === slug);
}

export function getAllLabels(): LabelData[] {
  return labels;
}

export function getFeaturedLabels(): LabelData[] {
  return labels.filter((l) => l.featured);
}
