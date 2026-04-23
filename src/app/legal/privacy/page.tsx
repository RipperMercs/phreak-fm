import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: "https://phreak.fm/legal/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl text-text-bright mb-2">Privacy Policy</h1>
        <p className="text-xs text-text-muted">Last updated: April 2026</p>
      </header>

      <div className="space-y-6 text-sm text-text leading-relaxed font-body">
        <p>
          phreak.fm is operated by Pizza Robot Studios LLC. We take privacy
          seriously. This policy explains what we collect and why.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">What We Collect</h2>

        <h3 className="text-sm text-text-bright font-mono mt-6">Analytics</h3>
        <p>
          We use Cloudflare Web Analytics, which is privacy-first and does
          not use cookies, does not track individual users, and does not
          collect personal data. We see aggregate page views and referrers
          only.
        </p>

        <h3 className="text-sm text-text-bright font-mono mt-6">Submissions</h3>
        <p>
          If you submit a story or track via our forms or email, we store
          the content you provide (title, story text, embed URLs). Contact
          email and credit preferences are optional. We do not sell or share
          submission data with third parties.
        </p>

        <h3 className="text-sm text-text-bright font-mono mt-6">Source Protection</h3>
        <p>
          If you submit anonymously, we honor that. We do not log IP
          addresses against submission content. We will not voluntarily
          reveal a source who asked for protection.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">What We Do Not Collect</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>No cookies</li>
          <li>No tracking pixels</li>
          <li>No third-party ad scripts</li>
          <li>No user accounts or login data</li>
          <li>No fingerprinting</li>
          <li>No data sold to anyone, ever</li>
        </ul>

        <h2 className="text-base text-text-bright font-mono mt-8">Third-Party Embeds</h2>
        <p>
          Pirate Signal posts may embed players from Bandcamp, SoundCloud,
          or YouTube. These embeds are loaded in iframes and are subject to
          the privacy policies of those platforms. We have no control over
          what data those platforms collect through their embeds.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">Data Retention</h2>
        <p>
          Submissions are retained indefinitely for editorial reference.
          If you want a submission removed, email tips@phreak.fm.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">Contact</h2>
        <p>
          Privacy inquiries: legal@pizzarobotstudios.com
        </p>
      </div>
    </main>
  );
}
