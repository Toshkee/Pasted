import { FilmCard } from "@/components/media/FilmCard";
import { DragScroll } from "@/components/motion/DragScroll";
import { SplitText } from "@/components/motion/SplitText";
import { TextLink } from "@/components/ui/Button";
import { filmBySlug } from "@/content/films";

const RAIL = [
  "cole-herzik",
  "sam-saleh-presents",
  "serena-wong",
  "broke-to-billionaire",
  "verde-river",
  "solventum",
  "naweed-mahmood",
  "pasted-2025",
  "smiletrend-mastering-veneers",
].map(filmBySlug);

export function FilmsRail() {
  return (
    <section className="relative overflow-clip bg-ink-2 py-section" aria-labelledby="films-title">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SplitText
              as="h2"
              id="films-title"
              className="display-xl text-bone"
              text="Not everyone gets documented."
            />
          </div>
          <p className="lede max-w-sm text-bone-2 md:col-span-4" data-reveal="">
            Documentaries, commercials and practice films, directed, shot and cut by the studio’s own crew.
          </p>
        </div>

        <div className="mt-head" data-reveal="">
          <FilmCard
            film={filmBySlug("the-human-edge")}
            caption="overlay"
            preview="inview"
            sizes="(min-width: 1536px) 1440px, 100vw"
          />
        </div>
      </div>

      <DragScroll label="Partner films" className="mt-8 scroll-px-bleed gap-4 px-bleed pb-2 md:mt-10 md:gap-5">
        {RAIL.map((film) => (
          <div key={film.slug} className="w-[62vw] shrink-0 snap-start sm:w-[36vw] md:w-[26vw] lg:w-[19vw]">
            <FilmCard film={film} />
          </div>
        ))}
        <div aria-hidden="true" className="w-px shrink-0" />
      </DragScroll>

      <div className="wrap mt-10 md:mt-12">
        <TextLink href="/films">Enter the film library</TextLink>
      </div>
    </section>
  );
}
