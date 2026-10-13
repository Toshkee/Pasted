import type { Metadata } from "next";
import Image from "next/image";

import doctrine from "@/assets/img/library/doctrine-backdrop.jpg";
import plateDeparture from "@/assets/img/library/plate-departure.jpg";
import plateRoom from "@/assets/img/library/plate-room.jpg";
import cover from "@/assets/img/studio/library-cover.jpg";
import { Page } from "@/components/layout/Page";
import { PageHero } from "@/components/layout/PageHero";
import { Parallax } from "@/components/motion/Parallax";
import { ConsultCTA } from "@/components/sections/ConsultCTA";
import { InsiderForm } from "@/components/sections/library/InsiderForm";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { ARCHITECTURE, SECTIONS, VOLUMES } from "@/content/library";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "The Library",
  description:
    "A private canon on becoming undeniable — volumes, dispatches and doctrine on what iconic dentistry is built from. Volume I: The Art of Becoming.",
  alternates: { canonical: "/library" },
};

export default function LibraryPage() {
  return (
    <Page>
      <PageHero
        tone="paper"
        eyebrow="The PASTED Library"
        title="A private canon on becoming undeniable."
        lede={
          <p>
            Volumes, dispatches and doctrine on what iconic dentistry is built from. Unsponsored, unsyndicated — the
            working doctrine we apply with our partners, published because the gap is real.
          </p>
        }
        aside={
          <p className="text-paper-mute">
            Dental practices are being outspent by operators who understand how brands compound. The Library exists to close
            that gap — one volume at a time, released when finished.
          </p>
        }
        image={cover}
      />

      {/* Volumes */}
      <section data-header="light" className="bg-paper pb-24 text-paper-ink md:pb-36" aria-labelledby="volumes-title">
        <div className="wrap">
          <Eyebrow className="mb-8 text-paper-mute">
            The canon, in circulation
          </Eyebrow>
          <h2 id="volumes-title" className="sr-only">
            Volumes
          </h2>
          <ol className="border-t border-paper-ink/20">
            {VOLUMES.map((v, i) => (
              <li key={v.n} className="grid gap-6 border-b border-paper-ink/20 py-10 md:grid-cols-12 md:items-center md:py-14" data-reveal="" style={{ "--d": i * 100 } as React.CSSProperties}>
                <span className="eyebrow text-copper-ink md:col-span-2">{v.n}</span>
                <div className="md:col-span-6">
                  <p className={cn("display-lg", i > 0 && "text-paper-ink/45")}>{v.title}</p>
                  <p className="mt-4 max-w-lg text-paper-mute">{v.body}</p>
                </div>
                <div className="flex flex-col items-start gap-4 md:col-span-3 md:col-start-10 md:items-end">
                  <span className={cn("eyebrow rounded-full border px-4 py-2", i === 0 ? "border-copper text-copper-ink" : "border-paper-ink/20 text-paper-mute")}>
                    {v.status}
                  </span>
                  {"href" in v && v.href && (
                    <ButtonLink href={v.href} external variant="ink">
                      Open Volume I
                    </ButtonLink>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Five-part architecture */}
      <section className="bg-ink py-16 md:py-36" aria-labelledby="arch-title">
        <div className="wrap">
          <div className="mb-10 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow className="mb-8">
                Inside Volume I
              </Eyebrow>
              <h2 id="arch-title" className="display-lg text-bone" data-reveal="">
                The five-part architecture.
              </h2>
            </div>
            <p className="lede text-bone-2 md:col-span-4 md:col-start-9" data-reveal="">
              Twelve sections, forty answers, about ninety minutes. What comes out the other side is a brand brief you can
              actually run a practice on.
            </p>
          </div>
          <ol className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
            {ARCHITECTURE.map((a, i) => (
              <li key={a.title} className={cn("group", i % 2 === 1 && "lg:mt-24")} data-reveal="" style={{ "--d": i * 90 } as React.CSSProperties}>
                <div className="relative aspect-[3/4] overflow-clip rounded-[0.9rem] bg-ink-3">
                  <Image src={a.image} alt="" fill sizes="(min-width: 1024px) 19vw, (min-width: 640px) 48vw, 100vw" className="object-cover sepia-[0.25] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                </div>
                <h3 className="display-sm mt-6 text-bone">{a.title}</h3>
                <p className="mt-1 font-serif text-xl text-bone-2">{a.question}</p>
                <p className="mt-3 text-sm leading-relaxed text-bone-2">{a.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contents */}
      <section data-header="light" className="bg-paper py-24 text-paper-ink md:py-36" aria-labelledby="contents-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-8 text-paper-mute">
              Contents
            </Eyebrow>
            <h2 id="contents-title" className="display-lg" data-reveal="">
              The Art of Becoming.
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-4" data-reveal="">
              {[plateDeparture, plateRoom].map((p, i) => (
                <div key={i} className={cn("relative aspect-[3/4] overflow-clip rounded-[0.6rem]", i === 1 && "translate-y-10")}>
                  <Image src={p} alt="" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {SECTIONS.map((s, i) => (
              <li key={s} className="border-b border-paper-ink/15 py-4 font-serif text-2xl md:text-3xl" data-reveal="" style={{ "--d": i * 40 } as React.CSSProperties}>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Doctrine */}
      <section className="relative overflow-clip bg-ink" aria-label="The PASTED House Doctrine">
        <div className="absolute inset-0">
          <Parallax className="size-full" amount={16}>
            <Image src={doctrine} alt="" fill sizes="100vw" className="object-cover opacity-45" />
          </Parallax>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_10_9/0.6),rgb(11_10_9/0.85))]" />
        <figure className="wrap relative py-24 text-center md:py-52">
          <blockquote className="display-lg mx-auto max-w-[19ch] text-bone" data-reveal="">
            “A brand is the only load-bearing wall in a practice. Build it wrong and everything else eventually sags.”
          </blockquote>
          <figcaption className="eyebrow mt-10 text-bone-2">The PASTED House Doctrine</figcaption>
        </figure>
      </section>

      {/* Insider */}
      <section data-header="light" className="bg-paper py-24 text-paper-ink md:py-36" aria-labelledby="insider-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-8 text-paper-mute">
              The PASTED Insider
            </Eyebrow>
            <h2 id="insider-title" className="display-lg" data-reveal="">
              Take your seat at the library.
            </h2>
            <p className="lede mt-8 text-paper-mute" data-reveal="">
              A weekly private broadcast — dispatches, teardowns and early chapters of the next volume. Members read it
              first.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <InsiderForm />
          </div>
        </div>
      </section>

      <ConsultCTA title="Talk it through with a founder." />
    </Page>
  );
}
