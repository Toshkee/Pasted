import Image from "next/image";
import Link from "next/link";

import { DriftRows } from "@/components/motion/DriftRows";
import { ButtonLink } from "@/components/ui/Button";
import { BRAND_GALLERY } from "@/content/brand-gallery";
import { caseBySlug } from "@/content/work";

type Tile = { slug: string; index: number };

const ROW_A: Tile[] = [
  { slug: "mikaela-tozzi", index: 1 },
  { slug: "only-fangs", index: 1 },
  { slug: "serena-wong", index: 0 },
  { slug: "nav-atwal", index: 4 },
  { slug: "jake-bateman", index: 3 },
  { slug: "nakul-ratra", index: 2 },
  { slug: "meg-rascius", index: 5 },
];
const ROW_B: Tile[] = [
  { slug: "vik-ravoory", index: 0 },
  { slug: "mikaela-tozzi", index: 3 },
  { slug: "only-fangs", index: 4 },
  { slug: "nav-atwal", index: 5 },
  { slug: "karma-dentistry", index: 1 },
  { slug: "serena-wong", index: 6 },
  { slug: "jake-bateman", index: 6 },
];

function Row({ tiles, dir }: { tiles: Tile[]; dir: "left" | "right" }) {
  return (
    <div data-drift-row={dir} className="flex gap-4 will-change-transform md:gap-6">
      {tiles.map(({ slug, index }) => {
        const img = BRAND_GALLERY[slug][index];
        const name = caseBySlug(slug)?.name ?? slug;
        return (
          <Link
            key={`${slug}-${index}`}
            href={`/work/${slug}`}
            data-cursor="View"
            className="group relative block w-[58vw] shrink-0 overflow-clip rounded-[0.9rem] bg-paper-2 sm:w-[36vw] lg:w-[21vw]"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={img.src}
                alt={`${name} — ${img.label}`}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 36vw, 58vw"
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 bg-[linear-gradient(180deg,transparent,rgb(11_10_9/0.78))] p-4 pt-14 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="font-serif text-xl text-bone">{name}</span>
              <span className="eyebrow text-right text-bone-2">{img.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function BrandsShowcase() {
  return (
    <section data-header="light" className="relative overflow-clip bg-paper py-section text-paper-ink" aria-labelledby="brands-title">
      <div className="wrap mb-head grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 id="brands-title" className="display-lg text-balance" data-reveal="">
            Identities that carry the same weight as the work.
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
          <p className="lede text-paper-mute">
            Wordmarks, monograms, rooms and websites for the practices on the roster. Each identity takes about
            forty-five days from first brief to launch.
          </p>
          <ButtonLink href="/work" variant="ink" className="mt-8">
            Selected work
          </ButtonLink>
        </div>
      </div>

      <DriftRows className="space-y-4 md:space-y-6">
        <Row tiles={ROW_A} dir="left" />
        <div className="pl-[12vw]">
          <Row tiles={ROW_B} dir="right" />
        </div>
      </DriftRows>
    </section>
  );
}
