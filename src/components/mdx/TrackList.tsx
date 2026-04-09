interface Track {
  number: number;
  title: string;
  duration?: string;
  highlight?: boolean;
}

interface TrackListProps {
  tracks: Track[];
  albumTitle?: string;
}

export function TrackList({ tracks, albumTitle }: TrackListProps) {
  return (
    <div className="my-6 border border-border rounded-sm overflow-hidden">
      {albumTitle && (
        <div className="px-4 py-2 bg-bg-surface border-b border-border">
          <p className="font-mono text-sm text-text">{albumTitle}</p>
        </div>
      )}
      <ol className="divide-y divide-border">
        {tracks.map((track) => (
          <li
            key={track.number}
            className={`flex items-center gap-3 px-4 py-2 ${
              track.highlight ? "bg-riso-cyan/5" : ""
            }`}
          >
            <span className="font-mono text-xs text-text-muted w-6 text-right">
              {track.number}
            </span>
            <span
              className={`font-body text-sm flex-1 ${
                track.highlight ? "text-riso-cyan" : "text-text"
              }`}
            >
              {track.title}
            </span>
            {track.duration && (
              <span className="font-mono text-xs text-text-muted">
                {track.duration}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
