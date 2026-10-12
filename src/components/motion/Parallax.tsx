"use client";

import { useRef, type ReactNode } from "react";

import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/**
 * Clips its child and drifts it vertically against the scroll — the classic "window" parallax.
 * The child should be taller than the frame (it is scaled up by `amount` to avoid gaps).
 */
export function Parallax({ children, className, amount = 12 }: { children: ReactNode; className?: string; amount?: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia(frame);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        inner.current,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, [amount]);

  return (
    <div ref={frame} className={cn("relative overflow-clip", className)}>
      <div ref={inner} className="absolute inset-x-0 will-change-transform" style={{ top: `-${amount}%`, bottom: `-${amount}%` }}>
        {children}
      </div>
    </div>
  );
}
