"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Component } from "@/content/partnership";
import { cn } from "@/lib/cn";

/**
 * Seven parts of the partnership. On desktop a sticky plate on the left follows whichever part sits
 * in the middle of the viewport; on phones every part carries its own image inline.
 */
export function ComponentsSticky({ items }: { items: Component[] }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const rows = Array.from(list.current?.querySelectorAll<HTMLElement>("[data-step]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] max-h-[72vh] overflow-clip rounded-[1.1rem] bg-ink-3">
            {items.map((c, i) => (
              <Image
                key={c.n}
                src={c.image}
                alt=""
                fill
                sizes="40vw"
                className={cn(
                  "object-cover transition-[opacity,scale,filter] duration-[1.1s] ease-[var(--ease-out-expo)]",
                  i === active ? "scale-100 opacity-100 brightness-90" : "scale-110 opacity-0 brightness-50",
                )}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(11_10_9/0.8))]" />
            <div className="absolute bottom-6 left-6 flex items-end gap-4">
              <span className="font-serif text-8xl leading-none text-bone">{items[active].n}</span>
              <span className="eyebrow mb-2 text-bone-2">of 07</span>
            </div>
          </div>
        </div>
      </div>

      <ol ref={list} className="lg:col-span-6 lg:col-start-7">
        {items.map((c, i) => (
          <li
            key={c.n}
            data-step={i}
            className={cn(
              "border-t border-line py-10 transition-opacity duration-700 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-16",
              i === active ? "lg:opacity-100" : "lg:opacity-35",
            )}
          >
            <div className="relative mb-6 aspect-[16/10] overflow-clip rounded-[0.9rem] lg:hidden">
              <Image src={c.image} alt="" fill sizes="100vw" className="object-cover brightness-90" />
            </div>
            <span className="eyebrow text-copper">{c.n} / 07</span>
            <h3 className="display-md mt-4 text-bone">{c.title}</h3>
            <p className="lede mt-5 max-w-lg text-bone-2">{c.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
