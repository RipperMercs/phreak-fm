import type { Metadata } from "next";
import { JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SourceOde } from "@/components/SourceOde";
import AsciiRainMount from "@/components/AsciiRainMount";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "phreak.fm | Hacker Culture, Electronic Music, and Tech News",
    template: "%s | phreak.fm",
  },
  description:
    "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news. Original long-form stories about phreakers, hackers, security breaches, electronic music producers, and the people who bend technology.",
  metadataBase: new URL("https://phreak.fm"),
  keywords: [
    "hacker culture",
    "phreaking",
    "electronic music",
    "cybersecurity",
    "hacker history",
    "2600",
    "DOS viruses",
    "malware history",
    "IDM",
    "ambient music",
    "security narratives",
    "tech news",
    "exploit analysis",
    "breach narratives",
    "Warp Records",
    "demoscene",
    "BBS history",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phreak.fm",
    siteName: "phreak.fm",
    title: "phreak.fm | Hacker Culture, Electronic Music, and Tech News",
    description:
      "Signals, frequencies, and the people who bend them. Original long-form stories about phreakers, hackers, security, and electronic music.",
  },
  twitter: {
    card: "summary_large_image",
    title: "phreak.fm",
    description:
      "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://phreak.fm",
    types: {
      "application/rss+xml": "https://phreak.fm/feed.xml",
    },
  },
  other: {
    "google-adsense-account": "ca-pub-7224757913262984",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${sourceSerif.variable} min-h-screen flex flex-col`}
      >
        <AsciiRainMount />
        <SourceOde />
        <Nav />
        <div className="flex-1 relative z-10">{children}</div>
        <Footer />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7224757913262984"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
