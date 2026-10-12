import { cn } from "@/lib/cn";

/** Circular play glyph with a slow rotating ring of text-free dashes. Purely presentational. */
export function PlayGlyph({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const dims = /(^|\s)size-/.test(className ?? "") ? "" : size === "lg" ? "size-24" : size === "sm" ? "size-12" : "size-16";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full border border-bone/40 bg-ink/30 backdrop-blur-md transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:border-copper group-hover:bg-copper",
        dims,
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className={cn(size === "lg" ? "size-6" : "size-3.5 sm:size-4", "translate-x-[1px] text-bone group-hover:text-ink")}>
        <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
      </svg>
    </span>
  );
}
