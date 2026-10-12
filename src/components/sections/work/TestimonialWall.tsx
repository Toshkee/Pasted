import Image from "next/image";

import { Eyebrow } from "@/components/ui/Button";
import { TESTIMONIALS } from "@/content/testimonials";

export function TestimonialWall({ index = "§" }: { index?: string }) {
  return (
    <section className="bg-ink py-24 md:py-36" aria-labelledby="wall-title">
      <div className="wrap">
        <Eyebrow index={index} className="mb-8">
          In their words
        </Eyebrow>
        <h2 id="wall-title" className="display-lg mb-16 max-w-[18ch] text-bone md:mb-24" data-reveal="">
          Twelve doctors. <em className="text-copper-2">No scripts.</em>
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
                  <span className="eyebrow mt-0.5 block text-[0.625rem] text-mute">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
