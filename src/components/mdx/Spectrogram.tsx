/**
 * Spectrogram placeholder for future frequency visualization embeds.
 * Implementation deferred, renders a placeholder box.
 */

interface SpectrogramProps {
  src?: string;
  label?: string;
}

export function Spectrogram({ label }: SpectrogramProps) {
  return (
    <div className="my-6 p-8 bg-bg-surface border border-border rounded-sm flex items-center justify-center">
      <p className="font-mono text-xs text-text-muted">
        [spectrogram: {label || "visualization pending"}]
      </p>
    </div>
  );
}
