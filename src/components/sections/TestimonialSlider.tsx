"use client";

import Image from "next/image";
import { useState } from "react";

import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const DURATION = 9000;

/**
 * Auto-advancing testimonials. The progress bar *is* the timer (a CSS animation whose end advances
 * the slide), so it pauses for free on hover/focus — plus an explicit pause control (WCAG 2.2.2).
 */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const current = items[index];
  const stopped = paused || hovered;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <div className="relative aspect-[4/5] w-40 overflow-clip rounded-[0.9rem] bg-ink-3 md:w-full">
            {items.map((t, i) =>
              t.image ? (
                <Image
                  key={t.name}
                  src={t.image}
                  alt={i === index ? t.name : ""}
                  fill
                  sizes="(min-width: 768px) 22vw, 160px"
                  className={cn(
                    "graded object-cover transition-[opacity,scale] duration-[1.2s] ease-[var(--ease-out-expo)]",
                    i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              ) : null,
            )}
          </div>
        </div>

        <figure key={index} className="animate-[fade-rise_1s_var(--ease-out-expo)_both] md:col-span-8 md:col-start-5" aria-live={paused ? "polite" : "off"}>
          <span aria-hidden="true" className="block h-12 font-serif text-[6rem] leading-none text-copper md:h-16 md:text-[8rem]">
            “
          </span>
          <blockquote className="font-serif text-[1.65rem] leading-[1.18] tracking-[-0.01em] text-bone md:text-[2.15rem] lg:text-[2.5rem]">
            {current.quote}
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-serif text-2xl text-bone">{current.name}</span>
            <span className="eyebrow text-mute">{current.role}</span>
          </figcaption>
        </figure>
      </div>

      <div className="mt-16 flex items-start gap-6 border-t border-line pt-6 md:mt-20">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="eyebrow shrink-0 rounded-full border border-line-strong px-4 py-2.5 text-bone-2 transition-colors hover:border-bone hover:text-bone"
          aria-label={paused ? "Resume testimonials" : "Pause testimonials"}
        >
          {paused ? "Play" : "Pause"}
        </button>
        <ul className="scrollbar-none -mx-1 flex flex-1 gap-1 overflow-x-auto px-1">
          {items.map((t, i) => (
            <li key={t.name} className="min-w-[8.5rem] flex-1">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? "true" : undefined}
                className="group block w-full py-2 text-left"
              >
                <span className="relative block h-px w-full bg-line">
                  {i === index && (
                    <span
                      key={`${index}-bar`}
                      className="absolute inset-y-0 left-0 block w-full origin-left bg-copper"
                      style={{
                        animation: `bar ${DURATION}ms linear both`,
                        animationPlayState: stopped ? "paused" : "running",
                      }}
                      onAnimationEnd={() => setIndex((i + 1) % items.length)}
                    />
                  )}
                  {i < index && <span className="absolute inset-0 block bg-bone/40" />}
                </span>
                <span
                  className={cn(
                    "eyebrow mt-3 block truncate transition-colors",
                    i === index ? "text-bone" : "text-mute group-hover:text-bone-2",
                  )}
                >
                  {t.name.replace("Dr. ", "")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
