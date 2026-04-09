"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/signals", label: "signals" },
  { href: "/static", label: "static" },
  { href: "/frequencies", label: "music" },
  { href: "/news", label: "wire" },
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
        <div className="flex items-center justify-between h-12">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-sm tracking-wide text-text-bright hover:text-accent transition-colors"
          >
            phreak<span className="text-accent">.fm</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-border">|</span>
            <Link
              href="/search"
              className="text-xs text-text-muted hover:text-accent transition-colors"
            >
              /search
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-xs text-text-muted hover:text-text transition-colors"
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
            <Link
              href="/search"
              className="block text-xs py-2 text-text-muted hover:text-accent"
              onClick={() => setMobileOpen(false)}
            >
              &gt; /search
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
