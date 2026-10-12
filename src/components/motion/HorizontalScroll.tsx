"use client";

import { useRef, type ReactNode } from "react";

import { useMotion } from "@/lib/motion";

type Props = { children: ReactNode; className?: string; "aria-labelledby"?: string };

/**
 * Pins the section on desktop and maps vertical scroll to horizontal travel of its `[data-track]`.
 * Optional hooks inside: `[data-progress]` (scaleX 0→1) and `[data-drift]` (counter-parallax).
 * Below 1024px — or with reduced motion — the track is a native, swipeable scroll-snap row.
 */
export function HorizontalScroll({ children, className, ...rest }: Props) {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (mm, { gsap }) => {
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      tl.to(track, { x: () => -distance() }, 0);
      if (root.current?.querySelector("[data-progress]")) tl.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1 }, 0);
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => tl.fromTo(el, { xPercent: -8 }, { xPercent: 8 }, 0));
    });
  });

  return (
    <section ref={root} className={className} {...rest}>
      {children}
    </section>
  );
}
