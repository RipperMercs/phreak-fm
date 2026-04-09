"use client";

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

const navLinks = [
  { href: "/signals", label: "Signals", color: "text-signals" },
  { href: "/frequencies", label: "Frequencies", color: "text-frequencies" },
  { href: "/static", label: "Static", color: "text-static-v" },
  { href: "/news", label: "News", color: "text-text" },
  { href: "/search", label: "/search", color: "text-text-muted" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Wordmark */}
          <Link
            href="/"
            className="no-underline font-display text-lg tracking-wide text-text hover:text-riso-cyan transition-colors"
          >
            phreak<span className="text-riso-cyan">.fm</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`no-underline font-mono text-sm ${link.color} opacity-75 hover:opacity-100 transition-opacity`}
              >
                {link.label}
              </Link>
            ))}

            <div className="ml-2 pl-4 border-l border-border">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <ModeToggle />
            <button
              className="font-mono text-sm text-text-muted hover:text-text transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "[x]" : "[=]"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`no-underline block font-mono text-sm py-2 ${link.color} opacity-75 hover:opacity-100`}
                onClick={() => setMobileOpen(false)}
              >
                :: {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
