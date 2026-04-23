import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossary :: DOS Virus Museum",
  description:
    "Terminology for the MS-DOS-era virus archive. Polymorphic, boot sector, TSR, payload, and the rest.",
  alternates: {
    canonical: "https://phreak.fm/museum/glossary",
  },
};

interface Term {
  term: string;
  definition: string;
}

const terms: Term[] = [
  {
    term: "Boot sector",
    definition:
      "The first physical sector of a floppy disk or hard drive, loaded into memory at startup. Boot sector viruses replace this code so they execute before the operating system, then chain back to the original boot routine.",
  },
  {
    term: "COM file",
    definition:
      "A simple DOS executable format limited to 64 KB and loaded directly into memory at offset 0x100. COM files were the easiest infection target in early DOS viruses because of their flat layout.",
  },
  {
    term: "EXE file",
    definition:
      "The structured DOS executable format with a relocation header. Infecting EXE files required parsing and adjusting the header, which made EXE infectors slightly more sophisticated than COM infectors.",
  },
  {
    term: "TSR",
    definition:
      "Terminate and Stay Resident. A DOS program that exits to the command prompt but leaves part of itself in memory, hooking interrupts so it can intercept future system calls. Most early viruses were TSRs.",
  },
  {
    term: "Interrupt 21h",
    definition:
      "The MS-DOS API gateway. Almost every file operation flowed through INT 21h, so a virus that hooked it could intercept opens, reads, writes, and executions for the entire system.",
  },
  {
    term: "Payload",
    definition:
      "The visible or destructive action a virus performs once its trigger condition is met, separate from its replication code. Payloads ranged from harmless animations to disk wipes.",
  },
  {
    term: "Trigger",
    definition:
      "The condition that activates a payload. Common triggers included specific dates, keystroke counts, file counts reached, or random chance per execution.",
  },
  {
    term: "Polymorphic",
    definition:
      "A virus that mutates its own code on each infection so that no two copies look the same to a signature scanner. Pioneered by Tequila and the Mutation Engine, polymorphism reshaped antivirus research in the early 1990s.",
  },
  {
    term: "Stealth",
    definition:
      "Techniques used by viruses to hide their presence from the operating system, typically by intercepting file size and content reads so infected files appear unchanged on inspection.",
  },
  {
    term: "Encrypted virus",
    definition:
      "A virus whose body is stored in scrambled form and decrypted at runtime by a small loader. The loader varies even when the body does not, an early step toward full polymorphism.",
  },
  {
    term: "Dropper",
    definition:
      "A small program whose only job is to install a virus onto a system. Droppers themselves are not always self-replicating.",
  },
  {
    term: "Variant",
    definition:
      "A modified version of an existing virus, often produced by a different author who reverse engineered the original. Many famous virus 'families' are really collections of variants on a single ancestor.",
  },
  {
    term: "Family",
    definition:
      "A group of related viruses sharing a common ancestor and a recognizable code lineage. Jerusalem, Stoned, and Cascade are families with dozens of variants each.",
  },
  {
    term: "VX scene",
    definition:
      "The loose underground community of virus writers, traders, zine publishers, and antivirus researchers that flourished from roughly 1990 through the early 2000s. Most were teenagers swapping samples through BBSes.",
  },
  {
    term: "40Hex",
    definition:
      "An influential virus zine published by the Phalcon/Skism group from 1991 to 1995. Issues featured source code, technical articles, and scene gossip.",
  },
  {
    term: "First generation",
    definition:
      "An original copy of a virus written by its author, before it has replicated through any host system. First generation samples are valued by researchers because they are uncorrupted by later mutations.",
  },
];

export default function GlossaryPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <nav className="font-mono text-xs text-text-muted mb-6">
        <Link href="/museum" className="hover:text-accent">/museum</Link>
        <span className="px-1">/</span>
        <span className="text-text">glossary</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-display text-4xl text-text-bright mb-3">Glossary</h1>
        <p className="font-body text-text-muted">
          Terms you will run into across the specimens. Not exhaustive,
          updated as new entries demand.
        </p>
      </header>

      <dl className="space-y-6">
        {terms.map((t) => (
          <div key={t.term} className="border-b border-border-light pb-5 last:border-b-0">
            <dt className="font-mono text-sm text-text-bright mb-1">
              {t.term}
            </dt>
            <dd className="font-body text-sm text-text leading-relaxed">
              {t.definition}
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
