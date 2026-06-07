// Pure selection logic for the homepage "On This Day" widget.
// No DOM, no React: given the event list and a Date, it returns what to show.
// The component reads the visitor's real local date and renders the result.

export type Vertical = "signals" | "frequencies" | "static";

export interface HistoryEvent {
  date: string; // "MM-DD"
  year: number;
  title: string;
  vertical: Vertical;
  slug?: string; // internal article at /<vertical>/<slug>
  source?: string; // external public URL
}

export type SelectionMode = "exact" | "nearest";

export interface Selection {
  mode: SelectionMode;
  items: HistoryEvent[];
}

const MAX_EXACT = 3;

// Day index within a fixed non-leap year, so Feb 29 collapses sanely and the
// distance math is stable regardless of the actual year.
function dayOfYear(month: number, day: number): number {
  const start = Date.UTC(2001, 0, 1);
  const point = Date.UTC(2001, month - 1, day);
  return Math.round((point - start) / 86_400_000);
}

function parseMonthDay(mmdd: string): { month: number; day: number } {
  const [month, day] = mmdd.split("-").map((n) => parseInt(n, 10));
  return { month, day };
}

export function selectEvents(events: HistoryEvent[], today: Date): Selection {
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const mmdd = `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const exact = events
    .filter((e) => e.date === mmdd)
    .sort((a, b) => a.year - b.year)
    .slice(0, MAX_EXACT);

  if (exact.length > 0) {
    return { mode: "exact", items: exact };
  }

  // No event today: fall back to the nearest by calendar distance, with wrap
  // around the year boundary so late December finds early January.
  const todayDoy = dayOfYear(month, day);
  let best: HistoryEvent | null = null;
  let bestDist = Infinity;

  for (const e of events) {
    const { month: em, day: ed } = parseMonthDay(e.date);
    const raw = Math.abs(dayOfYear(em, ed) - todayDoy);
    const dist = Math.min(raw, 366 - raw);
    if (dist < bestDist) {
      bestDist = dist;
      best = e;
    }
  }

  return { mode: "nearest", items: best ? [best] : [] };
}
