import Image from "next/image";

import { previewSrc, type Film } from "@/content/films";
import { cn } from "@/lib/cn";

import { PlayFilmButton } from "./PlayFilmButton";
import { PreviewVideo } from "./PreviewVideo";
import { PlayGlyph } from "@/components/ui/PlayButton";

type Props = {
  film: Film;
  className?: string;
  sizes?: string;
  /** "hover" previews on pointer hover; "inview" plays whenever visible. */
  preview?: "hover" | "inview";
  /** Show title/subtitle under the frame (default) or overlaid on it. */
  caption?: "below" | "overlay";
  priority?: boolean;
};

/**
 * A film frame: poster, muted preview loop, duration, and a press-to-play cinema dialog. The overlay caption
 * sizes itself to the card, not the viewport, so a half-width card never stacks its title onto the badges.
 */
export function FilmCard({ film, className, sizes, preview = "hover", caption = "below", priority }: Props) {
  const portrait = film.orientation === "portrait";
  return (
    <PlayFilmButton
      film={{ wistiaId: film.wistiaId, title: film.title, subtitle: film.subtitle, orientation: film.orientation }}
      className={cn("@container block w-full", className)}
    >
      <span
        className={cn(
          "relative block overflow-clip rounded-[0.9rem] bg-ink-3",
          portrait ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        <Image
          src={film.poster}
          alt=""
          fill
          preload={priority}
          sizes={sizes ?? (portrait ? "(min-width: 1024px) 22vw, 60vw" : "(min-width: 1024px) 60vw, 100vw")}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <PreviewVideo src={previewSrc(film.slug)} mode={preview} />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_10_9/0.35)_0%,transparent_30%,transparent_55%,rgb(11_10_9/0.85)_100%)]" />
        <span className="eyebrow absolute left-2.5 top-2.5 rounded-full bg-ink/55 px-2.5 py-1 tabular-nums text-bone backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5">
          {film.duration}
        </span>
        <span className="absolute right-2.5 top-2.5 sm:right-4 sm:top-4">
          <PlayGlyph size="sm" className="size-9 sm:size-12" />
        </span>
        {caption === "overlay" && (
          <span className="absolute inset-x-0 bottom-0 hidden p-5 @md:block @xl:p-7">
            <span className="eyebrow block text-copper-2">{film.category}</span>
            <span className="mt-2 block font-serif text-3xl leading-none text-bone @xl:text-5xl">{film.title}</span>
            <span className="mt-3 block max-w-lg text-sm text-bone-2">{film.subtitle}</span>
          </span>
        )}
      </span>
      {caption === "overlay" && (
        <span className="mt-4 block @md:hidden">
          <span className="eyebrow block text-copper-2">{film.category}</span>
          <span className="mt-1.5 block font-serif text-2xl leading-tight text-bone">{film.title}</span>
          <span className="mt-1 block text-sm text-mute">{film.subtitle}</span>
        </span>
      )}
      {caption === "below" && (
        <span className="mt-3 block sm:mt-4">
          <span className="block font-serif text-xl leading-tight text-bone transition-colors group-hover:text-copper-2 sm:text-2xl">
            {film.title}
          </span>
          <span className="mt-1 block text-[0.8125rem] leading-snug text-mute sm:text-sm">{film.subtitle}</span>
        </span>
      )}
    </PlayFilmButton>
  );
}
