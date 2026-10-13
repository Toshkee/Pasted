import Image from "next/image";

import { TiltCard } from "@/components/media/TiltCard";
import { DragScroll } from "@/components/motion/DragScroll";
import { CLUB_CARDS } from "@/content/partners";

/** The graded member cards — a signature PASTED artifact — as a tactile, draggable collection. */
export function ClubCards() {
  return (
    <section data-header="light" className="relative overflow-clip bg-paper py-section text-paper-ink" aria-labelledby="club-title">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 id="club-title" className="display-lg text-balance" data-reveal="">
            The PASTED Club cards.
          </h2>
        </div>
        <p className="lede text-paper-mute md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal="">
          Every partner gets a card that is graded, slabbed and signed. Practices keep them on the shelf, and patients
          ask about them.
        </p>
      </div>

      <DragScroll label="PASTED Club cards" className="mt-head scroll-px-bleed gap-4 px-bleed py-6 sm:gap-6 lg:gap-10">
        {CLUB_CARDS.map((card, i) => (
          <figure key={card.name} className="w-[64vw] shrink-0 snap-start sm:w-[38vw] md:w-[28vw] lg:w-[19vw]" data-reveal="" style={{ "--d": (i % 5) * 80 } as React.CSSProperties}>
            <TiltCard className="rounded-[0.6rem]">
              <div className="relative aspect-[4/5] overflow-clip rounded-[0.6rem] bg-paper-2 shadow-[0_30px_60px_-30px_rgb(28_24_20/0.55)]">
                <Image src={card.image} alt={`${card.name} — PASTED Club card`} fill sizes="(min-width: 1024px) 20vw, 64vw" className="object-cover" />
              </div>
            </TiltCard>
            <figcaption className="mt-5">
              <span className="block font-serif text-2xl">{card.name}</span>
              <span className="eyebrow mt-1 block text-paper-mute">{card.role}</span>
            </figcaption>
          </figure>
        ))}
        <div aria-hidden="true" className="w-px shrink-0" />
      </DragScroll>
    </section>
  );
}
