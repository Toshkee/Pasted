import Image, { type StaticImageData } from "next/image";
import { ViewTransition } from "react";

import { cn } from "@/lib/cn";

/** A case cover that morphs between the work index and the case page (shared-element view transition). */
export function CaseCover({
  slug,
  src,
  alt,
  sizes,
  className,
  preload,
  imageClassName,
}: {
  slug: string;
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
  imageClassName?: string;
}) {
  return (
    <ViewTransition name={`case-${slug}`} share="morph" default="none">
      <div className={cn("relative overflow-clip bg-ink-3", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cn("object-cover", imageClassName)} />
      </div>
    </ViewTransition>
  );
}
