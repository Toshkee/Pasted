import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Page } from "@/components/layout/Page";
import { FilmCard } from "@/components/media/FilmCard";
import { SplitText } from "@/components/motion/SplitText";
import { ConsultCTA } from "@/components/sections/ConsultCTA";
import { CaseCover } from "@/components/sections/work/CaseCover";
import { Arrow, Eyebrow } from "@/components/ui/Button";
import { filmBySlug } from "@/content/films";
import { CASES, caseBySlug } from "@/content/work";
import { cn } from "@/lib/cn";

/**
 * Every case is prerendered via generateStaticParams; only unknown slugs reach the server, and those
 * should block and return a real 404 rather than stream a shell.
 */
export const instant = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.name} — ${study.arc}`,
    description: study.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { images: [{ url: study.cover.src, width: study.cover.width, height: study.cover.height }] },
  };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseBySlug(slug);
  if (!study) notFound();

  const i = CASES.indexOf(study);
  const next = CASES[(i + 1) % CASES.length];
  const film = study.film ? filmBySlug(study.film) : undefined;
  const portraitFilm = film?.orientation === "portrait";

  return (
    <Page>
      {/* Hero */}
      <section className="relative bg-ink pt-32 md:pt-40" aria-labelledby="case-title">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="eyebrow mb-10 flex items-center gap-3 text-mute" data-reveal="auto">
            <Link href="/work" className="link-underline hover:text-bone">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-bone-2">{study.kind}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SplitText as="h1" id="case-title" trigger="auto" text={study.name} className="display-xl text-bone" />
              <p className="mt-6 font-serif text-3xl italic text-copper-2 md:text-4xl" data-reveal="auto" style={{ "--d": 450 } as React.CSSProperties}>
                {study.arc}
              </p>
              <p className="lede mt-10 max-w-xl text-bone-2" data-reveal="auto" style={{ "--d": 600 } as React.CSSProperties}>
                {study.summary}
              </p>
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6" data-reveal="auto" style={{ "--d": 750 } as React.CSSProperties}>
                {study.location && (
                  <div>
                    <dt className="eyebrow text-mute">Market</dt>
                    <dd className="mt-1 text-bone">{study.location}</dd>
                  </div>
                )}
                <div>
                  <dt className="eyebrow text-mute">Engagement</dt>
                  <dd className="mt-1 text-bone">{study.kind}</dd>
                </div>
                {study.timeline && (
                  <div>
                    <dt className="eyebrow text-mute">Timeline</dt>
                    <dd className="mt-1 text-bone">{study.timeline}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="lg:col-span-5">
              <CaseCover slug={study.slug} src={study.cover} alt={study.name} preload sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[1.1rem]" />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      {study.metrics && (
        <section aria-label="Results" className="mt-24 border-y border-line bg-ink md:mt-32">
          <dl className="wrap grid sm:grid-cols-3">
            {study.metrics.map((m, k) => (
              <div key={m.label} className={cn("py-10 md:py-14", k > 0 && "border-t border-line sm:border-l sm:border-t-0 sm:pl-8")} data-reveal="" style={{ "--d": k * 90 } as React.CSSProperties}>
                <dd className="font-serif text-6xl text-bone md:text-7xl">{m.value}</dd>
                <dt className="eyebrow mt-3 text-mute">{m.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Challenge / work */}
      <section className="bg-ink py-24 md:py-36" aria-label="The story">
        <div className="wrap grid gap-16 md:grid-cols-2 md:gap-12">
          {[
            ["01", "The challenge", study.challenge],
            ["02", "The work", study.work],
          ].map(([n, label, body], k) => (
            <div key={n} data-reveal="" style={{ "--d": k * 120 } as React.CSSProperties}>
              <Eyebrow index={n} className="mb-8">
                {label}
              </Eyebrow>
              <p className="display-sm text-bone">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Film */}
      {film && (
        <section className="border-t border-line bg-ink-2 py-24 md:py-32" aria-label="Film">
          <div className={cn("wrap grid items-center gap-12", portraitFilm && "md:grid-cols-12")}>
            <div className={cn(portraitFilm && "mx-auto w-full max-w-sm md:col-span-4 md:col-start-2")}>
              <FilmCard film={film} preview="inview" caption={portraitFilm ? "below" : "overlay"} sizes={portraitFilm ? "(min-width: 768px) 30vw, 24rem" : "100vw"} />
            </div>
            {portraitFilm && (
              <div className="md:col-span-5 md:col-start-7">
                <Eyebrow index="03" className="mb-8">
                  On film
                </Eyebrow>
                <p className="display-md text-bone">
                  Not everyone gets <em className="text-copper-2">documented.</em>
                </p>
                <p className="mt-6 text-bone-2">
                  Directed, shot and cut in-house — the same team that built the brand tells the story. Press play for the
                  full film.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      {study.gallery.length > 0 && (
        <section data-header="light" className="bg-paper py-24 text-paper-ink md:py-36" aria-labelledby="gallery-title">
          <div className="wrap">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 id="gallery-title" className="display-md">
                The <em className="text-copper-ink">system.</em>
              </h2>
              <p className="eyebrow text-paper-mute">{study.gallery.length} plates</p>
            </div>
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {study.gallery.map((g, k) => (
                <li key={k} className="mb-6 break-inside-avoid" data-reveal="" style={{ "--d": (k % 3) * 80 } as React.CSSProperties}>
                  <figure>
                    <div className="overflow-clip rounded-[0.9rem] bg-paper-2">
                      <Image src={g.src} alt={`${study.name} — ${g.label}`} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" className="h-auto w-full" />
                    </div>
                    <figcaption className="eyebrow mt-3 flex justify-between text-paper-mute">
                      <span>{g.label}</span>
                      <span>{String(k + 1).padStart(2, "0")}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Outcomes */}
      <section className="bg-ink py-24 md:py-36" aria-labelledby="outcome-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="04" className="mb-8">
              Outcome
            </Eyebrow>
            <h2 id="outcome-title" className="display-lg text-bone" data-reveal="">
              What <em className="text-copper-2">changed.</em>
            </h2>
            <ul className="mt-10 flex flex-wrap gap-2">
              {study.services.map((s) => (
                <li key={s} className="eyebrow rounded-full border border-line-strong px-4 py-2 text-bone-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
            {study.outcomes.map((o, k) => (
              <li key={o} className="flex gap-6 border-b border-line py-7" data-reveal="" style={{ "--d": k * 80 } as React.CSSProperties}>
                <span className="eyebrow pt-2 text-copper">{String(k + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl leading-snug text-bone md:text-3xl">{o}</span>
              </li>
            ))}
          </ol>
        </div>
        {study.quote && (
          <figure className="wrap mt-24 md:mt-36" data-reveal="">
            <blockquote className="display-lg max-w-[22ch] text-bone">“{study.quote.text}”</blockquote>
            <figcaption className="eyebrow mt-8 text-mute">{study.quote.by}</figcaption>
          </figure>
        )}
      </section>

      {/* Next */}
      <section className="border-t border-line bg-ink" aria-label="Next case">
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group wrap grid items-center gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-8">
            <p className="eyebrow text-mute">Next case</p>
            <p className="display-xl mt-6 text-bone transition-colors duration-500 group-hover:text-copper-2">{next.name}</p>
            <p className="mt-4 font-serif text-2xl italic text-bone-2">{next.arc}</p>
          </div>
          <div className="relative hidden aspect-[4/5] overflow-clip rounded-[1rem] md:col-span-3 md:col-start-10 md:block">
            <Image src={next.cover} alt="" fill sizes="25vw" className="scale-105 object-cover grayscale transition-[filter,transform] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:grayscale-0" />
          </div>
          <span className="eyebrow flex items-center gap-3 text-bone md:hidden">
            Read next <Arrow />
          </span>
        </Link>
      </section>

      <ConsultCTA />
    </Page>
  );
}
