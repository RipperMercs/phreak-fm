import { Vertical } from "@/types";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDateShort(new Date(timestamp).toISOString());
}

export function verticalLabel(vertical: Vertical): string {
  const labels: Record<Vertical, string> = {
    signals: "Signals",
    frequencies: "Frequencies",
    static: "Static",
  };
  return labels[vertical];
}

export function verticalColor(vertical: Vertical): string {
  const colors: Record<Vertical, string> = {
    signals: "text-signals",
    frequencies: "text-frequencies",
    static: "text-static-v",
  };
  return colors[vertical];
}

export function verticalBgColor(vertical: Vertical): string {
  const colors: Record<Vertical, string> = {
    signals: "bg-signals/10",
    frequencies: "bg-frequencies/10",
    static: "bg-static-v/10",
  };
  return colors[vertical];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}
