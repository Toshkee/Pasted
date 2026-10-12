import Link from "next/link";

import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Emblem, Wordmark } from "@/components/ui/Logo";
import { DISCLAIMERS, NAV, SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-clip border-t border-line bg-ink pt-20 lg:pt-28">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Emblem className="mb-8 h-14 w-auto text-copper" />
            <p className="display-sm max-w-md text-bone text-balance">
              The visible work gets you considered. Everything underneath gets you <em>chosen</em>.
            </p>
            <ButtonLink href="/contact" variant="copper" className="mt-10">
              Request a consultation
            </ButtonLink>
            <p className="eyebrow mt-4 text-mute">Fifty seats, ever · Every call taken by a founder</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow mb-5 text-mute">The house</p>
              <ul className="space-y-3">
                {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Contact" }].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-bone-2 transition-colors hover:text-bone">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 text-mute">Write to us</p>
              <ul className="space-y-4">
                {SITE.emails.map((e) => (
                  <li key={e.address}>
                    <span className="eyebrow block text-[0.625rem] text-mute">{e.label}</span>
                    <a href={`mailto:${e.address}`} className="link-underline text-bone-2 hover:text-bone">
                      {e.address}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-5 text-mute">Elsewhere</p>
              <ul className="space-y-3">
                {[...SITE.social, ...SITE.houses].map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-bone-2 transition-colors hover:text-bone"
                    >
                      <span className="link-underline">{s.label}</span>
                      <Arrow direction="up-right" className="opacity-50 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 grid gap-6 border-t border-line pt-8 text-xs leading-relaxed text-mute lg:grid-cols-2 lg:gap-16">
          <p>
            <span className="eyebrow mr-2 text-bone-2">Results disclaimer</span>
            {DISCLAIMERS.results}
          </p>
          <p>
            <span className="eyebrow mr-2 text-bone-2">Advertising disclaimer</span>
            {DISCLAIMERS.advertising}
          </p>
        </div>
      </div>

      <div className="wrap mt-16 flex items-end justify-between gap-6 pb-6">
        <p className="eyebrow text-mute">© 2026 PASTED™</p>
        <p className="eyebrow text-mute">London · New York · Los Angeles</p>
      </div>
      <div aria-hidden="true" className="wrap -mb-[3.2vw] select-none" data-reveal="clip">
        <Wordmark className="w-full text-bone" title="" />
      </div>
    </footer>
  );
}
