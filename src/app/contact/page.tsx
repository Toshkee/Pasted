import type { Metadata } from "next";
import Image from "next/image";

import { Page } from "@/components/layout/Page";
import { SplitText } from "@/components/motion/SplitText";
import { Intake } from "@/components/sections/contact/Intake";
import { Eyebrow } from "@/components/ui/Button";
import { FOUNDERS } from "@/content/founders";
import { STEPS } from "@/content/partnership";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Request a consultation",
  description: "Five questions, two minutes, then 45 minutes with a founder — Zac Orender or Dr. Alan Clarke. Fifty seats, ever.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Page>
      <section className="bg-ink pb-28 pt-36 md:pb-40 md:pt-44" aria-labelledby="contact-title">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div data-reveal="auto">
                <Eyebrow index="§" className="mb-10">
                  Request a consultation
                </Eyebrow>
              </div>
              <SplitText as="h1" id="contact-title" trigger="auto" text="Choose a *time.*" className="display-2xl text-bone" italicClassName="italic text-copper-2" />
              <p className="lede mt-10 max-w-md text-bone-2" data-reveal="auto" style={{ "--d": 450 } as React.CSSProperties}>
                45 minutes with a founder. Positioning, not a pitch. Fifty seats, ever — and one practice per market.
              </p>

              <div className="mt-12 flex items-center gap-4 border-t border-line pt-8" data-reveal="auto" style={{ "--d": 600 } as React.CSSProperties}>
                <div className="flex -space-x-3">
                  {FOUNDERS.map((f) => (
                    <span key={f.slug} className="relative block size-12 overflow-clip rounded-full border-2 border-ink">
                      <Image src={f.portrait} alt="" fill sizes="48px" className="object-cover grayscale" />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-bone-2">
                  You’ll speak with <span className="text-bone">Zac Orender</span> or <span className="text-bone">Dr. Alan Clarke</span>.
                </p>
              </div>

              <ol className="mt-10 space-y-5" data-reveal="auto" style={{ "--d": 700 } as React.CSSProperties}>
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-5">
                    <span className="eyebrow pt-1 text-copper">{s.n}</span>
                    <span>
                      <span className="block font-serif text-xl text-bone">{s.title}</span>
                      <span className="block text-sm text-mute">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-7" data-reveal="auto" style={{ "--d": 350 } as React.CSSProperties}>
            <Intake />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-20 md:py-28" aria-labelledby="other-title">
        <div className="wrap">
          <h2 id="other-title" className="display-md mb-12 text-bone">
            Something <em className="text-copper-2">else?</em>
          </h2>
          <ul className="grid gap-px overflow-clip rounded-[1.1rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SITE.emails.map((e) => (
              <li key={e.address} className="bg-ink-2">
                <a href={`mailto:${e.address}`} className="group flex h-full flex-col justify-between gap-10 p-8 transition-colors hover:bg-ink">
                  <span className="eyebrow text-mute">{e.label}</span>
                  <span className="font-serif text-2xl text-bone transition-colors group-hover:text-copper-2">{e.address}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Page>
  );
}
