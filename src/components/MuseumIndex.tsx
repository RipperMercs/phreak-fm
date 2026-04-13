"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { SpecimenFrontmatter } from "@/types/museum";
import { SpecimenCard } from "@/components/SpecimenCard";

interface MuseumIndexProps {
  specimens: SpecimenFrontmatter[];
  families: { slug: string; name: string; count: number }[];
  years: number[];
  payloadTypes: string[];
  platforms: string[];
}

type SortMode =
  | "year-asc"
  | "year-desc"
  | "name"
  | "famous"
  | "aesthetic"
  | "random";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function MuseumIndex({
  specimens,
  families,
  years,
  payloadTypes,
  platforms,
}: MuseumIndexProps) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [payload, setPayload] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [authorKnown, setAuthorKnown] = useState<string>("any");
  const [minFamous, setMinFamous] = useState<number>(1);
  const [minAesthetic, setMinAesthetic] = useState<number>(1);
  const [sort, setSort] = useState<SortMode>("year-asc");
  const [filterOpen, setFilterOpen] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(specimens, {
        keys: ["name", "aliases", "author", "family", "tags"],
        threshold: 0.35,
        minMatchCharLength: 2,
      }),
    [specimens]
  );

  const filtered = useMemo(() => {
    let list = specimens.slice();

    if (query.trim().length >= 2) {
      list = fuse.search(query.trim()).map((r) => r.item);
    }

    if (year) list = list.filter((s) => String(s.discoveredYear) === year);
    if (family) list = list.filter((s) => s.familySlug === family);
    if (payload)
      list = list.filter((s) => s.payloadType.includes(payload as never));
    if (platform) list = list.filter((s) => s.platform === platform);
    if (authorKnown === "yes")
      list = list.filter(
        (s) => s.author && s.author !== "unknown"
      );
    if (authorKnown === "no")
      list = list.filter((s) => !s.author || s.author === "unknown");
    list = list.filter((s) => s.famousRating >= minFamous);
    list = list.filter((s) => s.aestheticRating >= minAesthetic);

    switch (sort) {
      case "year-asc":
        list.sort(
          (a, b) => (a.discoveredYear ?? 9999) - (b.discoveredYear ?? 9999)
        );
        break;
      case "year-desc":
        list.sort(
          (a, b) => (b.discoveredYear ?? 0) - (a.discoveredYear ?? 0)
        );
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "famous":
        list.sort((a, b) => b.famousRating - a.famousRating);
        break;
      case "aesthetic":
        list.sort((a, b) => b.aestheticRating - a.aestheticRating);
        break;
      case "random":
        list = shuffle(list);
        break;
    }

    return list;
  }, [
    specimens,
    fuse,
    query,
    year,
    family,
    payload,
    platform,
    authorKnown,
    minFamous,
    minAesthetic,
    sort,
  ]);

  const reset = () => {
    setQuery("");
    setYear("");
    setFamily("");
    setPayload("");
    setPlatform("");
    setAuthorKnown("any");
    setMinFamous(1);
    setMinAesthetic(1);
    setSort("year-asc");
  };

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-text-bright mb-3">
          DOS Virus Museum
        </h1>
        <p className="font-body text-text-muted max-w-2xl leading-relaxed">
          A historical archive of MS-DOS-era computer viruses, roughly 1986
          through the late 1990s. Static specimens, technical writeups,
          authorship history, and cultural context. No executables. No
          downloads. Curated by{" "}
          <Link href="/museum/about" className="text-accent hover:underline">
            the_curator
          </Link>
          .
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8">
        <aside>
          <button
            type="button"
            className="lg:hidden w-full font-mono text-xs uppercase tracking-wider text-text-muted border border-border bg-bg-surface px-3 py-2 mb-3"
            onClick={() => setFilterOpen((o) => !o)}
            aria-expanded={filterOpen}
          >
            {filterOpen ? "[ - ] hide filters" : "[ + ] show filters"}
          </button>

          <div
            className={`${filterOpen ? "block" : "hidden"} lg:block space-y-5`}
          >
            <div>
              <label
                htmlFor="museum-search"
                className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5"
              >
                Search
              </label>
              <input
                id="museum-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="name, alias, family..."
                className="w-full bg-bg-surface border border-border px-2 py-1.5 font-mono text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>

            <FilterSelect
              label="Year"
              value={year}
              onChange={setYear}
              options={[
                { value: "", label: "all years" },
                ...years.map((y) => ({ value: String(y), label: String(y) })),
              ]}
            />

            <FilterSelect
              label="Family"
              value={family}
              onChange={setFamily}
              options={[
                { value: "", label: "all families" },
                ...families.map((f) => ({
                  value: f.slug,
                  label: `${f.name} (${f.count})`,
                })),
              ]}
            />

            <FilterSelect
              label="Payload"
              value={payload}
              onChange={setPayload}
              options={[
                { value: "", label: "any payload" },
                ...payloadTypes.map((p) => ({ value: p, label: p })),
              ]}
            />

            <FilterSelect
              label="Platform"
              value={platform}
              onChange={setPlatform}
              options={[
                { value: "", label: "any platform" },
                ...platforms.map((p) => ({ value: p, label: p })),
              ]}
            />

            <FilterSelect
              label="Author known"
              value={authorKnown}
              onChange={setAuthorKnown}
              options={[
                { value: "any", label: "any" },
                { value: "yes", label: "yes" },
                { value: "no", label: "no" },
              ]}
            />

            <RangeSlider
              label="Famous rating"
              value={minFamous}
              onChange={setMinFamous}
            />

            <RangeSlider
              label="Aesthetic rating"
              value={minAesthetic}
              onChange={setMinAesthetic}
            />

            <button
              type="button"
              onClick={reset}
              className="w-full font-mono text-[10px] uppercase tracking-wider text-text-muted border border-border bg-bg-surface px-3 py-2 hover:text-accent hover:border-accent"
            >
              [ reset filters ]
            </button>
          </div>
        </aside>

        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <p className="font-mono text-xs text-text-muted">
              {filtered.length} of {specimens.length} specimens
            </p>
            <div className="flex items-center gap-2">
              <label
                htmlFor="museum-sort"
                className="font-mono text-[10px] uppercase tracking-wider text-text-muted"
              >
                Sort
              </label>
              <select
                id="museum-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="bg-bg-surface border border-border px-2 py-1 font-mono text-xs text-text focus:outline-none focus:border-accent"
              >
                <option value="year-asc">year (asc)</option>
                <option value="year-desc">year (desc)</option>
                <option value="name">name (a to z)</option>
                <option value="famous">most famous</option>
                <option value="aesthetic">most beautiful</option>
                <option value="random">random</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((s) => (
                <SpecimenCard key={s.slug} specimen={{ frontmatter: s, content: "" }} />
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-text-muted py-8">
              ~ no specimens match these filters ~
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg-surface border border-border px-2 py-1.5 font-mono text-xs text-text focus:outline-none focus:border-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function RangeSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
        {label} :: min {value}
      </label>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}
