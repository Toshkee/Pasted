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
  // The visible text stays part of the accessible name (WCAG 2.5.3); a hidden verb gives it intent.
  return (
    <button type="button" data-cursor={cursorLabel} aria-label={ariaLabel} onClick={() => play(film)} className={cn("group text-left", className)}>
      {!ariaLabel && <span className="sr-only">Play film: </span>}
      {children}
    </button>
  );
}
