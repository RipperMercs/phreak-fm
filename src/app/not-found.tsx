import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Spectrogram placeholder SVG */}
        <div className="mb-8 mx-auto w-full max-w-sm h-32 bg-bg-surface border border-border rounded-sm overflow-hidden relative">
          <svg
            viewBox="0 0 400 120"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Frequency bands */}
            {Array.from({ length: 40 }).map((_, i) => (
              <rect
                key={i}
                x={i * 10}
                y={Math.random() * 80 + 10}
                width="8"
                height={Math.random() * 40 + 10}
                fill="var(--riso-cyan)"
                opacity={0.15 + Math.random() * 0.4}
              />
            ))}
            {/* Hidden "404" in the waveform area */}
            <text
              x="200"
              y="70"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="36"
              fill="var(--riso-cyan)"
              opacity="0.08"
            >
              404
            </text>
          </svg>
          <p className="absolute bottom-2 right-3 font-mono text-xs text-text-muted opacity-40">
            spectrogram.wav
          </p>
        </div>

        <h1 className="font-display text-4xl text-text mb-3">
          Signal Lost
        </h1>
        <p className="font-body text-text-muted mb-6">
          The frequency you requested could not be found. It may have
          been decommissioned, or it may never have existed.
        </p>
        <Link
          href="/"
          className="no-underline inline-block font-mono text-sm px-5 py-2 border border-riso-cyan text-riso-cyan rounded-sm hover:bg-riso-cyan/10 transition-colors"
        >
          Return to transmission
        </Link>
      </div>
    </main>
  );
}
