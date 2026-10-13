import { FilmCard } from "@/components/media/FilmCard";
import { TextLink } from "@/components/ui/Button";
import { filmBySlug } from "@/content/films";
import { caseBySlug } from "@/content/work";

/** The feature: one partner, one arc — HALO Veneers, from struggling GP to a category of one. */
export function FeatureCase() {
  const study = caseBySlug("drew-ballard")!;
  return (
    <section className="relative bg-ink py-20 md:py-40" aria-labelledby="feature-title">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="mx-auto w-full max-w-[24rem] lg:col-span-4 lg:col-start-2 lg:max-w-none" data-reveal="clip">
          <FilmCard film={filmBySlug("drew-ballard")} preview="inview" sizes="(min-width: 1024px) 30vw, 24rem" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="feature-title" className="display-lg text-bone text-balance" data-reveal="">
            From general practice to category of one.
          </h2>
          <div className="mt-10 space-y-5 text-bone-2" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
            <p className="lede">Dr. Drew Ballard was running a general practice in Gilbert, Arizona, competing with every other dentist in town.</p>
            <p className="max-w-xl">
              Eighteen months into the partnership, the practice had gone from no cosmetic revenue to more than $2M a year.
              Five years on it trades as HALO Veneers, Drew works three days a week, nine months a year, and his academy
              teaches the method to other dentists.
            </p>
          </div>

          <figure className="mt-12 border-t border-line pt-10" data-reveal="">
            <blockquote className="display-sm text-bone">“{study.quote!.text}”</blockquote>
            <figcaption className="mt-4 text-sm text-mute">{study.quote!.by}</figcaption>
          </figure>

          <TextLink href="/work/drew-ballard" className="mt-10">
            Read the full case
          </TextLink>
        </div>
      </div>
    </section>
  );
}
