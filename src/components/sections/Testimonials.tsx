import { Eyebrow } from "@/components/ui/Button";
import { TESTIMONIALS } from "@/content/testimonials";

import { TestimonialSlider } from "./TestimonialSlider";

const FEATURED = ["Dr. Jon Marashi", "Dr. Sam Saleh", "Dr. Marshall Hanson", "Dr. Serena Wong", "Dr. Rhona Eskander", "Dr. Kooper Ruminer"];

export function Testimonials({ index = "§ 08" }: { index?: string }) {
  const items = FEATURED.map((n) => TESTIMONIALS.find((t) => t.name === n)!);
  return (
    <section className="relative border-t border-line bg-ink py-20 md:py-40" aria-labelledby="words-title">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-20 md:gap-6">
          <div>
            <Eyebrow index={index} className="mb-6">
              In their words
            </Eyebrow>
            <h2 id="words-title" className="display-md text-bone">
              Not ours. <em className="text-copper-2">Theirs.</em>
            </h2>
          </div>
          <p className="eyebrow text-mute">Unscripted · From doctors who’ve been through it</p>
        </div>
        <TestimonialSlider items={items} />
      </div>
    </section>
  );
}
