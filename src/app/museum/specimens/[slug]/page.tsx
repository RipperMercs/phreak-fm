import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  getSpecimenBySlug,
  getSpecimenSlugs,
  getRelatedSpecimens,
  getSpecimensByFamily,
  getSpecimensByYear,
} from "@/lib/museum";
import { SpecimenHero, MediaGallery } from "@/components/SpecimenHero";
import { SpecimenCard } from "@/components/SpecimenCard";
import { ArticleRenderer } from "@/components/ArticleRenderer";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getSpecimenSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const specimen = getSpecimenBySlug(params.slug);
  if (!specimen) return {};
  const fm = specimen.frontmatter;
  return {
    title: `${fm.name} :: DOS Virus Museum`,
    description: fm.payloadDescription || `${fm.name}, a specimen in the phreak.fm DOS Virus Museum.`,
  };
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-3 py-1.5 border-b border-border-light last:border-b-0">
      <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted pt-0.5">
        {label}
      </dt>
      <dd className="font-mono text-xs text-text">{value}</dd>
    </div>
  );
}

export default function SpecimenPage({ params }: PageProps) {
  const specimen = getSpecimenBySlug(params.slug);
  if (!specimen) notFound();

  const fm = specimen.frontmatter;
  const related = getRelatedSpecimens(specimen, 6);
  const sameFamily = getSpecimensByFamily(fm.familySlug)
    .filter((s) => s.frontmatter.slug !== fm.slug)
    .slice(0, 5);
  const sameYear = fm.discoveredYear
    ? getSpecimensByYear(fm.discoveredYear)
        .filter((s) => s.frontmatter.slug !== fm.slug)
        .slice(0, 5)
    : [];

  return (
    <main className="max-w-content mx-auto px-4 sm:px-6 py-12">
      <nav className="font-mono text-xs text-text-muted mb-6">
        <Link href="/museum" className="hover:text-accent">
          /museum
        </Link>
        <span className="px-1">/</span>
        <Link href="/museum" className="hover:text-accent">
          specimens
        </Link>
        <span className="px-1">/</span>
        <span className="text-text">{fm.slug}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-8">
        <article>
          <header className="mb-6">
            <h1 className="font-display text-4xl sm:text-5xl text-text-bright mb-2">
              {fm.name}
            </h1>
            {fm.aliases.length > 0 && (
              <p className="font-mono text-xs text-text-muted">
                aka {fm.aliases.join(" / ")}
              </p>
            )}
          </header>

          <div className="mb-8">
            <SpecimenHero
              url={fm.heroMedia}
              type={fm.heroMediaType}
              alt={fm.heroMediaAlt}
              priority
            />
          </div>

          <section
            className="bg-bg-surface border border-border p-4 mb-10"
            aria-label="Specimen metadata"
          >
            <dl>
              <MetaRow label="discovered" value={fm.discovered} />
              <MetaRow label="origin" value={fm.discoveredLocation} />
              <MetaRow label="reported by" value={fm.firstReportedBy} />
              <MetaRow
                label="author"
                value={
                  fm.authorSlug ? (
                    <Link
                      href={`/museum/authors/${fm.authorSlug}`}
                      className="text-accent hover:underline"
                    >
                      {fm.author}
                    </Link>
                  ) : (
                    fm.author
                  )
                }
              />
              <MetaRow
                label="family"
                value={
                  <Link
                    href={`/museum/families/${fm.familySlug}`}
                    className="text-accent hover:underline"
                  >
                    {fm.family}
                  </Link>
                }
              />
              <MetaRow label="size" value={fm.size > 0 ? `${fm.size} bytes` : "unknown"} />
              <MetaRow label="platform" value={fm.platform} />
              <MetaRow label="vector" value={fm.infectionVector} />
              <MetaRow label="payload" value={fm.payloadType.join(", ")} />
              <MetaRow label="trigger" value={fm.trigger} />
            </dl>
          </section>

          {fm.payloadDescription && (
            <section className="mb-8">
              <h2 className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                Payload
              </h2>
              <p className="font-body text-base text-text border-l-2 border-accent pl-4 italic">
                {fm.payloadDescription}
              </p>
            </section>
          )}

          {specimen.content.trim().length > 0 ? (
            <ArticleRenderer source={specimen.content} />
          ) : (
            <p className="font-mono text-xs text-text-muted py-8">
              ~ writeup coming soon ~
            </p>
          )}

          {fm.additionalMedia.length > 0 && (
            <MediaGallery items={fm.additionalMedia} />
          )}

          {related.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">
                Related specimens
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {related.map((s) => (
                  <SpecimenCard key={s.frontmatter.slug} specimen={s} />
                ))}
              </div>
            </section>
          )}

          {fm.relatedArticles.length > 0 && (
            <section className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
                Related articles
              </h2>
              <ul className="space-y-1 font-mono text-xs">
                {fm.relatedArticles.map((slug) => (
                  <li key={slug}>
                    <Link href={`/signals/${slug}`} className="text-accent hover:underline">
                      {slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {fm.sources.length > 0 && (
            <section className="mt-10 pt-6 border-t border-border-light">
              <h2 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
                Sources
              </h2>
              <ul className="space-y-2 font-mono text-xs text-text-muted">
                {fm.sources.map((src, i) => (
                  <li key={i}>
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {src.title}
                      </a>
                    ) : (
                      <span className="text-text">{src.title}</span>
                    )}
                    <span className="text-text-muted"> :: {src.citation}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-8 font-mono text-[10px] text-text-muted">
            last updated: {fm.lastUpdated} :: curated by{" "}
            <Link href="/museum" className="text-accent hover:underline">
              the_curator
            </Link>
          </p>
        </article>

        <aside className="space-y-8">
          {sameFamily.length > 0 && (
            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                Also in the {fm.family} family
              </h2>
              <div>
                {sameFamily.map((s) => (
                  <SpecimenCard
                    key={s.frontmatter.slug}
                    specimen={s}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
          {sameYear.length > 0 && (
            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                Other viruses from {fm.discoveredYear}
              </h2>
              <div>
                {sameYear.map((s) => (
                  <SpecimenCard
                    key={s.frontmatter.slug}
                    specimen={s}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
