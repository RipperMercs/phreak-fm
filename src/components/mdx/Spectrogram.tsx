/**
 * Spectrogram component: placeholder for future spectrogram visualization embeds.
 * Will accept audio data and render a frequency analysis view.
 * Implementation deferred to V2.
 */

interface SpectrogramProps {
  src?: string;
  label?: string;
}

export function Spectrogram({ label }: SpectrogramProps) {
  return (
    <div className="my-6 p-8 bg-surface border border-border rounded flex items-center justify-center">
      <p className="font-mono text-xs text-muted">
        [spectrogram: {label || "visualization pending"}]
      </p>
    </div>
  );
}
