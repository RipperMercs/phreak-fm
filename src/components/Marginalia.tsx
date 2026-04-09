import { MarginaliaItem } from "@/types";

interface MarginaliaProps {
  items: MarginaliaItem[];
}

export function Marginalia({ items }: MarginaliaProps) {
  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: absolutely positioned margin notes */}
      <aside
        className="hidden lg:block absolute right-0 top-0 w-48 xl:w-56 pr-4"
        aria-label="Author margin notes"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="relative mb-8 pl-3 border-l border-border-light"
          >
            <span
              className="absolute -left-[3px] top-0 w-[5px] h-[5px] rounded-full bg-riso-ochre opacity-60"
              aria-hidden="true"
            />
            {item.anchor && (
              <p className="font-mono text-xs text-text-muted opacity-50 mb-1">
                {item.anchor}
              </p>
            )}
            <p className="font-hand text-sm text-text-muted opacity-60 leading-snug">
              {item.note}
            </p>
          </div>
        ))}
      </aside>

      {/* Mobile: inline aside blocks */}
      <div className="lg:hidden space-y-4 my-6" aria-label="Author margin notes">
        {items.map((item, index) => (
          <aside
            key={index}
            className="ml-4 pl-4 border-l-2 border-riso-ochre/30"
          >
            {item.anchor && (
              <p className="font-mono text-xs text-text-muted opacity-50 mb-1">
                {item.anchor}
              </p>
            )}
            <p className="font-hand text-base text-text-muted opacity-70 leading-snug">
              {item.note}
            </p>
          </aside>
        ))}
      </div>
    </>
  );
}
