"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useScroll } from "@/components/motion/SmoothScroll";
import { ButtonLink, Roll } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";
import { NAV, SITE } from "@/content/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const { lenis, lock, unlock } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Light (paper) sections mark themselves with data-header="light"; when one sits under the
  // header bar, the header flips to ink-on-paper so it never disappears.
  useEffect(() => {
    const active = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active.add(e.target);
          else active.delete(e.target);
        }
        setLight(active.size > 0);
      },
      { rootMargin: "0px 0px -94% 0px" },
    );
    const raf = requestAnimationFrame(() => document.querySelectorAll('[data-header="light"]').forEach((el) => io.observe(el)));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  // Solid background once scrolled; tuck away while reading downwards, return on any upward intent.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y < 480 || y < last - 4) setHidden(false);
        else if (y > last + 4) setHidden(true);
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Menu: lock scroll, focus the first link, Esc closes.
  useEffect(() => {
    if (!open) return;
    lock();
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lock, unlock]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // A link to the page you're already on keeps your scroll position in Next.js; scroll back to the top instead.
  const navigate = (href: string) => (e: { preventDefault: () => void }) => {
    setOpen(false);
    if (href !== pathname) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(0, { force: true });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <>
      <a
        href="#main"
        className="eyebrow fixed left-4 top-3 z-[80] -translate-y-24 rounded-full bg-bone px-5 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-out-expo)]",
          scrolled && !open
            ? light
              ? "border-b border-paper-ink/10 bg-paper/80 backdrop-blur-xl"
              : "border-b border-line bg-ink/75 backdrop-blur-xl"
            : "border-b border-transparent",
          light && !open ? "text-paper-ink" : "text-bone",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label="PASTED — home" className="relative z-10 transition-colors duration-500" onNavigate={navigate("/")}>
            <Wordmark className="h-[1.35rem] w-auto lg:h-[1.6rem]" title="Pasted" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onNavigate={navigate(item.href)}
                    className={cn(
                      "eyebrow relative flex items-center gap-2 transition-colors duration-300",
                      isActive(item.href) ? "opacity-100" : "opacity-70 hover:opacity-100",
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1 rounded-full bg-copper transition-[opacity,transform] duration-500",
                        isActive(item.href) ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    />
                    <Roll>{item.label}</Roll>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <ButtonLink href="/contact" variant={light && !open ? "outline-paper" : "outline"} size="sm" className="hidden sm:inline-flex" arrow={false}>
              Request a consultation
            </ButtonLink>
            <button
              type="button"
              className={cn(
                "eyebrow flex h-11 items-center gap-3 rounded-full border px-5 transition-colors lg:hidden",
                light && !open ? "border-paper-ink/25 hover:border-paper-ink" : "border-line-strong hover:border-bone",
              )}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-2 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-px w-4 bg-current transition-transform duration-500",
                    open ? "top-1 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-4 bg-current transition-transform duration-500",
                    open ? "top-1 -rotate-45" : "top-2",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        id="site-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink transition-[clip-path,visibility] duration-[900ms] ease-[var(--ease-in-out-quart)] lg:hidden",
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Menu" className="wrap flex flex-1 flex-col justify-center pt-20">
          <ul className="space-y-1">
            {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Request a consultation" }].map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  "overflow-clip transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
                style={{ transitionDelay: open ? `${180 + i * 55}ms` : "0ms" }}
              >
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  onNavigate={navigate(item.href)}
                  className={cn(
                    "block py-1.5 font-serif leading-none",
                    item.href === "/contact" ? "mt-6 text-[1.75rem] text-copper" : "text-[2.75rem] sm:text-6xl",
                    item.href !== "/contact" && (isActive(item.href) || (item.href === "/" && pathname === "/")) ? "text-bone" : "",
                    item.href !== "/contact" && !(isActive(item.href) || (item.href === "/" && pathname === "/")) ? "text-bone-2" : "",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="wrap grid grid-cols-2 gap-6 border-t border-line py-8 text-sm text-bone-2">
          <div>
            <p className="eyebrow mb-2 text-mute">Partnerships</p>
            <a href={`mailto:${SITE.emails[0].address}`} className="link-underline">
              {SITE.emails[0].address}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-2 text-mute">Follow</p>
            <div className="flex gap-4">
              {SITE.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
