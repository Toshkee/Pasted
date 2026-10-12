import { FilmCard } from "@/components/media/FilmCard";
import { Eyebrow, TextLink } from "@/components/ui/Button";
import { filmBySlug } from "@/content/films";
import { caseBySlug } from "@/content/work";

/** The feature: one partner, one arc — HALO Veneers, from struggling GP to a category of one. */
export function FeatureCase() {
  const study = caseBySlug("drew-ballard")!;
  return (
    <section className="relative bg-ink py-28 md:py-40" aria-labelledby="feature-title">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="mx-auto w-full max-w-[24rem] lg:col-span-4 lg:col-start-2 lg:max-w-none" data-reveal="clip">
          <FilmCard film={filmBySlug("drew-ballard")} preview="inview" sizes="(min-width: 1024px) 30vw, 24rem" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow index="§ 05" className="mb-8">
            The feature · Gilbert, Arizona
          </Eyebrow>
          <h2 id="feature-title" className="display-lg text-bone text-balance" data-reveal="">
            From general practice to <em className="text-copper-2">category of one.</em>
          </h2>
          <div className="mt-10 space-y-5 text-bone-2" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
            <p className="lede">A struggling general practice, competing on everything, owning nothing.</p>
            <p className="max-w-xl">
              Eighteen months in: zero to $2M+ in cosmetic revenue. Five years on: HALO Veneers — a named category with
              one author. Three days a week. Nine months a year. An academy teaching the method to the industry that once
              overlooked it.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-y border-line py-8">
            {study.metrics!.map((m, i) => (
              <div key={m.label} data-reveal="" style={{ "--d": 150 + i * 80 } as React.CSSProperties}>
                <dd className="font-serif text-4xl text-bone md:text-6xl">{m.value}</dd>
                <dt className="eyebrow mt-2 text-mute">{m.label}</dt>
              </div>
            ))}
          </dl>

          <figure className="mt-10" data-reveal="">
            <blockquote className="display-sm text-bone">“{study.quote!.text}”</blockquote>
            <figcaption className="eyebrow mt-4 text-mute">{study.quote!.by}</figcaption>
          </figure>

          <TextLink href="/work/drew-ballard" className="mt-10">
            Read the full case
          </TextLink>
        </div>
      </div>
    </section>
  );
}
