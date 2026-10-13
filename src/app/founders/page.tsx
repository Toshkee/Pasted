import type { Metadata } from "next";
import Image from "next/image";

import redCarpet from "@/assets/img/founders/editorial-red-carpet.jpg";
import { Page } from "@/components/layout/Page";
import { FilmCard } from "@/components/media/FilmCard";
import { SplitText } from "@/components/motion/SplitText";
import { Parallax } from "@/components/motion/Parallax";
import { ClubCards } from "@/components/sections/ClubCards";
import { ConsultCTA } from "@/components/sections/ConsultCTA";
import { PressMarquee } from "@/components/sections/PressMarquee";
import { Eyebrow } from "@/components/ui/Button";
import { filmBySlug } from "@/content/films";
import { FOUNDERS, GATHERINGS } from "@/content/founders";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Founders",
  description:
    "Zac Orender and Dr. Alan Clarke, the strategist and the clinician behind PASTED. Every brand the studio builds runs through them.",
  alternates: { canonical: "/founders" },
};

const FOUNDER_FILMS: Record<string, string> = { "zac-orender": "on-zac", "alan-clarke": "on-restraint" };

export default function FoundersPage() {
  return (
    <Page>
      {/* Hero: two portraits, one standard */}
      <section className="bg-ink pt-28 md:pt-44" aria-labelledby="founders-title">
        <div className="wrap">
          <div data-reveal="auto">
            <Eyebrow className="mb-10">
              The founders
            </Eyebrow>
          </div>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <SplitText
              as="h1"
              id="founders-title"
              trigger="auto"
              text={"Zac Orender and Dr.\u00a0Alan Clarke."}
              className="display-xl md:col-span-7"
            />
            <p className="lede text-bone-2 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal="auto" style={{ "--d": 500 } as React.CSSProperties}>
              Every brand PASTED builds runs through the same two people, a strategist and a clinician. They are the ones on
              the discovery call, and the ones on set.
            </p>
          </div>
          <div className="mt-head grid grid-cols-2 gap-3 md:gap-6">
            {FOUNDERS.map((f, i) => (
              <a key={f.slug} href={`#${f.slug}`} className="group block" data-reveal="auto" style={{ "--d": 600 + i * 150 } as React.CSSProperties}>
                <div className="relative aspect-[4/5] overflow-clip rounded-[1.1rem] bg-ink-3">
                  <Image
                    src={f.portrait}
                    alt={f.name}
                    fill
                    preload={i === 0}
                    sizes="50vw"
                    className="object-cover grayscale transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(11_10_9/0.85))]" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 md:p-8">
                    <p className="font-serif text-[1.35rem] leading-[1.05] text-bone sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{f.name}</p>
                    <p className="eyebrow mt-2 hidden text-bone-2 sm:block">{f.role}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Each founder */}
      {FOUNDERS.map((f, i) => {
        const film = filmBySlug(FOUNDER_FILMS[f.slug]);
        return (
          <section key={f.slug} id={f.slug} className={cn("scroll-mt-24 py-section", i === 0 ? "bg-ink" : "border-t border-line bg-ink-2")} aria-labelledby={`${f.slug}-name`}>
            <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className="mb-5 text-sm text-mute">{f.role}</p>
                <h2 id={`${f.slug}-name`} className="display-lg text-bone" data-reveal="">
                  {f.name}
                </h2>
                <blockquote className="display-sm mt-8 border-l border-copper pl-5 text-bone-2 md:mt-10 md:pl-6" data-reveal="">
                  “{f.thesis}”
                </blockquote>
                <ul className="mt-8 flex flex-wrap gap-2 md:mt-10">
                  {f.focus.map((x) => (
                    <li key={x} className="eyebrow rounded-full border border-line-strong px-4 py-2 text-bone-2">
                      {x}
                    </li>
                  ))}
                </ul>
                <a href={`mailto:${f.email}`} className="eyebrow link-underline mt-10 inline-block text-bone">
                  {f.email}
                </a>
              </div>
              <div className="space-y-6 lg:col-span-6 lg:col-start-7">
                {f.bio.map((p, k) => (
                  <p key={k} className={cn(k === 0 ? "display-sm text-bone" : "lede text-bone-2")} data-reveal="" style={{ "--d": k * 100 } as React.CSSProperties}>
                    {p}
                  </p>
                ))}
                <div className={cn("pt-6", film.orientation === "portrait" && "max-w-xs")} data-reveal="">
                  <FilmCard film={film} sizes={film.orientation === "portrait" ? "20rem" : "(min-width: 1024px) 45vw, 100vw"} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Editorial plate */}
      <section className="bg-ink pt-section" aria-label="Editorial">
        <div className="wrap" data-reveal="clip">
          <Parallax className="aspect-[4/3] rounded-[1.1rem] md:aspect-[21/9]">
            <Image src={redCarpet} alt="The founders at a PASTED gathering" fill sizes="(min-width: 1536px) 1440px, 100vw" className="object-cover" />
          </Parallax>
        </div>
      </section>

      {/* Gatherings */}
      <section className="bg-ink py-section" aria-labelledby="gatherings-title">
        <div className="wrap">
          <div className="mb-head grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h2 id="gatherings-title" className="display-lg text-bone" data-reveal="">
                The rooms our partners want to be in.
              </h2>
            </div>
            <p className="lede text-bone-2 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal="">
              Masterminds, private dinners and retreats — off-record, off-camera. We’ve filled those rooms in New York, LA,
              London and Marrakech.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GATHERINGS.map((g, i) => (
              <li key={g.title} className="group" data-reveal="" style={{ "--d": i * 90 } as React.CSSProperties}>
                <div className="relative aspect-[3/4] overflow-clip rounded-[1rem] bg-ink-3">
                  <Image src={g.image} alt="" fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" className="object-cover brightness-75 transition-[transform,filter] duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:brightness-95" />
                  <span className="eyebrow absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1.5 text-bone-2 backdrop-blur-md">{g.place}</span>
                </div>
                <h3 className="display-sm mt-6 text-bone">{g.title}</h3>
                <p className="mt-2 text-bone-2">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClubCards />
      <PressMarquee />
      <ConsultCTA title="Speak to a founder." />
    </Page>
  );
}
