"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

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
 * one clock for smooth scroll and scroll-linked animation. Disabled entirely for reduced-motion users
 * and touch devices, which keep native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const locks = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: { offset: -80 } });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (process.env.NODE_ENV !== "production") (window as Window & { __lenis?: Lenis }).__lenis = instance;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the instance only exists on the client
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // New route: jump to top immediately (Next.js restores scroll for back/forward on its own).
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  // Late-loading fonts and images change layout: re-measure triggers once everything settles.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
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
