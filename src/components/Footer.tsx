import Link from "next/link";

const crossReferences = [
  { name: "TerminalFeed", url: "https://terminalfeed.io" },
  { name: "TensorFeed", url: "https://tensorfeed.ai" },
  { name: "VR.org", url: "https://vr.org" },
  { name: "DramaRadar", url: "https://dramaradar.com" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border bg-bg-surface overflow-hidden">
      {/* Faint blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-signals) 1px, transparent 1px), linear-gradient(90deg, var(--color-signals) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-display text-lg tracking-wide">
              phreak<span className="text-riso-cyan">.fm</span>
            </p>
            <p className="font-mono text-xs text-text-muted leading-relaxed">
              Signals, frequencies, and the people who bend them.
            </p>
          </div>

          {/* Verticals */}
          <div className="space-y-3">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
              Verticals
            </p>
            <div className="space-y-2">
              <Link
                href="/signals"
                className="no-underline block font-mono text-sm text-signals hover:opacity-80 transition-opacity"
              >
                Signals
              </Link>
              <Link
                href="/frequencies"
                className="no-underline block font-mono text-sm text-frequencies hover:opacity-80 transition-opacity"
              >
                Frequencies
              </Link>
              <Link
                href="/static"
                className="no-underline block font-mono text-sm text-static-v hover:opacity-80 transition-opacity"
              >
                Static
              </Link>
              <Link
                href="/news"
                className="no-underline block font-mono text-sm text-text hover:text-link transition-colors"
              >
                News
              </Link>
            </div>
          </div>

          {/* Site */}
          <div className="space-y-3">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
              Site
            </p>
            <div className="space-y-2">
              <Link
                href="/about"
                className="no-underline block font-mono text-sm text-text hover:text-link transition-colors"
              >
                About
              </Link>
              <Link
                href="/submit"
                className="no-underline block font-mono text-sm text-text hover:text-link transition-colors"
              >
                Submit
              </Link>
              <Link
                href="/dedication"
                className="no-underline block font-mono text-sm text-text hover:text-link transition-colors"
              >
                Dedication
              </Link>
            </div>
          </div>

          {/* Cross-References */}
          <div className="space-y-3">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
              Cross-References
            </p>
            <div className="space-y-2">
              {crossReferences.map((site) => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline block font-mono text-sm text-text hover:text-link transition-colors"
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-muted">
            &copy; {new Date().getFullYear()} phreak.fm
          </p>
          <p className="font-mono text-xs text-text-muted">
            a ripper project
          </p>
        </div>
      </div>
    </footer>
  );
}
