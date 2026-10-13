import type { Metadata } from "next";
import Image from "next/image";

import artOfRestraint from "@/assets/img/films/one-sheet-art-of-restraint.jpg";
import builtByDesign from "@/assets/img/films/one-sheet-built-by-design.jpg";
import { Page } from "@/components/layout/Page";
import { FilmCard } from "@/components/media/FilmCard";
import { SplitText } from "@/components/motion/SplitText";
import { ConsultCTA } from "@/components/sections/ConsultCTA";
import { FilmLibrary } from "@/components/sections/films/FilmLibrary";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { FILMS, FILM_CATEGORIES, filmBySlug } from "@/content/films";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Films",
  description:
    "Documentaries, portrait films and brand films for the most recognized names in cosmetic dentistry — directed, shot and cut in-house by PASTED.",
  alternates: { canonical: "/films" },
};

export default function FilmsPage() {
  const library = FILMS.filter((f) => f.category !== "Feature");
  return (
    <Page>
      <section className="bg-ink pb-20 pt-28 md:pt-44" aria-labelledby="films-hero">
        <div className="wrap">
          <div data-reveal="auto">
            <Eyebrow className="mb-10">
              Films
            </Eyebrow>
          </div>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <SplitText
              as="h1"
              id="films-hero"
              trigger="auto"
              delay={100}
              text="Not everyone gets documented."
              className="display-xl text-balance md:col-span-9"
            />
            <p className="lede text-bone-2 md:col-span-3" data-reveal="auto" style={{ "--d": 600 } as React.CSSProperties}>
              Documentaries, commercials and practice films for the doctors on the roster, many of them directed by Dr. Alan Clarke.
            </p>
          </div>
          <div className="mt-10 md:mt-24" data-reveal="auto" style={{ "--d": 700 } as React.CSSProperties}>
            <FilmCard film={filmBySlug("the-pasted-partnership")} caption="overlay" preview="inview" priority sizes="(min-width: 1536px) 1440px, 100vw" />
          </div>
        </div>
      </section>

      <section className="bg-ink pb-16 md:pb-36" aria-label="Feature films">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {["the-human-edge", "on-restraint"].map((slug, i) => (
            <div key={slug} data-reveal="" style={{ "--d": i * 120 } as React.CSSProperties}>
              <FilmCard film={filmBySlug(slug)} caption="overlay" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-16 md:py-36" aria-labelledby="archive-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="archive-title" className="display-lg text-bone" data-reveal="">
              Long form lives on Pasted Series.
            </h2>
            <p className="lede mt-8 text-bone-2" data-reveal="">
              <em>The Art of Restraint</em>, on the work of Dr. Marshall Hanson. <em>Built by Design</em>, on the work of
              Dr. Jon Marashi. Both directed by Dr. Alan Clarke — and the complete run of documentaries, commercials and
              shorts beside them.
            </p>
            <ButtonLink href={SITE.houses[0].href} external variant="outline" className="mt-10">
              Enter the archive
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:col-span-6 lg:col-start-7">
            {[
              { src: artOfRestraint, alt: "The Art of Restraint — one-sheet" },
              { src: builtByDesign, alt: "Built by Design — one-sheet" },
            ].map((p, i) => (
              <a
                key={p.alt}
                href={SITE.houses[0].href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Archive"
                className={i === 1 ? "group block translate-y-10" : "group block"}
              >
                <div className="relative aspect-[1809/2560] overflow-clip rounded-[0.6rem] shadow-2xl shadow-black/50" data-reveal="" style={{ "--d": i * 140 } as React.CSSProperties}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 24vw, 46vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-36" aria-labelledby="library-title">
        <div className="wrap">
          <h2 id="library-title" className="display-lg mb-14 text-bone" data-reveal="">
            Portraits, gatherings, brands.
          </h2>
          <FilmLibrary films={library} categories={FILM_CATEGORIES.filter((c) => c !== "Feature")} />
        </div>
      </section>

      <ConsultCTA title="Commission a film." lede="Brand films, documentaries and practice films — directed by Dr. Alan Clarke and the house team. Every shoot starts with a 45-minute call." />
    </Page>
  );
}
