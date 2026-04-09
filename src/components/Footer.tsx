import Link from "next/link";

const sisterSites = [
  { name: "TerminalFeed", url: "https://terminalfeed.io" },
  { name: "TensorFeed", url: "https://tensorfeed.ai" },
  { name: "VR.org", url: "https://vr.org" },
  { name: "DramaRadar", url: "https://dramaradar.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-mono text-lg">
              phreak<span className="text-accent">.fm</span>
            </p>
            <p className="text-sm text-muted font-serif">
              Signals, frequencies, and the people who bend them.
            </p>
          </div>

          {/* Verticals */}
          <div className="space-y-3">
            <p className="font-mono text-sm text-muted uppercase tracking-wider">
              Verticals
            </p>
            <div className="space-y-2">
              <Link
                href="/signals"
                className="block text-sm text-signals hover:opacity-80"
              >
                Signals
              </Link>
              <Link
                href="/frequencies"
                className="block text-sm text-frequencies hover:opacity-80"
              >
                Frequencies
              </Link>
              <Link
                href="/static"
                className="block text-sm text-static-v hover:opacity-80"
              >
                Static
              </Link>
              <Link
                href="/news"
                className="block text-sm text-foreground hover:text-accent"
              >
                News
              </Link>
            </div>
          </div>

          {/* Site */}
          <div className="space-y-3">
            <p className="font-mono text-sm text-muted uppercase tracking-wider">
              Site
            </p>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-foreground hover:text-accent"
              >
                About
              </Link>
              <Link
                href="/submit"
                className="block text-sm text-foreground hover:text-accent"
              >
                Submit a Pitch
              </Link>
              <Link
                href="/dedication"
                className="block text-sm text-foreground hover:text-accent"
              >
                Dedication
              </Link>
            </div>
          </div>

          {/* Network */}
          <div className="space-y-3">
            <p className="font-mono text-sm text-muted uppercase tracking-wider">
              Network
            </p>
            <div className="space-y-2">
              {sisterSites.map((site) => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-foreground hover:text-accent"
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} phreak.fm
          </p>
          <p className="font-mono text-xs text-muted">
            A Pizza Robot Studios Project
          </p>
        </div>
      </div>
    </footer>
  );
}
