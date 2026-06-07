"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { selectEvents, type HistoryEvent, type Selection, type Vertical } from "@/lib/history";
import historyData from "../../content/history.json";

const EVENTS = historyData as unknown as HistoryEvent[];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const TAG: Record<Vertical, { abbr: string; color: string }> = {
  signals: { abbr: "SIG", color: "text-signals" },
  frequencies: { abbr: "MUS", color: "text-frequencies" },
  static: { abbr: "STA", color: "text-static-v" },
};

function formatMonthDay(mmdd: string): string {
  const [month, day] = mmdd.split("-").map((n) => parseInt(n, 10));
  return `${MONTHS[month - 1]} ${String(day).padStart(2, "0")}`;
}

export function OnThisDay() {
  // The visitor's real local date is only known on the client. Render a stable
  // skeleton first, then fill in after mount to avoid a hydration mismatch.
  const [selection, setSelection] = useState<Selection | null>(null);
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    const now = new Date();
    setSelection(selectEvents(EVENTS, now));
    setTodayLabel(`${MONTHS[now.getMonth()]} ${String(now.getDate()).padStart(2, "0")}`);
  }, []);

  const isNearest = selection?.mode === "nearest";
  const label = isNearest ? "nearest signal" : "on this day";
  const headerDate = !selection
    ? "..."
    : isNearest && selection.items[0]
    ? `${formatMonthDay(selection.items[0].date)}, ${selection.items[0].year}`
    : todayLabel;

  return (
    <div className="border border-border bg-bg-surface p-4 my-6">
      <p className="text-xs text-text-muted mb-2">
        {">"} {label} :: {headerDate}
      </p>

      {!selection ? (
        <div className="loading-pulse h-4 w-2/3 rounded-sm" aria-hidden="true" />
      ) : selection.items.length === 0 ? (
        <p className="text-sm text-text-muted">the archive is quiet today.</p>
      ) : (
        <div className="space-y-1.5">
          {selection.items.map((e, i) => {
            const tag = TAG[e.vertical];
            const titleClass = "text-text hover:text-accent transition-colors";
            const title = e.slug ? (
              <Link href={`/${e.vertical}/${e.slug}`} className={titleClass}>
                {e.title}
              </Link>
            ) : e.source ? (
              <a
                href={e.source}
                target="_blank"
                rel="noopener noreferrer"
                className={titleClass}
              >
                {e.title}
              </a>
            ) : (
              <span className="text-text">{e.title}</span>
            );

            return (
              <div key={`${e.date}-${e.year}-${i}`} className="flex items-baseline gap-3">
                <span className="w-9 shrink-0 text-xs text-accent tabular-nums">
                  {e.year}
                </span>
                <span className={`w-7 shrink-0 text-[0.65rem] ${tag.color}`}>
                  {tag.abbr}
                </span>
                <span className="flex-1 text-sm leading-snug">{title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
