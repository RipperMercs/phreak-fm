import { ArtistData } from "@/types";

export const artists: ArtistData[] = [
  // Progressive / Breaks / Club lineage
  { slug: "sasha", name: "Sasha", bio: "", links: {}, relatedArtists: ["john-digweed"] },
  { slug: "john-digweed", name: "John Digweed", bio: "", links: {}, relatedArtists: ["sasha", "hernan-cattaneo"] },
  { slug: "hernan-cattaneo", name: "Hernan Cattaneo", bio: "", links: {}, relatedArtists: ["john-digweed"] },
  { slug: "james-holden", name: "James Holden", bio: "", links: {}, relatedArtists: ["nathan-fake"] },
  { slug: "nathan-fake", name: "Nathan Fake", bio: "", links: {}, relatedArtists: ["james-holden"] },
  { slug: "bedrock-artist", name: "Bedrock", bio: "", links: {}, relatedArtists: ["john-digweed"] },
  { slug: "paul-van-dyk", name: "Paul Van Dyk", bio: "", links: {}, relatedArtists: ["paul-oakenfold"] },
  { slug: "paul-oakenfold", name: "Paul Oakenfold", bio: "", links: {}, relatedArtists: ["paul-van-dyk"] },
  { slug: "crystal-method", name: "Crystal Method", bio: "", links: {}, relatedArtists: [] },
  { slug: "noel-sanger", name: "Noel Sanger", bio: "", links: {}, relatedArtists: [] },
  { slug: "shiloh", name: "Shiloh", bio: "", links: {}, relatedArtists: [] },
  { slug: "madoka", name: "Madoka", bio: "", links: {}, relatedArtists: [] },
  { slug: "habersham", name: "Habersham", bio: "", links: {}, relatedArtists: [] },
  { slug: "lexicon-avenue", name: "Lexicon Avenue", bio: "", links: {}, relatedArtists: [] },
  { slug: "steve-lawler", name: "Steve Lawler", bio: "", links: {}, relatedArtists: ["lee-burridge"] },
  { slug: "lee-burridge", name: "Lee Burridge", bio: "", links: {}, relatedArtists: ["steve-lawler"] },

  // Ambient / IDM / Warp lineage
  { slug: "aphex-twin", name: "Aphex Twin", bio: "", links: {}, relatedArtists: ["squarepusher", "autechre"] },
  { slug: "boards-of-canada", name: "Boards of Canada", bio: "", links: {}, relatedArtists: ["aphex-twin"] },
  { slug: "autechre", name: "Autechre", bio: "", links: {}, relatedArtists: ["aphex-twin"] },
  { slug: "burial", name: "Burial", bio: "", links: {}, relatedArtists: ["four-tet"] },
  { slug: "squarepusher", name: "Squarepusher", bio: "", links: {}, relatedArtists: ["aphex-twin"] },
  { slug: "mu-ziq", name: "\u00b5-Ziq", bio: "", links: {}, relatedArtists: ["aphex-twin"] },
  { slug: "oneohtrix-point-never", name: "Oneohtrix Point Never", bio: "", links: {}, relatedArtists: ["tim-hecker"] },
  { slug: "tim-hecker", name: "Tim Hecker", bio: "", links: {}, relatedArtists: ["oneohtrix-point-never", "fennesz"] },
  { slug: "four-tet", name: "Four Tet", bio: "", links: {}, relatedArtists: ["burial", "nicolas-jaar"] },
  { slug: "nicolas-jaar", name: "Nicolas Jaar", bio: "", links: {}, relatedArtists: ["four-tet"] },
  { slug: "actress", name: "Actress", bio: "", links: {}, relatedArtists: [] },
  { slug: "caterina-barbieri", name: "Caterina Barbieri", bio: "", links: {}, relatedArtists: ["kali-malone"] },
  { slug: "kali-malone", name: "Kali Malone", bio: "", links: {}, relatedArtists: ["sarah-davachi", "caterina-barbieri"] },
  { slug: "sarah-davachi", name: "Sarah Davachi", bio: "", links: {}, relatedArtists: ["kali-malone"] },
  { slug: "lorenzo-senni", name: "Lorenzo Senni", bio: "", links: {}, relatedArtists: [] },
  { slug: "kara-lis-coverdale", name: "Kara-Lis Coverdale", bio: "", links: {}, relatedArtists: [] },
  { slug: "loraine-james", name: "Loraine James", bio: "", links: {}, relatedArtists: [] },
  { slug: "huerco-s", name: "Huerco S.", bio: "", links: {}, relatedArtists: [] },
  { slug: "the-caretaker", name: "The Caretaker", bio: "", links: {}, relatedArtists: ["william-basinski"] },
  { slug: "william-basinski", name: "William Basinski", bio: "", links: {}, relatedArtists: ["the-caretaker"] },
  { slug: "fennesz", name: "Fennesz", bio: "", links: {}, relatedArtists: ["tim-hecker", "jan-jelinek"] },
  { slug: "jan-jelinek", name: "Jan Jelinek", bio: "", links: {}, relatedArtists: ["fennesz"] },
  { slug: "gas", name: "GAS / Wolfgang Voigt", bio: "", links: {}, relatedArtists: [] },
  { slug: "jon-hopkins", name: "Jon Hopkins", bio: "", links: {}, relatedArtists: ["rival-consoles"] },
  { slug: "rival-consoles", name: "Rival Consoles", bio: "", links: {}, relatedArtists: ["jon-hopkins"] },
  { slug: "beatrice-dillon", name: "Beatrice Dillon", bio: "", links: {}, relatedArtists: [] },

  // Featured
  { slug: "rykard", name: "Rykard", bio: "", links: { label: "https://hunyamunya.com" }, relatedArtists: [], featured: true },
];

export function getArtist(slug: string): ArtistData | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getAllArtists(): ArtistData[] {
  return artists;
}

export function getFeaturedArtists(): ArtistData[] {
  return artists.filter((a) => a.featured);
}
