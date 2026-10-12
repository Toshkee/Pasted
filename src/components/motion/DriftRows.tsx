"use client";

import { useRef, type ReactNode } from "react";

import { useMotion } from "@/lib/motion";

/**
 * Scroll-linked horizontal drift for server-rendered rows. Children mark rows with
 * `data-drift-row="left"` or `"right"`; the rows slide in opposite directions while the block is on screen.
 */
export function DriftRows({ children, className, amount = 22 }: { children: ReactNode; className?: string; amount?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useMotion(
    root,
    (mm, { gsap }) => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrollTrigger = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo("[data-drift-row='left']", { xPercent: 2 }, { xPercent: -amount, ease: "none", scrollTrigger });
      gsap.fromTo("[data-drift-row='right']", { xPercent: -amount }, { xPercent: 2, ease: "none", scrollTrigger: { ...scrollTrigger } });
      });
    },
    [amount],
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
