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
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { COMPONENTS, FAQ, FOR, NOT_FOR, STEPS, SURFACES } from "@/content/partnership";

export const metadata: Metadata = {
  title: "The Partnership",
  description:
    "An operating seat, not a retainer: immersion, quarterly cinematic shoots, a year-round body of work, counsel, market exclusivity and full ownership.",
  alternates: { canonical: "/partnership" },
};

export default function PartnershipPage() {
  return (
    <Page>
      <PageHero
        index="Vol. I"
        eyebrow="The partnership"
        title="You do the dentistry. *We do everything else.*"
        lede={
          <p>
            Not a retainer. Not a scope of work. An operating seat — positioning, brand, film, content and growth, run by
            the founders and a named team, for one practice per market.
          </p>
        }
        aside={
          <dl className="grid grid-cols-2 gap-6">
            {[
              ["4", "Cinematic shoot days a year"],
              ["100+", "Premium pieces a year"],
              ["2", "Calls a month with you"],
              ["5+ yrs", "Average partnership"],
            ].map(([v, l]) => (
              <div key={l}>
                <dd className="font-serif text-4xl text-bone">{v}</dd>
                <dt className="eyebrow mt-1 text-mute">{l}</dt>
              </div>
            ))}
          </dl>
        }
        image={corridor}
        caption="Plate II — The long way in"
      />

      {/* Seven parts */}
      <section className="bg-ink py-24 md:py-32" aria-labelledby="parts-title">
        <div className="wrap">
          <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
            <div className="md:col-span-7">
              <Eyebrow index="§ 01" className="mb-8">
                What a partnership is
              </Eyebrow>
              <h2 id="parts-title" className="display-lg text-bone" data-reveal="">
                Seven parts. <em className="text-copper-2">One standard.</em>
              </h2>
            </div>
          </div>
          <ComponentsSticky items={COMPONENTS} />
        </div>
      </section>

      {/* Four surfaces */}
      <section className="border-t border-line bg-ink-2 py-24 md:py-36" aria-labelledby="surfaces-title">
        <div className="wrap">
          <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow index="§ 02" className="mb-8">
                What we do
              </Eyebrow>
              <h2 id="surfaces-title" className="display-lg text-bone text-balance" data-reveal="">
                Four surfaces we <em className="text-copper-2">operate on.</em>
              </h2>
            </div>
            <p className="lede text-bone-2 md:col-span-4 md:col-start-9" data-reveal="">
              Each built to the same standard. Open the one that matches what you need — or let the call decide.
            </p>
          </div>
          <Accordion
            defaultOpen={0}
            items={SURFACES.map((s) => ({
              meta: s.vol,
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
      <section className="bg-ink py-24 md:py-36" aria-labelledby="path-title">
        <div className="wrap">
          <Eyebrow index="§ 03" className="mb-8">
            The path
          </Eyebrow>
          <h2 id="path-title" className="display-lg text-bone" data-reveal="">
            How it <em className="text-copper-2">begins.</em>
          </h2>
          <ol className="mt-16 grid gap-px overflow-clip rounded-[1.1rem] border border-line bg-line md:mt-20 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.n} className="flex min-h-[18rem] flex-col justify-between bg-ink p-8 md:p-10" data-reveal="" style={{ "--d": i * 120 } as React.CSSProperties}>
                <span className="font-serif text-7xl text-copper-2 md:text-8xl">{s.n}</span>
                <div>
                  <h3 className="display-sm text-bone">{s.title}</h3>
                  <p className="mt-3 text-bone-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact" variant="solid" size="lg">
              Book the discovery call
            </ButtonLink>
            <p className="eyebrow text-mute">Five questions · Two minutes · 45 minutes with a founder</p>
          </div>
        </div>
      </section>

      {/* Accountability */}
      <section className="border-y border-line bg-ink-2 py-24 md:py-32" aria-labelledby="account-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="§ 04" className="mb-8">
              Accountability
            </Eyebrow>
            <h2 id="account-title" className="display-md text-bone" data-reveal="">
              Answers, not <em className="text-copper-2">reassurances.</em>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:col-span-8">
            <article className="rounded-[1.1rem] border border-line bg-ink p-8 md:p-10" data-reveal="">
              <p className="eyebrow text-copper">Quarter one</p>
              <h3 className="display-sm mt-6 text-bone">No partner ends a term empty-handed.</h3>
              <p className="mt-4 text-bone-2">
                Your first shoot, your locked positioning and live content land in quarter one — or production continues
                until they do.
              </p>
            </article>
            <article className="rounded-[1.1rem] border border-line bg-ink p-8 md:p-10" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
              <p className="eyebrow text-copper">Every ninety days</p>
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
      <section className="bg-ink py-24 md:py-36" aria-labelledby="fit-title">
        <div className="wrap">
          <Eyebrow index="§ 05" className="mb-8">
            Fit
          </Eyebrow>
          <h2 id="fit-title" className="sr-only">
            Who this is for
          </h2>
          <div className="grid gap-16 md:grid-cols-2 md:gap-10">
            <div>
              <p className="display-md text-bone" data-reveal="">
                This is <em className="text-copper-2">for</em>
              </p>
              <ul className="mt-10 border-t border-line">
                {FOR.map((f, i) => (
                  <li key={f} className="flex gap-6 border-b border-line py-6 text-lg text-bone" data-reveal="" style={{ "--d": i * 80 } as React.CSSProperties}>
                    <span className="eyebrow pt-1.5 text-copper">{String(i + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="display-md text-mute" data-reveal="">
                This is not for
              </p>
              <ul className="mt-10 border-t border-line">
                {NOT_FOR.map((f, i) => (
                  <li key={f} className="flex gap-6 border-b border-line py-6 text-lg text-mute line-through decoration-mute/40" data-reveal="" style={{ "--d": i * 80 } as React.CSSProperties}>
                    <span className="eyebrow pt-1.5 no-underline">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WorldMap index="§ 06" />
      <MarketChecker />

      {/* FAQ */}
      <section className="bg-ink py-24 md:py-36" aria-labelledby="faq-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="§ 07" className="mb-8">
              Questions worth asking
            </Eyebrow>
            <h2 id="faq-title" className="display-md text-bone" data-reveal="">
              Asked, and <em className="text-copper-2">answered.</em>
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
