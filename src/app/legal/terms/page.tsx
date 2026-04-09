import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl text-text-bright mb-2">Terms of Service</h1>
        <p className="text-xs text-text-muted">Last updated: April 2026</p>
      </header>

      <div className="space-y-6 text-sm text-text leading-relaxed font-body">
        <p>
          By accessing phreak.fm you agree to these terms. If you do not agree,
          do not use the site.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">1. Use of Content</h2>
        <p>
          All original editorial content on phreak.fm is the property of
          Pizza Robot Studios LLC. You may share links to articles freely.
          You may not reproduce, republish, or redistribute full articles
          without written permission.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">2. RSS Aggregated Content</h2>
        <p>
          The news wire aggregates headlines and excerpts from third-party
          sources under fair use. Full articles remain the property of their
          respective publishers. phreak.fm links to the original source for
          every aggregated item.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">3. Submissions</h2>
        <p>
          By submitting content through our forms or email, you affirm that
          the material is yours to share or properly sourced. You grant
          phreak.fm a non-exclusive, royalty-free license to edit and publish
          the submission. You retain ownership of your original work.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">4. No Warranty</h2>
        <p>
          phreak.fm is provided as-is. We make no guarantees about uptime,
          accuracy, or completeness of content. Technical security content
          is for educational and archival purposes only. Do not use information
          from this site to access systems you do not own or have authorization
          to test.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">5. Limitation of Liability</h2>
        <p>
          Pizza Robot Studios LLC is not liable for any damages arising from
          your use of phreak.fm. This includes but is not limited to direct,
          indirect, incidental, consequential, or punitive damages.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">6. Changes</h2>
        <p>
          We may update these terms at any time. Continued use of the site
          after changes constitutes acceptance.
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">7. Contact</h2>
        <p>
          Legal inquiries: legal@pizzarobotstudios.com
        </p>

        <h2 className="text-base text-text-bright font-mono mt-8">8. Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of California,
          United States.
        </p>
      </div>
    </main>
  );
}
