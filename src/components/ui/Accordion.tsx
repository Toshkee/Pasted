"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export type AccordionItem = { title: ReactNode; content: ReactNode; meta?: ReactNode };

/**
 * Accessible accordion (button + region pairs) with a height animation that needs no measuring:
 * the panel is a 0fr → 1fr grid row.
 */
export function Accordion({
  items,
  defaultOpen = -1,
  className,
  tone = "ink",
}: {
  items: AccordionItem[];
  defaultOpen?: number;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const paper = tone === "paper";

  return (
    <div className={cn("border-t", paper ? "border-paper-ink/15" : "border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={cn("border-b", paper ? "border-paper-ink/15" : "border-line")}>
            <h3>
              <button
                type="button"
                id={`${id}-h-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center gap-4 py-5 text-left md:gap-6 md:py-8"
              >
                {item.meta && <span className="eyebrow w-14 shrink-0 whitespace-nowrap text-[0.625rem] text-copper md:w-20 md:text-[0.6875rem]">{item.meta}</span>}
                <span
                  className={cn(
                    "min-w-0 flex-1 font-serif text-[1.45rem] leading-tight transition-colors md:text-[2.1rem]",
                    paper ? "text-paper-ink" : isOpen ? "text-bone" : "text-bone-2 group-hover:text-bone",
                  )}
                >
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-500 md:size-10",
                    paper ? "border-paper-ink/25" : "border-line-strong",
                    isOpen && "rotate-45 border-copper bg-copper text-ink",
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p-${i}`}
              role="region"
              aria-labelledby={`${id}-h-${i}`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <div className={cn("pb-8 md:pb-10", Boolean(item.meta) && "md:pl-26")}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
