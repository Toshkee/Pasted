import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Page } from "@/components/layout/Page";
import { PageHero } from "@/components/layout/PageHero";
import { ClubCards } from "@/components/sections/ClubCards";
import { ConsultCTA } from "@/components/sections/ConsultCTA";
import { RosterIndex } from "@/components/sections/RosterIndex";
import { CaseCover } from "@/components/sections/work/CaseCover";
import { PartnerLogos } from "@/components/sections/work/PartnerLogos";
import { TestimonialWall } from "@/components/sections/work/TestimonialWall";
import { Arrow, Eyebrow } from "@/components/ui/Button";
import { IDENTITIES, TRANSFORMATIONS } from "@/content/work";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Practice transformations and identity systems for the roster — HALO Veneers, Dr. Mikaela Tozzi, Only Fangs, Dr. Nav Atwal, Dr. Serena Wong and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Page>
      <PageHero
        index="Vol. II"
        eyebrow="Selected work"
        title="Built from who they *already are.*"
        lede={
          <p>
            Three practice transformations and nine identity systems — built for doctors on the roster, in their markets,
            in their own voice. Nothing templated.
          </p>
        }
        aside={
          <p className="text-bone-2">
            <span className="font-serif text-6xl text-bone">$100M+</span>
            <span className="eyebrow mt-2 block text-mute">Aesthetic case revenue across partners</span>
          </p>
        }
      />

      {/* Transformations */}
      <section className="bg-ink pb-24 md:pb-36" aria-labelledby="transformations-title">
        <div className="wrap">
          <div className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6">
            <h2 id="transformations-title" className="eyebrow text-bone">
              <span className="text-copper">I.</span> Practice transformations
            </h2>
            <span className="eyebrow text-mute">03</span>
          </div>
          <div className="space-y-24 md:space-y-36">
            {TRANSFORMATIONS.map((c, i) => (
              <article key={c.slug} className="grid items-center gap-10 md:grid-cols-12">
                <Link
                  href={`/work/${c.slug}`}
                  data-cursor="Read"
                  className={cn("group block md:col-span-6", i % 2 === 1 && "md:order-2 md:col-start-7")}
                  aria-label={`Read the case: ${c.name}`}
                >
                  <div data-reveal="clip">
                    <CaseCover
                      slug={c.slug}
                      src={c.cover}
                      alt={c.name}
                      sizes="(min-width: 768px) 48vw, 100vw"
                      className="aspect-[4/5] rounded-[1.1rem]"
                      imageClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>
                <div className={cn("md:col-span-5", i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
                  <p className="eyebrow text-copper">
                    {String(i + 1).padStart(2, "0")} · {c.location}
                  </p>
                  <h3 className="display-lg mt-6 text-bone" data-reveal="">
                    {c.name}
                  </h3>
                  <p className="mt-3 font-serif text-2xl italic text-copper-2" data-reveal="">
                    {c.arc}
                  </p>
                  <p className="mt-8 text-bone-2" data-reveal="">
                    {c.summary}
                  </p>
                  {c.metrics && (
                    <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6">
                      {c.metrics.map((m) => (
                        <div key={m.label}>
                          <dd className="font-serif text-3xl text-bone md:text-4xl">{m.value}</dd>
                          <dt className="eyebrow mt-2 text-[0.625rem] text-mute">{m.label}</dt>
                        </div>
                      ))}
                    </dl>
                  )}
                  <Link href={`/work/${c.slug}`} className="eyebrow group mt-8 inline-flex items-center gap-3 text-bone">
                    <span className="link-underline">Read the case</span>
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Identities */}
      <section data-header="light" className="bg-paper py-24 text-paper-ink md:py-36" aria-labelledby="identities-title">
        <div className="wrap">
          <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow index="II." className="mb-8 text-paper-mute">
                Identity systems
              </Eyebrow>
              <h2 id="identities-title" className="display-lg" data-reveal="">
                Wordmarks, monograms, rooms — <em className="text-copper">in forty-five days.</em>
              </h2>
            </div>
            <p className="lede text-paper-mute md:col-span-4 md:col-start-9" data-reveal="">
              Every system is built in a 45-day sprint, then managed for the life of the partnership — so the brand ages
              like an heirloom, not a trend.
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {IDENTITIES.map((c, i) => (
              <li key={c.slug} data-reveal="" style={{ "--d": (i % 3) * 90 } as React.CSSProperties}>
                <Link href={`/work/${c.slug}`} data-cursor="View" className="group block">
                  <div className="relative">
                    <CaseCover slug={c.slug} src={c.cover} alt={c.name} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" className="aspect-[4/5] rounded-[1rem]" />
                    {c.gallery[2] && (
                      <div className="absolute inset-0 overflow-clip rounded-[1rem] opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                        <Image src={c.gallery[2].src} alt="" fill sizes="(min-width: 1024px) 31vw, 48vw" className="object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-3xl leading-tight">{c.name}</h3>
                      <p className="mt-1 text-sm text-paper-mute">{c.arc}</p>
                    </div>
                    <span className="mt-2 flex size-10 shrink-0 items-center justify-center rounded-full border border-paper-ink/20 transition-colors duration-500 group-hover:border-paper-ink group-hover:bg-paper-ink group-hover:text-paper">
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PartnerLogos index="III." />
      <ClubCards index="IV." />
      <RosterIndex index="V." />
      <TestimonialWall index="VI." />
      <ConsultCTA title="Your story, *told properly.*" />
    </Page>
  );
}
