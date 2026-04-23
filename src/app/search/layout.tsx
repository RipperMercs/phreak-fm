import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles, artists, labels, and specimens across phreak.fm.",
  alternates: {
    canonical: "https://phreak.fm/search",
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
