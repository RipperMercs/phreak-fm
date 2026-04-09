import type { Metadata } from "next";
import { JetBrains_Mono, Source_Serif_4, Instrument_Serif, Caveat } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "phreak.fm",
    template: "%s | phreak.fm",
  },
  description:
    "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news.",
  metadataBase: new URL("https://phreak.fm"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phreak.fm",
    siteName: "phreak.fm",
    title: "phreak.fm",
    description:
      "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news.",
  },
  twitter: {
    card: "summary_large_image",
    title: "phreak.fm",
    description:
      "Signals, frequencies, and the people who bend them. Hacker culture, electronic music, and tech news.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="blueprint" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} ${caveat.variable} min-h-screen flex flex-col`}
      >
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
