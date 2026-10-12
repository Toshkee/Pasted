import Image from "next/image";

import { TiltCard } from "@/components/media/TiltCard";
import { DragScroll } from "@/components/motion/DragScroll";
import { Eyebrow } from "@/components/ui/Button";
import { CLUB_CARDS } from "@/content/partners";

/** The graded member cards — a signature PASTED artifact — as a tactile, draggable collection. */
export function ClubCards({ index = "§" }: { index?: string }) {
  return (
    <section data-header="light" className="relative overflow-clip bg-paper py-28 text-paper-ink md:py-40" aria-labelledby="club-title">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow index={index} className="mb-8 text-paper-mute">
            The PASTED Club
          </Eyebrow>
          <h2 id="club-title" className="display-lg text-balance" data-reveal="">
            Graded, slabbed and <em className="text-copper">signed.</em>
          </h2>
        </div>
        <p className="lede text-paper-mute md:col-span-4 md:col-start-9" data-reveal="">
          Each card is graded, slabbed and signed: part trophy, part brand asset — the kind of object a practice keeps on
          the shelf, and a patient asks about.
        </p>
      </div>

      <DragScroll label="PASTED Club cards" className="mt-16 scroll-px-4 gap-6 px-4 py-6 sm:scroll-px-7 sm:px-7 md:mt-24 lg:scroll-px-11 lg:gap-10 lg:px-11">
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
