import { Vertical } from "@/types";
import { verticalColor, verticalBgColor } from "@/lib/utils";

interface VerticalTagProps {
  vertical: Vertical;
  size?: "sm" | "md";
}

const abbreviations: Record<Vertical, string> = {
  signals: "SIG",
  frequencies: "FRQ",
  static: "STA",
};

function verticalBorderColor(vertical: Vertical): string {
  const borders: Record<Vertical, string> = {
    signals: "border-signals/30",
    frequencies: "border-frequencies/30",
    static: "border-static-v/30",
  };
  return borders[vertical];
}

export function VerticalTag({ vertical, size = "sm" }: VerticalTagProps) {
  const sizeClasses =
    size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span
      className={`
        inline-block font-mono uppercase tracking-widest rounded-full border
        ${verticalColor(vertical)} ${verticalBgColor(vertical)}
        ${verticalBorderColor(vertical)} ${sizeClasses}
      `}
    >
      {abbreviations[vertical]}
    </span>
  );
}
