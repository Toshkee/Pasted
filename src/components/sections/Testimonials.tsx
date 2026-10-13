import { TESTIMONIALS } from "@/content/testimonials";

import { TestimonialSlider } from "./TestimonialSlider";

const FEATURED = ["Dr. Jon Marashi", "Dr. Sam Saleh", "Dr. Marshall Hanson", "Dr. Serena Wong", "Dr. Rhona Eskander", "Dr. Kooper Ruminer"];

export function Testimonials() {
  const items = FEATURED.map((n) => TESTIMONIALS.find((t) => t.name === n)!);
  return (
    <section className="relative border-t border-line bg-ink py-section" aria-labelledby="words-title">
      <div className="wrap">
        <div className="mb-head flex flex-wrap items-end justify-between gap-4 md:gap-6">
          <h2 id="words-title" className="display-md text-bone">
            What partners say about the work.
          </h2>
        </div>
        <TestimonialSlider items={items} />
      </div>
    </section>
  );
}
