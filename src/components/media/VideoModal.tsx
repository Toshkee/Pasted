"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { useScroll } from "@/components/motion/SmoothScroll";

export type ModalFilm = {
  wistiaId: string;
  title: string;
  subtitle?: string;
  orientation: "landscape" | "portrait";
};

const VideoModalContext = createContext<(film: ModalFilm) => void>(() => {});

/** `const play = usePlayFilm(); play(film)` opens the cinema dialog. */
export const usePlayFilm = () => useContext(VideoModalContext);

/**
 * Full films stream from Wistia — but the player iframe is only created when someone presses play,
 * so no page pays for a video platform it might never use. Native <dialog> gives focus trapping,
 * Esc to close and a proper modal accessibility tree for free.
 */
export function VideoModalProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [film, setFilm] = useState<ModalFilm | null>(null);
  const { lock, unlock } = useScroll();

  const open = useCallback(
    (f: ModalFilm) => {
      setFilm(f);
      dialog.current?.showModal();
      lock();
    },
    [lock],
  );

  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      setFilm(null);
      unlock();
    };
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, [unlock]);

  const portrait = film?.orientation === "portrait";

  return (
    <VideoModalContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        aria-label={film ? `${film.title} — film` : "Film"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/95 backdrop:backdrop-blur-sm open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="wrap flex items-center justify-between gap-6 py-5">
          <div className="min-w-0">
            <p className="eyebrow text-copper">Now playing</p>
            <p className="truncate font-serif text-2xl text-bone md:text-3xl">{film?.title}</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="eyebrow group flex shrink-0 items-center gap-3 rounded-full border border-line-strong px-5 py-3 text-bone transition-colors hover:border-bone"
            autoFocus
          >
            Close
            <span aria-hidden="true" className="relative block size-3">
              <span className="absolute left-0 top-1/2 h-px w-3 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-3 -rotate-45 bg-current" />
            </span>
          </button>
        </div>
        <div
          className="flex min-h-0 flex-1 items-center justify-center px-4 pb-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {film && (
            <div
              className="relative overflow-hidden rounded-sm bg-ink-2 shadow-2xl shadow-black/60"
              style={
                portrait
                  ? { height: "min(100%, 82dvh)", aspectRatio: "9 / 16", maxWidth: "100%" }
                  : { width: "min(100%, 1400px)", aspectRatio: "16 / 9", maxHeight: "100%" }
              }
            >
              <iframe
                key={film.wistiaId}
                src={`https://fast.wistia.net/embed/iframe/${film.wistiaId}?autoPlay=true&playerColor=c08552&videoFoam=false&fitStrategy=contain`}
                title={film.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            </div>
          )}
        </div>
      </dialog>
    </VideoModalContext.Provider>
  );
}
