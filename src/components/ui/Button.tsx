import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Arrow({ className, direction = "right" }: { className?: string; direction?: "right" | "up-right" | "down" }) {
  const rotate = direction === "up-right" ? "-rotate-45" : direction === "down" ? "rotate-90" : "";
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={cn("size-[0.9em] shrink-0", rotate, className)} fill="none">
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}

/** Two stacked copies of the label; the second rolls in on hover (CSS only, see `.roll`). */
export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

type Variant = "solid" | "outline" | "outline-paper" | "copper" | "ink";

const styles: Record<Variant, string> = {
  solid: "bg-bone text-ink hover:bg-white",
  copper: "bg-copper text-ink hover:bg-copper-2",
  outline: "border border-line-strong text-bone hover:border-bone hover:bg-bone/5",
  "outline-paper": "border border-paper-ink/25 text-paper-ink hover:border-paper-ink hover:bg-paper-ink/5",
  ink: "bg-ink text-bone hover:bg-ink-3",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

export function ButtonLink({ variant = "solid", size = "md", className, arrow = true, external, children, ...props }: ButtonLinkProps) {
  // Display is owned by the caller when they pass a responsive `hidden …` pattern (avoids utility conflicts).
  const ownsDisplay = /(^|\s)hidden(\s|$)/.test(className ?? "");
  const cls = cn(
    "eyebrow items-center justify-center gap-3 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color] duration-500",
    !ownsDisplay && "inline-flex",
    size === "lg" ? "h-14 px-8 text-[0.75rem]" : size === "sm" ? "h-11 px-5" : "h-12 px-6",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <Roll>{children}</Roll>
      {arrow && <Arrow direction={external ? "up-right" : "right"} />}
    </>
  );
  if (external) {
    return (
      <a href={String(props.href)} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} {...props}>
      {inner}
    </Link>
  );
}

/** Text link with an animated underline and arrow. */
export function TextLink({ className, children, external, ...props }: Omit<ComponentProps<typeof Link>, "className"> & { className?: string; external?: boolean }) {
  const cls = cn("eyebrow group inline-flex items-center gap-2.5 text-bone", className);
  const inner = (
    <>
      <span className="link-underline pb-0.5">{children}</span>
      <Arrow direction={external ? "up-right" : "right"} className="transition-transform duration-500 group-hover:translate-x-1" />
    </>
  );
  if (external) {
    return (
      <a href={String(props.href)} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} {...props}>
      {inner}
    </Link>
  );
}

/** Small mono label with an optional index, e.g. "§ 03 — The argument". */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", !/(^|\s)text-(?!\[)/.test(className ?? "") && "text-mute", className)}>
      {index && (
        <span className={cn("shrink-0 whitespace-nowrap", /paper/.test(className ?? "") ? "text-copper-ink" : "text-copper")}>{index}</span>
      )}
      {index && <span aria-hidden="true" className="h-px w-6 shrink-0 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}
