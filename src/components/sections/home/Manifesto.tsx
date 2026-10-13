"use client";

import { useRef } from "react";

import { Eyebrow } from "@/components/ui/Button";
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
    <section ref={root} className="relative bg-ink py-20 md:py-40 lg:py-52" aria-labelledby="manifesto">
      <div className="wrap">
        <Eyebrow className="mb-10 md:mb-14">
          The argument
        </Eyebrow>
        <h2 id="manifesto" data-line="" className="display-lg max-w-[22ch] text-bone">
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

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
          <p className="lede text-bone-2 md:col-span-5 md:col-start-2" data-reveal="">
            Past a certain level, a practice does not have a marketing problem. It has a positioning problem. Marketing
            buys attention. Position decides what that attention concludes.
          </p>
          <div className="md:col-span-5 md:col-start-8" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
            <p className="lede text-bone-2">
              A practice can run ads for a decade and remain interchangeable — chosen on price, compared on convenience,
              referred by accident. The most booked-out names in this field are not the best marketed. They are the best
              positioned.
            </p>
            <p className="display-sm mt-8 text-bone">
              Marketing is rent. A brand is equity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
