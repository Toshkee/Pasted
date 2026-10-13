import Image from "next/image";

import zac from "@/assets/img/founders/zac-orender.jpg";
import alan from "@/assets/img/founders/alan-clarke.jpg";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";

/** Closing call to action used across inner pages. */
export function ConsultCTA({
  title = "Build the brand they feel.",
  lede = "45 minutes with Zac Orender or Dr. Alan Clarke. Positioning, not a pitch — you will know on the call. So will we.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-clip bg-ink-2 py-20 md:py-40" aria-label="Request a consultation">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_120%,rgb(192_133_82/0.18),transparent_70%)]" />
      <div className="wrap relative text-center">
        <div className="mb-10 flex justify-center" data-reveal="">
          <div className="flex -space-x-3">
            {[zac, alan].map((src, i) => (
              <span key={i} className="relative block size-14 overflow-clip rounded-full border-2 border-ink-2">
                <Image src={src} alt="" fill sizes="56px" className="object-cover grayscale" />
              </span>
            ))}
          </div>
        </div>
        <SplitText as="h2" text={title} className="display-xl mx-auto max-w-[14ch] text-bone" />
        <p className="lede mx-auto mt-8 max-w-xl text-bone-2" data-reveal="">
          {lede}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-3" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
          <ButtonLink href="/contact" variant="copper" size="lg">
            Request a consultation
          </ButtonLink>
          <ButtonLink href="mailto:zac@getpasted.com" variant="outline" size="lg" arrow={false}>
            zac@getpasted.com
          </ButtonLink>
        </div>
        <p className="eyebrow mt-8 text-mute">Fifty seats, ever · Every call taken by a founder</p>
      </div>
    </section>
  );
}
