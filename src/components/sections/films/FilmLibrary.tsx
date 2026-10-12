"use client";

import { startTransition, useState, ViewTransition } from "react";

import { FilmCard } from "@/components/media/FilmCard";
import type { Film, FilmCategory } from "@/content/films";
import { cn } from "@/lib/cn";

type Filter = "All" | FilmCategory;

/**
 * Filterable film grid. Filter changes run inside a React transition, so every card is a
 * <ViewTransition>: cards that stay glide to their new slot, the rest fade out and in.
 */
export function FilmLibrary({ films, categories }: { films: Film[]; categories: FilmCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? films : films.filter((f) => f.category === filter);
  const count = (c: Filter) => (c === "All" ? films.length : films.filter((f) => f.category === c).length);

  return (
    <div>
      <div role="group" aria-label="Filter films" className="scrollbar-none -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 sm:-mx-7 sm:px-7 md:mx-0 md:mb-12 md:flex-wrap md:px-0">
        {(["All", ...categories] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => startTransition(() => setFilter(c))}
            className={cn(
              "eyebrow flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 transition-colors duration-300 md:px-5 md:py-3",
              filter === c ? "border-bone bg-bone text-ink" : "border-line-strong text-bone-2 hover:border-bone hover:text-bone",
            )}
          >
            {c}
            <span className={filter === c ? "text-ink/60" : "text-mute"}>{count(c)}</span>
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4" aria-live="polite">
        {visible.map((film) => (
          <ViewTransition key={film.slug} name={`film-${film.slug}`}>
            <li className={film.orientation === "landscape" ? "col-span-2" : undefined}>
              <FilmCard
                film={film}
                sizes={film.orientation === "landscape" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"}
              />
              <p className="eyebrow mt-2 text-[0.625rem] text-copper sm:text-[0.6875rem]">{film.category}</p>
            </li>
          </ViewTransition>
        ))}
      </ul>
    </div>
  );
}
