import Image from "next/image";

import { TESTIMONIALS } from "@/content/testimonials";

export function TestimonialWall() {
  return (
    <section className="bg-ink py-16 md:py-36" aria-labelledby="wall-title">
      <div className="wrap">
        <h2 id="wall-title" className="display-lg mb-16 max-w-[14ch] text-bone md:mb-24" data-reveal="">
          Twelve doctors on working with PASTED.
        </h2>
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="mb-6 break-inside-avoid rounded-[1.1rem] border border-line bg-ink-2 p-7 md:p-9"
              data-reveal=""
              style={{ "--d": (i % 3) * 90 } as React.CSSProperties}
            >
              <p className="display-sm text-bone">“{t.pull}”</p>
              <blockquote className="mt-5 text-[0.95rem] leading-relaxed text-bone-2">{t.quote}</blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                {t.image ? (
                  <span className="relative block size-11 shrink-0 overflow-clip rounded-full">
                    <Image src={t.image} alt="" fill sizes="44px" className="object-cover grayscale" />
                  </span>
                ) : (
                  <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong font-serif text-lg text-bone-2">
                    {t.name.replace("Dr. ", "")[0]}
                  </span>
                )}
                <span>
                  <span className="block font-serif text-xl text-bone">{t.name}</span>
                  <span className="mt-0.5 block text-sm text-mute">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
