import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Left */}
          <div className="space-y-2">
            <p className="text-sm text-text-bright">
              phreak<span className="text-accent">.fm</span>
            </p>
            <p className="text-xs text-text-muted">
              signals, frequencies, and the people who bend them
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-xs text-text-muted">
            <div className="space-y-1.5">
              <Link href="/signals" className="block hover:text-accent transition-colors">signals</Link>
              <Link href="/static" className="block hover:text-accent transition-colors">static</Link>
              <Link href="/frequencies" className="block hover:text-accent transition-colors">music</Link>
              <Link href="/news" className="block hover:text-accent transition-colors">wire</Link>
            </div>
            <div className="space-y-1.5">
              <Link href="/about" className="block hover:text-accent transition-colors">about</Link>
              <Link href="/submit" className="block hover:text-accent transition-colors">submit</Link>
              <Link href="/dedication" className="block hover:text-accent transition-colors">dedication</Link>
            </div>
            <div className="space-y-1.5">
              <a href="https://terminalfeed.io" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">terminalfeed</a>
              <a href="https://tensorfeed.ai" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">tensorfeed</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <span>&copy; {new Date().getFullYear()} phreak.fm</span>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="hover:text-accent transition-colors">terms</Link>
            <Link href="/legal/privacy" className="hover:text-accent transition-colors">privacy</Link>
            <span>legal@pizzarobotstudios.com</span>
          </div>
          <span>a ripper project</span>
        </div>
      </div>
    </footer>
  );
}
