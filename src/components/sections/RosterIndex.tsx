import { RosterPanels } from "@/components/sections/RosterPanels";

/** The roster: one row of portraits rather than a long list of names. */
export function RosterIndex() {
  return (
    <section className="relative overflow-clip bg-ink py-20 md:py-36" aria-labelledby="roster-title">
      <div className="wrap">
        <div className="mb-10 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
          <h2 id="roster-title" className="display-lg text-bone text-balance md:col-span-7" data-reveal="">
            The doctors on the roster.
          </h2>
          <p className="text-bone-2 md:col-span-4 md:col-start-9" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
            Every partner works directly with the founders, and most have been on the roster for years.
          </p>
        </div>
        <RosterPanels />
      </div>
    </section>
  );
}
