import { PRESS } from "@/content/site";

/** Outlets the roster has appeared in, set as a slow typographic marquee (CSS only). */
export function PressMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12 md:gap-20 md:pr-20" aria-hidden={hidden || undefined}>
      {PRESS.map((name) => (
        <li key={name} className="flex items-center gap-12 md:gap-20">
          <span className="font-serif text-[1.9rem] text-bone-2 md:text-[2.6rem]">{name}</span>
          <span aria-hidden="true" className="text-copper">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="press-label" className="border-y border-line bg-ink py-8 md:py-10">
      <div className="wrap mb-6 flex items-center justify-between">
        <p id="press-label" className="eyebrow text-mute">
          Partners featured in
        </p>
        <p className="eyebrow hidden text-mute md:block">Six continents · Thirty practices</p>
      </div>
      <div className="mask-fade-x group flex overflow-clip" style={{ "--marquee-duration": "55s" } as React.CSSProperties}>
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
