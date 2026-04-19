import { Metadata } from "next";
import { ArticleFrontmatter, Vertical } from "@/types";
import { getAuthor } from "./authors";

const SITE_URL = "https://phreak.fm";
const SITE_NAME = "phreak.fm";
const SITE_DESCRIPTION =
  "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news.";

export function buildArticleMetadata(
  frontmatter: ArticleFrontmatter
): Metadata {
  const author = getAuthor(frontmatter.author);
  const url = `${SITE_URL}/${frontmatter.vertical}/${frontmatter.slug}`;
  const ogImage = frontmatter.heroImage
    || `${SITE_URL}/og/${frontmatter.vertical}/${frontmatter.slug}.svg`;

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    authors: author ? [{ name: author.displayName }] : undefined,
    keywords: frontmatter.tags,
    openGraph: {
      type: "article",
      url,
      title: frontmatter.title,
      description: frontmatter.excerpt,
      siteName: SITE_NAME,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: author ? [author.displayName] : undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: frontmatter.title }],
      tags: frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function buildVerticalMetadata(vertical: Vertical): Metadata {
  const titles: Record<Vertical, string> = {
    signals: "Signals: Hacker Culture, Security, and Breach Narratives",
    frequencies:
      "Frequencies: Electronic Music Reviews, Features, and Scene Coverage",
    static: "Static: Tech and Nerd News",
  };

  const descriptions: Record<Vertical, string> = {
    signals:
      "Long-form hacker stories, security analysis, breach narratives, and exploit post-mortems. The history and present of the people who bend signals.",
    frequencies:
      "Electronic music reviews, artist features, label profiles, and scene coverage spanning ambient, IDM, progressive, techno, and experimental.",
    static:
      "Tech and nerd news commentary. The wider signal, the things that matter to the people who care about how systems work.",
  };

  return {
    title: titles[vertical],
    description: descriptions[vertical],
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${vertical}`,
      title: titles[vertical],
      description: descriptions[vertical],
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title: titles[vertical],
      description: descriptions[vertical],
    },
    alternates: {
      canonical: `${SITE_URL}/${vertical}`,
    },
  };
}

export function buildArticleJsonLd(frontmatter: ArticleFrontmatter) {
  const author = getAuthor(frontmatter.author);
  const verticalNames: Record<string, string> = {
    signals: "Signals",
    frequencies: "Frequencies",
    static: "Static",
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: frontmatter.title,
      description: frontmatter.excerpt,
      author: author
        ? {
            "@type": "Person",
            name: author.displayName,
            url: `${SITE_URL}/author/${author.slug}`,
          }
        : undefined,
      datePublished: frontmatter.publishedAt,
      dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
      image: frontmatter.heroImage,
      wordCount: frontmatter.readingTimeMinutes * 250,
      articleSection: verticalNames[frontmatter.vertical],
      keywords: frontmatter.tags,
      publisher: buildOrganizationJsonLd(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/${frontmatter.vertical}/${frontmatter.slug}`,
      },
      isAccessibleForFree: true,
    },
    buildBreadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      {
        name: verticalNames[frontmatter.vertical] || frontmatter.vertical,
        url: `${SITE_URL}/${frontmatter.vertical}`,
      },
      {
        name: frontmatter.title,
        url: `${SITE_URL}/${frontmatter.vertical}/${frontmatter.slug}`,
      },
    ]),
  ];
}

export function buildSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: buildOrganizationJsonLd(),
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    buildOrganizationJsonLd(),
    buildSiteNavigationJsonLd(),
  ];
}

export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    foundingDate: "2026",
    founder: {
      "@type": "Person",
      name: "Ripper",
      url: "https://ripper.tools",
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildSiteNavigationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Signals",
      "Static",
      "Music",
      "Museum",
      "Wire",
      "Search",
    ],
    url: [
      `${SITE_URL}/signals`,
      `${SITE_URL}/static`,
      `${SITE_URL}/frequencies`,
      `${SITE_URL}/museum`,
      `${SITE_URL}/news`,
      `${SITE_URL}/search`,
    ],
  };
}

export function buildVerticalJsonLd(vertical: Vertical) {
  const titles: Record<Vertical, string> = {
    signals: "Signals: Hacker Culture and Security",
    frequencies: "Frequencies: Electronic Music",
    static: "Static: Tech and Nerd News",
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: titles[vertical],
      url: `${SITE_URL}/${vertical}`,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    buildBreadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: titles[vertical], url: `${SITE_URL}/${vertical}` },
    ]),
  ];
}

export function buildMuseumSpecimenJsonLd(specimen: {
  name: string;
  slug: string;
  description: string;
  yearDiscovered: number;
  aliases: string[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${specimen.name} - DOS Virus Museum`,
      description: specimen.description,
      datePublished: `${specimen.yearDiscovered}-01-01`,
      publisher: buildOrganizationJsonLd(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/museum/specimens/${specimen.slug}`,
      },
      isAccessibleForFree: true,
    },
    buildBreadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "DOS Virus Museum", url: `${SITE_URL}/museum` },
      {
        name: specimen.name,
        url: `${SITE_URL}/museum/specimens/${specimen.slug}`,
      },
    ]),
  ];
}
