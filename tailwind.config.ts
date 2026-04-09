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
        "text-bright": "var(--text-bright)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        "accent-glow": "var(--accent-glow)",
        signals: "var(--color-signals)",
        frequencies: "var(--color-frequencies)",
        "static-v": "var(--color-static)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        body: ["var(--font-body)", "Source Serif 4", "Georgia", "serif"],
        display: ["var(--font-display)", "Instrument Serif", "Georgia", "serif"],
      },
      maxWidth: {
        article: "42rem",
        content: "68rem",
        wire: "48rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
