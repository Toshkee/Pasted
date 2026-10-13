"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Arrow } from "@/components/ui/Button";
import { ROSTER, type Partner } from "@/content/partners";
import { cn } from "@/lib/cn";

const ADVANCE_MS = 3400;

/**
 * Desktop: every doctor as a narrow portrait sliver; the active one opens to a full portrait.
 * The row steps through the roster on its own while on screen, and stops for good once someone
 * points at it. Phones get a swipe rail of portraits.
 */
export function RosterPanels() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const row = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = row.current;
    if (!auto || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearInterval(timer);
        if (e.isIntersecting) timer = window.setInterval(() => setActive((a) => (a + 1) % ROSTER.length), ADVANCE_MS);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [auto]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <>
      <ul ref={row} className="hidden h-[min(40rem,74vh)] gap-1 lg:flex" aria-label="The roster">
        {ROSTER.map((p, i) => {
          const on = i === active;
          return (
            <li
              key={p.slug}
              onPointerEnter={() => select(i)}
              className={cn(
                "relative min-w-0 basis-0 overflow-clip rounded-[0.9rem] bg-ink-3 transition-[flex-grow] duration-700 ease-[var(--ease-out-expo)]",
                on ? "grow-[14]" : "grow",
              )}
            >
              <Panel partner={p} onFocus={() => select(i)} className="absolute inset-0 block outline-none focus-visible:ring-1 focus-visible:ring-bone/60">
                <span className="absolute inset-y-0 left-1/2 w-[36rem] -translate-x-1/2">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="576px"
                    className={cn(
                      "object-cover transition-[filter,opacity] duration-700",
                      on ? "opacity-100 grayscale-0" : "opacity-55 grayscale",
                    )}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-700",
                    on ? "opacity-100" : "opacity-0",
                  )}
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-5 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap text-sm text-bone-2 transition-opacity [writing-mode:vertical-rl] xl:block",
                    on ? "opacity-0 duration-200" : "opacity-100 delay-300 duration-500",
                  )}
                >
                  {p.name.replace(/^Dr\.\s/, "")}
                </span>

                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-[30rem] p-7 transition-[opacity,translate] duration-500",
                    on ? "translate-y-0 opacity-100 delay-300" : "translate-y-3 opacity-0",
                  )}
                >
                  <span className="block font-serif text-4xl leading-tight text-bone">{p.name}</span>
                  <span className="mt-2 block text-sm text-bone-2">
                    {p.city}
                    {p.note && ` · ${p.note}`}
                  </span>
                  {p.work && (
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-bone">
                      Read the case <Arrow />
                    </span>
                  )}
                </span>
              </Panel>
            </li>
          );
        })}
      </ul>

      <ul className="scrollbar-none -mx-gutter flex snap-x snap-mandatory scroll-px-gutter gap-3 overflow-x-auto px-gutter lg:hidden">
        {ROSTER.map((p) => (
          <li key={p.slug} className="w-[58vw] shrink-0 snap-start sm:w-[34vw]">
            <Panel partner={p} className="block">
              <span className="relative block aspect-[4/5] overflow-clip rounded-[0.9rem] bg-ink-3">
                <Image src={p.image} alt="" fill sizes="(min-width: 640px) 34vw, 58vw" className="object-cover" />
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-serif text-xl text-bone">{p.name}</span>
                {p.work && <Arrow className="shrink-0 text-copper" />}
              </span>
              <span className="block text-sm text-mute">{p.city}</span>
            </Panel>
          </li>
        ))}
        <li aria-hidden="true" className="w-px shrink-0" />
      </ul>
    </>
  );
}

/** A doctor with a case study links to it; the rest are plain (but still focusable on desktop). */
function Panel({
  partner,
  className,
  onFocus,
  children,
}: {
  partner: Partner;
  className?: string;
  onFocus?: () => void;
  children: ReactNode;
}) {
  if (partner.work) {
    return (
      <Link href={`/work/${partner.work}`} data-cursor="Case" onFocus={onFocus} className={className}>
        {children}
      </Link>
    );
  }
  return onFocus ? (
    <button type="button" onFocus={onFocus} onClick={onFocus} className={cn("cursor-default text-left", className)}>
      {children}
    </button>
  ) : (
    <div className={className}>{children}</div>
  );
}
