import Image from "next/image";

import mhm from "@/assets/img/logos/marshall-hanson-method.png";
import smileVirtual from "@/assets/img/logos/smile-virtual.png";
import smiletrend from "@/assets/img/logos/smiletrend.png";
import solventum from "@/assets/img/logos/solventum.png";
import suri from "@/assets/img/logos/suri.png";
import { Eyebrow } from "@/components/ui/Button";

const LOGOS = [
  { src: solventum, name: "Solventum" },
  { src: suri, name: "SURI" },
  { src: smiletrend, name: "Smile Trend Institute" },
  { src: mhm, name: "Marshall Hanson Method" },
  { src: smileVirtual, name: "Smile Virtual" },
];

export function PartnerLogos({ index = "§" }: { index?: string }) {
  return (
    <section className="border-y border-line bg-ink py-20 md:py-28" aria-labelledby="brands-partners">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <Eyebrow index={index}>Brands that borrow the roster’s authority</Eyebrow>
          <p id="brands-partners" className="max-w-md text-sm text-mute">
            Product launches, brand integration and co-productions with companies building around clinicians.
          </p>
        </div>
        <ul className="grid grid-cols-2 items-center gap-x-10 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
          {LOGOS.map((l, i) => (
            <li key={l.name} className="flex justify-center" data-reveal="" style={{ "--d": i * 70 } as React.CSSProperties}>
              <Image
                src={l.src}
                alt={l.name}
                sizes="200px"
                className="h-9 w-auto max-w-[11rem] object-contain opacity-70 transition-opacity duration-500 hover:opacity-100 md:h-11"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
