"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { loadMotion, queueRefresh } from "@/lib/motion";

type ScrollApi = {
  lenis: Lenis | null;
  /** Freeze page scroll (menus, dialogs). */
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi>({ lenis: null, lock: () => {}, unlock: () => {} });

export const useScroll = () => useContext(ScrollContext);

/**
 * Lenis drives the scroll; GSAP's ticker drives Lenis, and every Lenis frame updates ScrollTrigger —
 * one clock for smooth scroll and scroll-linked animation. Both load after first paint, and are
 * skipped entirely for reduced-motion users, touch devices and Safari, which keep native scrolling.
 * Safari runs requestAnimationFrame at 60 Hz even on 120 Hz displays, so a script-driven scroll
 * there feels slower than its own native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const locks = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const safari = /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);
    if (reduce || coarse || safari) return;

    let alive = true;
    let cleanup = () => {};
    Promise.all([loadMotion(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: LenisCtor }]) => {
      if (!alive) return;
      const instance = new LenisCtor({ lerp: 0.1, wheelMultiplier: 0.95, anchors: { offset: -80 } });
      instance.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (process.env.NODE_ENV !== "production") (window as Window & { __lenis?: Lenis }).__lenis = instance;
      setLenis(instance);
      cleanup = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
      };
    });

    return () => {
      alive = false;
      cleanup();
      setLenis(null);
    };
  }, []);

  // New route: jump to top immediately (Next.js restores scroll for back/forward on its own).
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    loadMotion().then(queueRefresh);
  }, [pathname, lenis]);

  // Late-loading fonts and images change layout: re-measure triggers once everything settles.
  useEffect(() => {
    const refresh = () => loadMotion().then(queueRefresh);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  const api = useMemo<ScrollApi>(
    () => ({
      lenis,
      lock: () => {
        locks.current += 1;
        lenis?.stop();
        document.documentElement.style.overflow = "hidden";
      },
      unlock: () => {
        locks.current = Math.max(0, locks.current - 1);
        if (locks.current === 0) {
          lenis?.start();
          document.documentElement.style.overflow = "";
        }
      },
    }),
    [lenis],
  );

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}
