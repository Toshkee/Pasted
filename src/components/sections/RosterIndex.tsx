import Image from "next/image";
import Link from "next/link";

import { HoverReveal } from "@/components/motion/HoverReveal";
import { Arrow, Eyebrow } from "@/components/ui/Button";
import { ROSTER } from "@/content/partners";
import { cn } from "@/lib/cn";

/** The roster as an index. Desktop: a portrait follows the cursor. Phones: inline thumbnails. */
export function RosterIndex({ index = "§ 07", showIntro = true }: { index?: string; showIntro?: boolean }) {
  return (
    <section
      className="relative bg-ink py-20 md:py-40"
      aria-labelledby={showIntro ? "roster-title" : undefined}
      aria-label={showIntro ? undefined : "The roster"}
    >
      <div className="wrap">
        {showIntro && (
          <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow index={index} className="mb-8">
                The roster
              </Eyebrow>
              <h2 id="roster-title" className="display-lg text-bone text-balance" data-reveal="">
                Every company has clients. Here, partners’ families know our names —{" "}
                <em className="text-copper-2">and we know theirs.</em>
              </h2>
            </div>
            <div className="md:col-span-4 md:col-start-9" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
              <p className="font-serif text-7xl text-copper-2 md:text-8xl">97%</p>
              <p className="eyebrow mt-2 text-mute">Partner retention</p>
              <p className="mt-6 text-bone-2">
                The roster is small because the work is close. What is built from actually knowing someone cannot be
                copied — and cannot be commoditized.
              </p>
            </div>
          </div>
        )}

        <HoverReveal className="relative">
          <ol className="border-t border-line [&:hover>li]:opacity-45 [&>li:hover]:!opacity-100">
            {ROSTER.map((p, i) => {
              const inner = (
                <>
                  <span className="eyebrow w-8 shrink-0 text-mute md:w-14">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative block size-12 shrink-0 overflow-clip rounded-full md:hidden">
                    <Image src={p.image} alt="" fill sizes="48px" className="graded object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[1.65rem] leading-tight text-bone transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:text-5xl">
                      {p.name}
                    </span>
                    <span className="eyebrow mt-1 block text-mute md:hidden">{p.city}</span>
                  </span>
                  <span className="eyebrow hidden w-56 shrink-0 text-bone-2 md:block">{p.city}</span>
                  <span className="hidden w-56 shrink-0 text-sm text-mute lg:block">{p.note ?? "—"}</span>
                  <span className="w-6 shrink-0 text-copper">{p.work ? <Arrow /> : null}</span>
                </>
              );
              return (
                <li key={p.slug} data-hover-index={i} className="border-b border-line transition-opacity duration-500">
                  {p.work ? (
                    <Link href={`/work/${p.work}`} data-cursor="Case" className="group flex items-center gap-4 py-5 md:gap-6 md:py-7">
                      {inner}
                    </Link>
                  ) : (
                    <div className="group flex items-center gap-4 py-5 md:gap-6 md:py-7">{inner}</div>
                  )}
                </li>
              );
            })}
          </ol>

          <div
            data-hover-stage=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[4/5] w-[17rem] overflow-clip rounded-[0.9rem] opacity-0 shadow-2xl shadow-black/60 transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] md:block"
            style={{ scale: "0.85" }}
          >
            {ROSTER.map((p, i) => (
              <div key={p.slug} data-hover-layer={i} className={cn("absolute inset-0 opacity-0 transition-opacity duration-300")}>
                <Image src={p.image} alt="" fill sizes="272px" className="object-cover" />
              </div>
            ))}
          </div>
        </HoverReveal>
      </div>
    </section>
  );
}
