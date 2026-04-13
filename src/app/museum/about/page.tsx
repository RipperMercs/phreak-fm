import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Museum :: phreak.fm",
  description:
    "The personal origin of the DOS Virus Museum, and the editorial and legal posture of the archive.",
};

export default function MuseumAboutPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <nav className="font-mono text-xs text-text-muted mb-6">
        <Link href="/museum" className="hover:text-accent">/museum</Link>
        <span className="px-1">/</span>
        <span className="text-text">about</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-display text-4xl text-text-bright mb-3">
          About the Museum
        </h1>
      </header>

      <div className="font-body text-text leading-relaxed space-y-5">
        <p>
          I started collecting viruses when I was a kid. Binders of floppies,
          lists of names copied out of BBS posts, little virus sites on
          Geocities when Geocities was still a thing. Most of them were
          harmless. Some were beautiful. A few wrecked a computer or two when
          I was careless with them, and those memories are sharper than any
          of the ones that worked out fine.
        </p>
        <p>
          This museum is a record of what those viruses looked like, who made
          them, and why they mattered. It is not a malware distribution site.
          It does not host executable virus code. It does not let you run
          anything. It is a catalog of images, stories, and technical history
          about a specific and underappreciated chapter of computing culture
          that ran roughly from 1986 through the end of the DOS era.
        </p>
        <p>
          The people who wrote these viruses were, mostly, teenagers. Many of
          them were also making demoscene intros, cracking games, writing for
          underground zines like 40Hex and Phalcon/Skism, and teaching each
          other assembly language in BBS chat rooms. A lot of them grew up to
          be security researchers, game developers, and musicians. The line
          between virus authorship, demoscene art, and electronic music in
          that era is almost invisible. Spanska's virus from 1997 is as
          visually accomplished as most contemporary demos. The Yankee Doodle
          virus plays a recognizable tune. Walker's pixel sprite is charming
          graphic design.
        </p>
        <p>
          We are not here to romanticize destructive software. Some of these
          viruses caused real harm and we document that honestly. We are here
          to preserve the cultural artifact of a specific moment in computing,
          written in the voice of someone who lived it.
        </p>
        <p>
          All visual material comes from public educational archives including
          the Internet Archive's Malware Museum, Virus Bulletin's historical
          writeups, F-PROT archives, academic security research repositories,
          and scene documentation like the 40Hex zine archives. Source
          citations appear on every specimen page. Corrections, additions,
          and missing context are welcome: see our{" "}
          <Link href="/submit" className="text-accent hover:underline">
            submissions page
          </Link>
          .
        </p>
        <p>
          The DOS Virus Museum is an editorial project of phreak.fm. It holds
          no executables. It asks nothing of your computer. It exists as a
          museum.
        </p>
        <p className="font-mono text-xs text-text-muted pt-4">
          ~ the_curator
        </p>
      </div>
    </main>
  );
}
