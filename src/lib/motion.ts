"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type Motion = { gsap: typeof GSAP; ScrollTrigger: typeof ScrollTriggerType };

let afterPaintPromise: Promise<void> | null = null;

/**
 * Resolves once the page has loaded and painted at least once, when the main thread is idle.
 * Everything decorative (GSAP, Lenis, the hero film loop) waits for this, so it never competes
 * with the first paint for bandwidth or CPU.
 */
export function afterFirstPaint(): Promise<void> {
  if (typeof window === "undefined") return new Promise(() => {});
  if (afterPaintPromise) return afterPaintPromise;
  afterPaintPromise = new Promise<void>((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(() => resolve(), { timeout: 1200 }) : setTimeout(resolve, 200);
    const painted = () => requestAnimationFrame(() => requestAnimationFrame(idle));
    if (document.readyState === "complete") painted();
    else window.addEventListener("load", painted, { once: true });
  });
  return afterPaintPromise;
}

let motionPromise: Promise<Motion> | null = null;
let refreshQueued = false;

/** Coalesces many components' "please re-measure" requests into one ScrollTrigger.refresh(). */
export function queueRefresh(motion: Motion) {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    motion.ScrollTrigger.refresh();
  });
}

/** Lazily loads GSAP + ScrollTrigger (≈45 KB gz) after first paint; one shared instance. */
export function loadMotion(): Promise<Motion> {
  if (!motionPromise) {
    motionPromise = afterFirstPaint()
      .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]))
      .then(([g, st]) => {
        const gsap = g.gsap;
        gsap.registerPlugin(st.ScrollTrigger);
        gsap.defaults({ ease: "power3.out", duration: 1 });
        st.ScrollTrigger.config({ ignoreMobileResize: true });
        return { gsap, ScrollTrigger: st.ScrollTrigger };
      });
  }
  return motionPromise;
}

/**
 * Runs scroll-linked animation setup once GSAP is available. `setup` receives a matchMedia
 * scoped to `scope`; register queries on it (e.g. reduced-motion / breakpoints). Everything is
 * reverted on unmount — including when Next.js hides a route with <Activity>.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (mm: gsap.MatchMedia, motion: Motion) => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    let alive = true;
    let mm: gsap.MatchMedia | undefined;
    loadMotion().then((motion) => {
      if (!alive || !scope.current) return;
      mm = motion.gsap.matchMedia(scope.current);
      setup(mm, motion);
      queueRefresh(motion);
    });
    return () => {
      alive = false;
      mm?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callers control re-runs through `deps`
  }, deps);
}
