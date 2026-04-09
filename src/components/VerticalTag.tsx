import { Vertical } from "@/types";
import { verticalLabel, verticalColor, verticalBgColor } from "@/lib/utils";

interface VerticalTagProps {
  vertical: Vertical;
  size?: "sm" | "md";
}

export function VerticalTag({ vertical, size = "sm" }: VerticalTagProps) {
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`
        inline-block font-mono uppercase tracking-wider rounded-sm
        ${verticalColor(vertical)} ${verticalBgColor(vertical)} ${sizeClasses}
      `}
    >
      {verticalLabel(vertical)}
    </span>
  );
}
