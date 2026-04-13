"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/signals", label: "signals" },
  { href: "/static", label: "static" },
  { href: "/frequencies", label: "music" },
  { href: "/museum", label: "museum" },
  { href: "/news", label: "wire" },
  { href: "/search", label: "/search" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="flex items-center h-12">
          {/* Wordmark (left) */}
          <Link
            href="/"
            className="text-sm tracking-wide text-text-bright hover:text-accent transition-colors shrink-0"
          >
            phreak<span className="text-accent">.fm</span>
          </Link>

          {/* Desktop links (centered) */}
          <div className="hidden md:flex items-center justify-center gap-5 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer to balance the wordmark width on desktop */}
          <div className="hidden md:block shrink-0 w-[72px]" />

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-auto text-xs text-text-muted hover:text-text transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "[x]" : "[=]"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-xs py-2 text-text-muted hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                &gt; {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
