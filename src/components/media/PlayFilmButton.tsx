"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { usePlayFilm, type ModalFilm } from "./VideoModal";

type Props = {
  film: ModalFilm;
  className?: string;
  children: ReactNode;
  cursorLabel?: string;
  ariaLabel?: string;
};

/** Any element that should open a film in the cinema dialog. Render-agnostic: pass your own markup. */
export function PlayFilmButton({ film, className, children, cursorLabel = "Play", ariaLabel }: Props) {
  const play = usePlayFilm();
  return (
    <button
      type="button"
      data-cursor={cursorLabel}
      aria-label={ariaLabel ?? `Play film: ${film.title}`}
      onClick={() => play(film)}
      className={cn("group text-left", className)}
    >
      {children}
    </button>
  );
}
