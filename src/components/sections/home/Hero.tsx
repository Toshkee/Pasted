import { getImageProps } from "next/image";

import posterDesktop from "@/assets/img/hero/poster-desktop.jpg";
import posterMobile from "@/assets/img/hero/poster-mobile.jpg";
import { PlayFilmButton } from "@/components/media/PlayFilmButton";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { PlayGlyph } from "@/components/ui/PlayButton";
import { SITE } from "@/content/site";

import { HeroStage } from "./HeroStage";

/**
 * The poster is art-directed (landscape crop on desktop, portrait crop on phones) and painted
 * immediately as the LCP element; the 1.5 MB film loop fades in over it once it is actually playing.
 */
function HeroPoster() {
  const common = { alt: "", sizes: "100vw", quality: 75 } as const;
  const { props: desktop } = getImageProps({ ...common, src: posterDesktop, fetchPriority: "high" });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: posterMobile });
  return (
    <picture>
      <source media="(max-width: 767px) and (orientation: portrait)" srcSet={mobileSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...desktop} className="absolute inset-0 size-full object-cover" />
    </picture>
  );
}

export function Hero() {
  return (
    <HeroStage poster={<HeroPoster />} filmId={SITE.heroFilmId}>
      <div className="flex items-center justify-between gap-6 pt-24 lg:pt-28" data-reveal="auto" style={{ "--d": 900 } as React.CSSProperties}>
        <p className="eyebrow text-bone-2">The standard in aesthetic dentistry</p>
      </div>

      <div className="mt-auto">
        <SplitText
          as="h1"
          trigger="auto"
          delay={150}
          className="display-xl max-w-[12ch] text-bone text-balance"
          text={"Branding makes you recognizable. Positioning makes you *inevitable.*"}
        />

        <div className="mt-10 grid items-end gap-8 border-t border-bone/15 pt-8 md:grid-cols-12 lg:mt-14">
          <p
            className="lede max-w-md text-bone-2 max-sm:text-[0.98rem] md:col-span-5"
            data-reveal="auto"
            style={{ "--d": 700 } as React.CSSProperties}
          >
            PASTED is the operating partner behind the most recognized names in cosmetic dentistry: brand, film, content
            and growth, all made in-house.
          </p>
          <div
            className="flex flex-wrap items-center gap-3 md:col-span-7 md:justify-end"
            data-reveal="auto"
            style={{ "--d": 850 } as React.CSSProperties}
          >
            <ButtonLink href="/contact" variant="solid" size="lg">
              Request a consultation
            </ButtonLink>
            <ButtonLink href="/partnership" variant="outline" size="lg" className="hidden sm:inline-flex">
              The partnership
            </ButtonLink>
            <PlayFilmButton
              film={{ wistiaId: SITE.heroFilmId, title: "The PASTED Partnership", orientation: "landscape" }}
              className="flex items-center gap-3 md:hidden"
            >
              <PlayGlyph size="sm" />
              <span className="eyebrow text-bone">Watch the film · 1:28</span>
            </PlayFilmButton>
          </div>
        </div>
      </div>
    </HeroStage>
  );
}
