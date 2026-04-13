import { Metadata } from "next";
import {
  getAllSpecimens,
  getAllFamilies,
  getAllYears,
  getAllPayloadTypes,
  getAllPlatforms,
} from "@/lib/museum";
import { MuseumIndex } from "@/components/MuseumIndex";

export const metadata: Metadata = {
  title: "DOS Virus Museum :: phreak.fm",
  description:
    "A historical archive of MS-DOS-era computer viruses. Static specimens, technical writeups, and cultural context. Curated by the_curator.",
};

export default function MuseumPage() {
  const specimens = getAllSpecimens().map((s) => s.frontmatter);
  const families = getAllFamilies();
  const years = getAllYears();
  const payloadTypes = getAllPayloadTypes();
  const platforms = getAllPlatforms();

  return (
    <MuseumIndex
      specimens={specimens}
      families={families}
      years={years}
      payloadTypes={payloadTypes}
      platforms={platforms}
    />
  );
}
