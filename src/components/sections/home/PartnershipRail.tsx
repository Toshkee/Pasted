import Image from "next/image";

import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { COMPONENTS } from "@/content/partnership";

/** "What a partnership is" — seven parts on a horizontal track (pinned on desktop, swipe on phones). */
export function PartnershipRail() {
  return (
    <HorizontalScroll
      className="relative overflow-clip bg-ink-2 py-16 lg:flex lg:h-screen lg:items-center lg:py-0"
      aria-labelledby="partnership-title"
    >
      <div
        data-track=""
        className="scrollbar-none flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:scroll-px-7 sm:gap-5 sm:px-7 lg:snap-none lg:gap-8 lg:overflow-visible lg:px-11"
      >
        <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-center pr-2 sm:w-[60vw] lg:w-[38vw] lg:pr-16">
          <Eyebrow index="§ 03" className="mb-8">
            The partnership
          </Eyebrow>
          <h2 id="partnership-title" className="display-lg text-bone text-balance">
            Not a retainer. An <em className="text-copper-2">operating seat.</em>
          </h2>
          <p className="lede mt-8 max-w-md text-bone-2">
            Seven parts, held to one standard, run by the founders and a named team. No account managers. No handoffs.
          </p>
          <p className="eyebrow mt-10 hidden items-center gap-3 text-mute lg:flex">
            Keep scrolling
            <span aria-hidden="true" className="h-px w-10 bg-current" />
          </p>
          <p className="eyebrow mt-8 flex items-center gap-3 text-mute lg:hidden">
            Swipe
            <span aria-hidden="true" className="h-px w-10 bg-current" />
          </p>
        </div>

        {COMPONENTS.map((c) => (
          <article key={c.n} className="group w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[27vw] lg:min-w-[340px]">
            <div className="relative aspect-[4/5] overflow-clip rounded-[1rem] bg-ink-3">
              <div data-drift="" className="absolute inset-y-0 -left-[10%] w-[120%]">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="object-cover brightness-[0.78] transition-[transform,filter] duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:brightness-100"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(11_10_9/0.85))]" />
              <span className="absolute left-5 top-4 font-serif text-5xl text-bone/90">{c.n}</span>
            </div>
            <h3 className="display-sm mt-5 text-bone md:mt-6">{c.title}</h3>
            <p className="mt-2 max-w-sm text-[0.95rem] text-bone-2 md:mt-3 md:text-base">{c.body}</p>
          </article>
        ))}

        <div className="flex w-[76vw] shrink-0 snap-start flex-col justify-center rounded-[1rem] border border-line bg-ink p-6 sm:w-[46vw] sm:p-8 lg:w-[30vw] lg:p-12">
          <p className="display-md text-bone">
            You do the dentistry. <em className="text-copper-2">We do everything else.</em>
          </p>
          <ButtonLink href="/partnership" variant="solid" className="mt-10 self-start">
            How it works
          </ButtonLink>
        </div>
        <div aria-hidden="true" className="w-1 shrink-0 lg:w-[4vw]" />
      </div>

      <div aria-hidden="true" className="absolute inset-x-11 bottom-10 hidden h-px bg-line lg:block">
        <div data-progress="" className="h-full origin-left bg-copper" />
      </div>
    </HorizontalScroll>
  );
}
