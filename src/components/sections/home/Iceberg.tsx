import { ICEBERG } from "@/content/partnership";

/** The brand iceberg, set as type: what patients notice above the line, what decides below it. */
export function Iceberg() {
  return (
    <section className="relative bg-ink py-20 md:py-36" aria-labelledby="iceberg-title">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="iceberg-title" className="display-lg text-bone text-balance" data-reveal="">
            What patients see is the smallest part of a brand.
          </h2>
          <p className="lede mt-8 max-w-md text-bone-2" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
            People notice the logo, the website and the photography. Whether they trust a practice enough to choose it
            depends on what sits underneath: how it is positioned, what it says, and how consistently it says it.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
          <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 pb-8 md:grid-cols-[8rem_1fr]" data-reveal="">
            <p className="font-serif text-4xl text-mute md:text-5xl">10%</p>
            <div>
              <p className="text-sm text-mute">What patients see</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-lg text-bone-2">
                {ICEBERG.visible.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-t border-bone/40 pt-8 md:grid-cols-[8rem_1fr]" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
            <p className="font-serif text-4xl text-copper-2 md:text-5xl">90%</p>
            <div>
              <p className="text-sm text-mute">What decides whether they choose you</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 font-serif text-2xl text-bone md:text-3xl">
                {ICEBERG.invisible.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
