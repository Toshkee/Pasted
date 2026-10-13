"use client";

import { useRef } from "react";

import { useMotion } from "@/lib/motion";

const LINE = "Your patients will never see how good you are. They can only feel how good you seem.";

/** The thesis, read word by word as you scroll — the page literally makes you slow down for it. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const words = LINE.split(" ");

  // Words start at 38% opacity — enough for WCAG large-text contrast — and resolve to full as you read.
  useMotion(root, (mm, { gsap }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-word]",
        { opacity: (_: number, el: Element) => (el.classList.contains("text-copper-2") ? 0.64 : 0.38) },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-line]", start: "top 78%", end: "bottom 42%", scrub: 0.6 },
        },
      );
    });
  });


  return (
    <section ref={root} className="relative bg-ink py-section" aria-labelledby="manifesto">
      <div className="wrap">
        <h2 id="manifesto" data-line="" className="display-lg max-w-[17.5ch] text-bone">
          {words.map((w, i) => {
            const last = i >= words.length - 1;
            return (
              <span key={i} data-word="" className={last ? "text-copper-2" : undefined}>
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            );
          })}
        </h2>

        <div className="mt-14 grid md:mt-24 md:grid-cols-12">
          <p className="lede text-bone-2 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7" data-reveal="">
            Past a certain level, more advertising stops helping. A practice can run ads for a decade and still be chosen
            on price, compared on convenience and referred by accident. The most booked-out names in cosmetic dentistry
            are rarely the best marketed. They are the clearest about who they are and who they are for.
          </p>
        </div>
      </div>
    </section>
  );
}
