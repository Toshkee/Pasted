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
  description: "Five short questions, then 45 minutes on Zoom with Zac Orender or Dr. Alan Clarke.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Page>
      <section className="bg-ink pb-20 pt-28 md:pb-40 md:pt-44" aria-labelledby="contact-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div data-reveal="auto">
                <Eyebrow className="mb-10">
                  Request a consultation
                </Eyebrow>
              </div>
              <SplitText as="h1" id="contact-title" trigger="auto" text="Choose a time." className="display-2xl text-bone text-balance" />
              <p className="lede mt-10 max-w-md text-bone-2" data-reveal="auto" style={{ "--d": 450 } as React.CSSProperties}>
                Five short questions, then a 45-minute Zoom call with one of the founders about your practice and your
                market.
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6 md:mt-12 md:pt-8" data-reveal="auto" style={{ "--d": 600 } as React.CSSProperties}>
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

              <ol className="mt-8 space-y-4 md:mt-10 md:space-y-5" data-reveal="auto" style={{ "--d": 700 } as React.CSSProperties}>
                {STEPS.map((s) => (
                  <li key={s.title}>
                    <span className="block font-serif text-xl text-bone">{s.title}</span>
                    <span className="block text-sm text-mute">{s.body}</span>
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

      <section className="border-t border-line bg-ink-2 py-16 md:py-28" aria-labelledby="other-title">
        <div className="wrap">
          <h2 id="other-title" className="display-md mb-8 text-bone md:mb-12">
            Something else?
          </h2>
          <ul className="grid gap-px overflow-clip rounded-[1.1rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {SITE.emails.map((e) => (
              <li key={e.address} className="bg-ink-2">
                <a href={`mailto:${e.address}`} className="group flex h-full flex-col justify-between gap-3 p-5 transition-colors hover:bg-ink sm:p-8 md:gap-10">
                  <span className="text-sm text-mute">{e.label}</span>
                  <span className="break-all font-serif text-[1.35rem] text-bone transition-colors group-hover:text-copper-2 sm:break-normal md:text-2xl">{e.address}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Page>
  );
}
