"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/signals", label: "Signals", color: "text-signals" },
  { href: "/frequencies", label: "Frequencies", color: "text-frequencies" },
  { href: "/static", label: "Static", color: "text-static-v" },
  { href: "/news", label: "News", color: "text-foreground" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-lg tracking-tight text-foreground hover:text-accent transition-colors"
          >
            phreak<span className="text-accent">.fm</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-sm ${link.color} opacity-70 hover:opacity-100 transition-opacity`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="font-mono text-sm text-muted hover:text-foreground transition-colors"
              aria-label="Search"
            >
              /search
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden font-mono text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "[x]" : "[=]"}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block font-mono text-sm py-2 ${link.color} opacity-70 hover:opacity-100`}
                onClick={() => setMobileOpen(false)}
              >
                :: {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="block font-mono text-sm py-2 text-muted hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              :: /search
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
