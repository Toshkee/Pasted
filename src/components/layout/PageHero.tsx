import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Props = {
  index: string;
  eyebrow: string;
  /** Supports *italic* runs (see SplitText). */
  title: string;
  lede?: ReactNode;
  aside?: ReactNode;
  image?: StaticImageData;
  imageAlt?: string;
  caption?: string;
  tone?: "ink" | "paper";
};

/** Shared opening for every inner page: index label, a large split headline, lede, optional plate. */
export function PageHero({ index, eyebrow, title, lede, aside, image, imageAlt = "", caption, tone = "ink" }: Props) {
  const paper = tone === "paper";
  return (
    <section data-header={paper ? "light" : undefined} className={cn("relative pt-36 md:pt-44", paper ? "bg-paper text-paper-ink" : "bg-ink text-bone")}>
      <div className="wrap">
        <div data-reveal="auto">
          <Eyebrow index={index} className={cn("mb-10", paper && "text-paper-mute")}>
            {eyebrow}
          </Eyebrow>
        </div>
        <SplitText
          as="h1"
          trigger="auto"
          delay={100}
          text={title}
          className="display-xl max-w-[16ch] text-balance"
          italicClassName={cn("italic", paper ? "text-copper" : "text-copper-2")}
        />
        {(lede || aside) && (
          <div className="mt-12 grid gap-10 border-t pt-8 md:mt-16 md:grid-cols-12" style={{ borderColor: paper ? "rgb(28 24 20 / 0.15)" : undefined }}>
            {lede && (
              <div
                className={cn("lede md:col-span-6", paper ? "text-paper-mute" : "text-bone-2")}
                data-reveal="auto"
                style={{ "--d": 650 } as React.CSSProperties}
              >
                {lede}
              </div>
            )}
            {aside && (
              <div className="md:col-span-5 md:col-start-8" data-reveal="auto" style={{ "--d": 800 } as React.CSSProperties}>
                {aside}
              </div>
            )}
          </div>
        )}
      </div>
      {image ? (
        <figure className="wrap mt-16 pb-20 md:mt-24 md:pb-28">
          <div data-reveal="clip">
            <Parallax className="aspect-[4/5] rounded-[1.1rem] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 1536px) 1440px, 100vw" className="object-cover" />
            </Parallax>
          </div>
          {caption && <figcaption className={cn("eyebrow mt-4", paper ? "text-paper-mute" : "text-mute")}>{caption}</figcaption>}
        </figure>
      ) : (
        <div className="pb-20 md:pb-28" />
      )}
    </section>
  );
}
