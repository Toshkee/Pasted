"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { Arrow, Roll } from "@/components/ui/Button";
import { MAP_CITIES } from "@/content/world-map";

const ALIASES: Record<string, string> = {
  la: "Los Angeles",
  "beverly hills": "Los Angeles",
  "santa monica": "Los Angeles",
  nyc: "New York",
  "new york city": "New York",
  manhattan: "New York",
  brooklyn: "New York",
  dc: "Washington, DC",
  "washington dc": "Washington, DC",
  washington: "Washington, DC",
  vegas: "Las Vegas",
  calgary: "Alberta",
  edmonton: "Alberta",
  chelsea: "London",
  "harley street": "London",
  "west palm beach": "Palm Beach",
  "palm beach": "Palm Beach",
};

/** "Miami, FL" → "miami", "São Paulo" → "sao paulo", "L.A." → "la". */
const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/,.*$/, "")
    .replace(/\s+/g, " ")
    .trim();

type Result = { city: string; held: boolean };

function check(input: string): Result | null {
  const q = norm(input);
  if (q.length < 2) return null;
  const alias = ALIASES[q];
  const key = norm(alias ?? q);
  const hit =
    MAP_CITIES.find((c) => norm(c.name) === key) ??
    (key.length >= 3 ? MAP_CITIES.find((c) => norm(c.name).startsWith(key)) : undefined);
  if (hit && hit.partners.length) return { city: hit.name, held: true };
  const pretty = alias ?? input.trim().replace(/\b\w/g, (c) => c.toUpperCase());
  return { city: hit?.name ?? pretty, held: false };
}

/**
 * "Is my market still open?" — checked against the cities where a roster partner practices today.
 * Honest by design: an open result is an invitation to confirm on the call, not a promise.
 */
export function MarketChecker() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const id = useId();

  return (
    <section className="relative overflow-clip bg-oxblood py-20 md:py-40" aria-labelledby={`${id}-title`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_10%,rgb(192_133_82/0.22),transparent_70%),radial-gradient(60%_60%_at_0%_100%,rgb(11_10_9/0.6),transparent_70%)]"
      />
      <div className="wrap relative grid grid-cols-1 gap-10 md:gap-14 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <h2 id={`${id}-title`} className="display-xl text-bone" data-reveal="">
            Is your city taken?
          </h2>
          <p className="lede mt-6 max-w-lg text-bone/75 md:mt-10" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
            PASTED works with one practice per market, because the same position can’t be built for two competitors in
            one city. Once a city is held, other practices there are turned down.
          </p>
        </div>

        <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:self-end">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setResult(check(value));
            }}
            className="border-b border-bone/40 focus-within:border-bone"
          >
            <label htmlFor={`${id}-city`} className="eyebrow text-bone/60">
              Check your city
            </label>
            <div className="flex items-center gap-4">
              <input
                id={`${id}-city`}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. Miami"
                autoComplete="address-level2"
                size={1}
                className="w-full min-w-0 flex-1 bg-transparent py-3 font-serif text-[2rem] text-bone outline-none placeholder:text-bone/30 sm:py-4 sm:text-4xl md:text-5xl"
              />
              <button
                type="submit"
                aria-label="Check market"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bone text-ink transition-colors hover:bg-copper-2 sm:size-14"
              >
                <Arrow className="size-4" />
              </button>
            </div>
          </form>

          <div aria-live="polite" className="pt-6 md:min-h-[11rem] md:pt-8">
            {result && (
              <div key={result.city + result.held} className="animate-[fade-rise_.9s_var(--ease-out-expo)_both]">
                <p className="eyebrow flex items-center gap-3 text-bone/70">
                  <span
                    aria-hidden="true"
                    className={result.held ? "size-2 rounded-full bg-copper-2" : "size-2 rounded-full border border-bone"}
                  />
                  {result.held ? "Held" : "Not held today"}
                </p>
                <p className="display-sm mt-3 text-bone">
                  {result.held ? (
                    <>
                      {result.city} has a partner on the roster. Adjacent markets are
                      reviewed on the call.
                    </>
                  ) : (
                    <>
                      {result.city} is open — for now.
                    </>
                  )}
                </p>
                <p className="mt-3 text-sm text-bone/65">
                  {result.held
                    ? "Each partner holds their category in their city. If yours differs, it may still be available."
                    : "No partner on the roster practices there today. Markets are confirmed — and closed — on the discovery call."}
                </p>
                <Link
                  href={`/contact?market=${encodeURIComponent(result.city)}`}
                  className="eyebrow group mt-6 inline-flex h-12 items-center gap-3 rounded-full bg-bone px-6 text-ink transition-colors hover:bg-white"
                >
                  <Roll>{result.held ? "Request a review" : `Request ${result.city}`}</Roll>
                  <Arrow />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
