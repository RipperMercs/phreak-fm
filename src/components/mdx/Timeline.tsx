interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="my-8 space-y-0">
      {events.map((event, i) => (
        <div key={i} className="flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-riso-cyan mt-2" />
            {i < events.length - 1 && (
              <div className="w-px flex-1 bg-border mt-2" />
            )}
          </div>
          <div className="flex-1 pb-2">
            <p className="font-mono text-xs text-riso-cyan">{event.date}</p>
            <p className="font-display text-sm text-text mt-1">
              {event.title}
            </p>
            {event.description && (
              <p className="font-body text-sm text-text-muted mt-1">
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
