import { MAP_CITIES, WORLD } from "@/content/world-map";

/**
 * Dotted world map (static SVG generated at build-time by scripts/media/world-map.mjs) with the
 * roster's cities pulsing in copper. Pure server markup + CSS — no map library on the client.
 */
export function WorldMap() {
  const partnerCities = MAP_CITIES.filter((c) => c.partners.length);
  const presence = MAP_CITIES.filter((c) => !c.partners.length);

  return (
    <section className="relative overflow-clip bg-ink py-section" aria-labelledby="world-title">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 id="world-title" className="display-lg text-bone" data-reveal="">
              Thirty practices on six continents.
            </h2>
          </div>
          <p className="lede text-bone-2 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal="">
            Partner practices from Miami to Mumbai and from Sydney to Seville.
          </p>
        </div>

        <figure className="relative mt-head" data-reveal="fade">
          {/* Phones: the map keeps a legible size and pans sideways instead of shrinking to a smudge. */}
          <div className="scrollbar-none -mx-gutter overflow-x-auto px-gutter md:mx-0 md:overflow-visible md:px-0">
          <div className="relative min-w-[720px] md:min-w-0" style={{ aspectRatio: `${WORLD.width} / ${WORLD.height}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
            <img src="/media/world-dots.svg" alt="" className="absolute inset-0 size-full" loading="lazy" decoding="async" />
            <svg viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} className="absolute inset-0 size-full" role="img" aria-labelledby="world-desc">
              <desc id="world-desc">
                Map of PASTED partner practices: {partnerCities.map((c) => c.name).join(", ")}.
              </desc>
              {presence.map((c) => (
                <circle key={c.name} cx={c.x} cy={c.y} r={1.8} fill="#9d9286" />
              ))}
              {partnerCities.map((c, i) => (
                <g key={c.name} transform={`translate(${c.x} ${c.y})`}>
                  <circle
                    r={4}
                    fill="none"
                    stroke="#c08552"
                    strokeWidth={0.8}
                    className="origin-center animate-pulse-ring [transform-box:fill-box]"
                    style={{ animationDelay: `${(i % 7) * 0.37}s` }}
                  />
                  <circle r={2.8} fill="#d9a273" />
                </g>
              ))}
            </svg>
          </div>
          </div>
          <p className="eyebrow mt-3 text-mute md:hidden">Swipe the map →</p>
          <figcaption className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 md:mt-8 md:gap-x-8 md:pt-6">
            <span className="eyebrow flex items-center gap-2 text-bone-2">
              <span aria-hidden="true" className="size-2 rounded-full bg-copper-2" /> Roster partner
            </span>
            <span className="eyebrow flex items-center gap-2 text-mute">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#9d9286]" /> Network presence
            </span>
          </figcaption>
        </figure>

        <ul className="mt-10 columns-2 gap-6 text-sm text-bone-2 sm:columns-3 md:mt-14 md:gap-8 lg:columns-5">
          {partnerCities.map((c) => (
            <li key={c.name} className="mb-4 break-inside-avoid">
              <span className="eyebrow block text-copper-2">{c.name}</span>
              <span className="text-mute">{c.partners.join(", ")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
