"use client";

import { useRef } from "react";

import { Eyebrow } from "@/components/ui/Button";
import { ICEBERG } from "@/content/partnership";
import { useMotion } from "@/lib/motion";

/**
 * The brand iceberg. On desktop the section is three screens tall with a sticky stage:
 * scrolling lowers you past the waterline, where the 90% that actually decides is revealed.
 * Phones and reduced-motion users get the finished diagram, no scrubbing.
 */
export function Iceberg() {
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useMotion(root, (mm, { gsap }) => {
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const n = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      tl.from("[data-visible]", { opacity: 0, y: 24, stagger: 0.04, duration: 0.18 }, 0)
        .from("[data-waterline]", { scaleX: 0, duration: 0.15 }, 0.18)
        .from("[data-sea]", { scaleY: 0, duration: 0.25 }, 0.3)
        .from("[data-invisible]", { opacity: 0, y: 28, stagger: 0.05, duration: 0.2 }, 0.42)
        .to(n, {
          v: 90,
          duration: 0.3,
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(n.v));
          },
        }, 0.42)
        .to("[data-visible]", { opacity: 0.35, duration: 0.15 }, 0.72)
        .from("[data-belief]", { opacity: 0, y: 30, duration: 0.15 }, 0.82);
      const el = counter.current;
      return () => {
        if (el) el.textContent = "90";
      };
    });
  });

  return (
    <section ref={root} className="relative bg-ink lg:h-[300vh]" aria-labelledby="iceberg-title">
      <div className="wrap py-16 lg:sticky lg:top-0 lg:grid lg:h-screen lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-0">
        <div className="lg:col-span-5">
          <Eyebrow className="mb-8">
            The mechanism
          </Eyebrow>
          <h2 id="iceberg-title" className="display-lg text-bone text-balance" data-reveal="">
            Most practices don’t need a new logo. They need clarity.
          </h2>
          <p className="lede mt-8 max-w-md text-bone-2" data-reveal="">
            What patients see versus what actually drives recognition, trust and choice. Ten percent shows. Ninety percent
            decides.
          </p>
          <p data-belief="" className="display-sm mt-12 border-l border-copper pl-6 text-bone">
            Patients don’t buy veneers. <br />
            They buy belief.
          </p>
        </div>

        <figure className="relative mt-14 overflow-clip rounded-[1.25rem] border border-line bg-ink-2 lg:col-span-7 lg:mt-0 lg:h-[78vh]">
          {/* Above the waterline */}
          <div className="relative flex flex-col justify-end px-5 pb-8 pt-24 sm:px-6 lg:h-[34%] lg:px-10 lg:pt-16">
            <div className="absolute right-5 top-4 text-right sm:right-6 lg:right-10">
              <span className="font-serif text-6xl text-bone/90 lg:text-7xl">10%</span>
              <span className="eyebrow block text-mute">Visible</span>
            </div>
            <ul className="flex flex-wrap gap-2 lg:max-w-[80%]">
              {ICEBERG.visible.map((item) => (
                <li
                  key={item}
                  data-visible=""
                  className="rounded-full border border-line-strong px-4 py-2 text-sm text-bone-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Waterline */}
          <div className="relative">
            <div data-waterline="" className="h-px origin-left bg-bone/70" />
            <span className="eyebrow absolute -top-6 right-5 text-bone-2 sm:right-6 lg:right-10">Waterline · what patients see</span>
          </div>

          {/* Below the waterline */}
          <div className="relative px-5 pb-8 pt-8 sm:px-6 lg:h-[66%] lg:px-10 lg:pb-10 lg:pt-12">
            <div
              data-sea=""
              aria-hidden="true"
              className="absolute inset-0 origin-top bg-[linear-gradient(180deg,rgb(75_15_25/0.55)_0%,rgb(26_24_22/0.4)_55%,rgb(11_10_9/0)_100%)]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_70%,rgb(192_133_82/0.14),transparent_70%)]" />
            <ul className="relative grid max-w-xl grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-6">
              {ICEBERG.invisible.map((item) => (
                <li key={item} data-invisible="" className="border-t border-copper/40 pt-3">
                  <span className="font-serif text-[1.35rem] text-bone sm:text-2xl lg:text-3xl">{item}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-10 text-right lg:absolute lg:bottom-10 lg:right-10 lg:mt-0">
              <span className="font-serif text-6xl leading-none text-copper-2 lg:text-[7.5rem]">
                <span ref={counter}>90</span>%
              </span>
              <span className="eyebrow block text-mute">Invisible — and decisive</span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
