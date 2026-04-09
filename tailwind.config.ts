import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-surface": "var(--bg-surface)",
        "bg-surface-hover": "var(--bg-surface-hover)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        "border-light": "var(--border-light)",

        // Risograph accent palette
        "riso-red": "var(--riso-red)",
        "riso-ochre": "var(--riso-ochre)",
        "riso-cyan": "var(--riso-cyan)",
        "riso-forest": "var(--riso-forest)",

        // Vertical section colors
        signals: "var(--color-signals)",
        frequencies: "var(--color-frequencies)",
        "static-v": "var(--color-static)",

        link: "var(--link)",
        "link-hover": "var(--link-hover)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Instrument Serif", "Georgia", "serif"],
        body: ["var(--font-body)", "Source Serif 4", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        hand: ["var(--font-hand)", "Caveat", "Kalam", "cursive"],
      },
      fontSize: {
        // Major Third scale (1.25)
        "xs": ["0.64rem", { lineHeight: "1rem" }],
        "sm": ["0.8rem", { lineHeight: "1.25rem" }],
        "base": ["1rem", { lineHeight: "1.7rem" }],
        "lg": ["1.25rem", { lineHeight: "1.875rem" }],
        "xl": ["1.563rem", { lineHeight: "2.125rem" }],
        "2xl": ["1.953rem", { lineHeight: "2.5rem" }],
        "3xl": ["2.441rem", { lineHeight: "2.875rem" }],
        "4xl": ["3.052rem", { lineHeight: "3.25rem" }],
        "5xl": ["3.815rem", { lineHeight: "3.875rem" }],
      },
      maxWidth: {
        article: "42rem",
        content: "72rem",
        wire: "48rem",
      },
      keyframes: {
        "paper-feed": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "paper-feed": "paper-feed 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
