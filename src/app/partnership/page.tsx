import type { Metadata } from "next";
import Image from "next/image";

import corridor from "@/assets/img/studio/case-corridor.jpg";
import { Page } from "@/components/layout/Page";
import { PageHero } from "@/components/layout/PageHero";
import { ConsultCTA } from "@/components/sections/ConsultCTA";
import { MarketChecker } from "@/components/sections/MarketChecker";
import { WorldMap } from "@/components/sections/WorldMap";
import { ComponentsSticky } from "@/components/sections/partnership/ComponentsSticky";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { COMPONENTS, FAQ, FOR, NOT_FOR, STEPS, SURFACES } from "@/content/partnership";

export const metadata: Metadata = {
  title: "The Partnership",
  description:
    "What a PASTED partnership includes: immersion, quarterly cinematic shoots, a year-round body of work, counsel, market exclusivity and full ownership.",
  alternates: { canonical: "/partnership" },
};

export default function PartnershipPage() {
  return (
    <Page>
      <PageHero
        eyebrow="The partnership"
        title="You do the dentistry. We do everything else."
        lede={
          <p>
            PASTED runs positioning, brand, film, content and growth for the practice, with the founders and a named team
            doing the work. It asks for four shoot days a year and two calls a month, and the average partnership runs
            past five years.
          </p>
        }
        image={corridor}
      />

      {/* Seven parts */}
      <section className="bg-ink py-16 md:py-32" aria-labelledby="parts-title">
        <div className="wrap">
          <div className="mb-10 grid gap-8 md:mb-24 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 id="parts-title" className="display-lg text-bone text-balance" data-reveal="">
                The seven parts of a partnership.
              </h2>
            </div>
          </div>
          <ComponentsSticky items={COMPONENTS} />
        </div>
      </section>

      {/* Four surfaces */}
      <section className="border-t border-line bg-ink-2 py-16 md:py-36" aria-labelledby="surfaces-title">
        <div className="wrap">
          <div className="mb-10 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h2 id="surfaces-title" className="display-lg text-bone text-balance" data-reveal="">
                Four surfaces we operate on.
              </h2>
            </div>
            <p className="lede text-bone-2 md:col-span-4 md:col-start-9" data-reveal="">
              Open the one closest to what you need. The discovery call covers the rest.
            </p>
          </div>
          <Accordion
            defaultOpen={0}
            items={SURFACES.map((s) => ({
              title: s.title,
              content: (
                <div className="grid gap-8 md:grid-cols-12">
                  <div className="relative aspect-[16/10] overflow-clip rounded-[0.9rem] md:col-span-5">
                    <Image src={s.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  </div>
                  <div className="md:col-span-6 md:col-start-7">
                    <p className="display-sm text-bone">{s.headline}</p>
                    <p className="mt-4 text-bone-2">{s.body}</p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-bone-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span aria-hidden="true" className="text-copper">
                            ✦
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink href="/contact" variant="outline" className="mt-8">
                      {s.cta}
                    </ButtonLink>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* How it begins */}
      <section className="bg-ink py-16 md:py-36" aria-labelledby="path-title">
        <div className="wrap">
          <h2 id="path-title" className="display-lg text-bone" data-reveal="">
            How it begins.
          </h2>
          <ol className="mt-10 grid gap-px overflow-clip rounded-[1.1rem] border border-line bg-line md:mt-20 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="bg-ink p-6 sm:p-8 md:p-10" data-reveal="" style={{ "--d": i * 120 } as React.CSSProperties}>
                <h3 className="display-sm text-bone">{s.title}</h3>
                <p className="mt-3 text-bone-2">{s.body}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/contact" variant="solid" size="lg" className="mt-10">
            Book the discovery call
          </ButtonLink>
        </div>
      </section>

      {/* Accountability */}
      <section className="border-y border-line bg-ink-2 py-16 md:py-32" aria-labelledby="account-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="account-title" className="display-md text-bone text-balance" data-reveal="">
              What you can hold us to.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:col-span-8">
            <article className="rounded-[1.1rem] border border-line bg-ink p-6 sm:p-8 md:p-10" data-reveal="">
              <p className="text-sm text-copper-2">In the first quarter</p>
              <h3 className="display-sm mt-6 text-bone">No partner ends a term empty-handed.</h3>
              <p className="mt-4 text-bone-2">
                Your first shoot, your locked positioning and live content land in quarter one — or production continues
                until they do.
              </p>
            </article>
            <article className="rounded-[1.1rem] border border-line bg-ink p-6 sm:p-8 md:p-10" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
              <p className="text-sm text-copper-2">Every ninety days</p>
              <h3 className="display-sm mt-6 text-bone">A quarterly value review, in writing.</h3>
              <p className="mt-4 text-bone-2">
                The owned asset counted, reach trend, inbound quality, pricing power — and how the practice now reads against
                its market.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* For / not for */}
      <section className="bg-ink py-16 md:py-36" aria-labelledby="fit-title">
        <div className="wrap">
          <h2 id="fit-title" className="sr-only">
            Who this is for
          </h2>
          <div className="grid gap-12 md:grid-cols-2 md:gap-10">
            <div>
              <p className="display-md text-bone" data-reveal="">
                This is for
              </p>
              <ul className="mt-6 border-t border-line md:mt-10">
                {FOR.map((f, i) => (
                  <li key={f} className="border-b border-line py-5 text-[1.0625rem] leading-snug text-bone md:py-6 md:text-lg" data-reveal="" style={{ "--d": i * 80 } as React.CSSProperties}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="display-md text-mute" data-reveal="">
                This is not for
              </p>
              <ul className="mt-6 border-t border-line md:mt-10">
                {NOT_FOR.map((f, i) => (
                  <li key={f} className="border-b border-line py-5 text-[1.0625rem] leading-snug text-mute line-through decoration-mute/40 md:py-6 md:text-lg" data-reveal="" style={{ "--d": i * 80 } as React.CSSProperties}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WorldMap />
      <MarketChecker />

      {/* FAQ */}
      <section className="bg-ink py-16 md:py-36" aria-labelledby="faq-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="display-md text-bone" data-reveal="">
              Common questions.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={FAQ.map((f) => ({ title: f.q, content: <p className="lede max-w-2xl text-bone-2">{f.a}</p> }))} />
          </div>
        </div>
      </section>

      <ConsultCTA />
    </Page>
  );
}
