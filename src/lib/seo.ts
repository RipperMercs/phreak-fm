import { Metadata } from "next";
import { ArticleFrontmatter, Vertical } from "@/types";
import { getAuthor } from "./authors";

const SITE_URL = "https://phreak.fm";
const SITE_NAME = "phreak.fm";

export function buildArticleMetadata(
  frontmatter: ArticleFrontmatter
): Metadata {
  const author = getAuthor(frontmatter.author);
  const url = `${SITE_URL}/${frontmatter.vertical}/${frontmatter.slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    authors: author ? [{ name: author.displayName }] : undefined,
    openGraph: {
      type: "article",
      url,
      title: frontmatter.title,
      description: frontmatter.excerpt,
      siteName: SITE_NAME,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: author ? [author.displayName] : undefined,
      images: frontmatter.heroImage
        ? [{ url: frontmatter.heroImage, alt: frontmatter.title }]
        : undefined,
      tags: frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: frontmatter.heroImage ? [frontmatter.heroImage] : undefined,
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    author: author
      ? {
          "@type": "Person",
          name: author.displayName,
        }
      : undefined,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
    image: frontmatter.heroImage,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${frontmatter.vertical}/${frontmatter.slug}`,
    },
  };
}

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
