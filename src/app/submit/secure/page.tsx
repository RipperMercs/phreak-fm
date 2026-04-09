import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Submissions",
  description: "How to reach phreak.fm securely if your submission requires operational security.",
};

export default function SubmitSecurePage() {
  return (
    <main className="max-w-article mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">
          Submit
        </p>
        <h1 className="font-display text-3xl text-text mb-4">
          Secure Submissions
        </h1>
      </header>

      <div className="font-body text-text leading-relaxed space-y-6">
        <p>
          If you have information that requires real operational security,
          the web form is not appropriate. Here is how to reach phreak.fm
          with stronger protections.
        </p>

        <section className="p-6 border border-border rounded-sm space-y-4">
          <h2 className="font-display text-xl text-text">
            ProtonMail
          </h2>
          <p className="font-mono text-sm text-riso-cyan">
            [ProtonMail address to be added by Ripper post-build]
          </p>
          <p className="text-text-muted text-sm">
            End-to-end encrypted email. ProtonMail to ProtonMail messages
            never leave the encrypted environment.
          </p>
        </section>

        <section className="p-6 border border-border rounded-sm space-y-4">
          <h2 className="font-display text-xl text-text">
            Signal
          </h2>
          <p className="font-mono text-sm text-riso-cyan">
            [Signal contact to be added by Ripper if desired]
          </p>
          <p className="text-text-muted text-sm">
            End-to-end encrypted messaging with disappearing messages
            support.
          </p>
        </section>

        <section className="mt-8 p-6 bg-bg-surface border border-border rounded-sm">
          <h2 className="font-display text-xl text-text mb-3">
            What We Can and Cannot Guarantee
          </h2>
          <div className="space-y-3 text-sm text-text-muted">
            <p>
              phreak.fm is a small independent archive run by one person.
              We are not a professional newsroom. We do not have a legal
              department. We do not have the resources of a major publication.
            </p>
            <p>
              We will protect sources to the fullest extent we can. We will
              never voluntarily reveal a source who asked for protection. But
              we are subject to the same legal processes as anyone else.
            </p>
            <p>
              If you are considering sharing sensitive material, please
              think carefully about what you are comfortable sharing and
              with whom. If your situation requires the protections of a
              major newsroom (legal counsel, infrastructure for handling
              classified material, institutional backing), we encourage you
              to reach out to publications equipped for that work.
            </p>
            <p>
              If your story is about hacker culture, security history,
              scene documentation, or similar material where the stakes are
              reputational rather than legal, we are a good fit and we will
              handle it with care.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
