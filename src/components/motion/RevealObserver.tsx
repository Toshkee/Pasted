"use client";

import { useEffect } from "react";

// "auto" elements animate on first paint in pure CSS, so they are never touched here — which also
// keeps this observer from mutating server-rendered markup before React has hydrated it.
const SELECTOR =
  '[data-reveal]:not([data-inview]):not([data-reveal="auto"]), [data-split]:not([data-inview]):not([data-split="auto"])';

/**
 * One IntersectionObserver for the whole site. Any element — server-rendered or not — opts in with
 * `data-reveal` (fade/rise/clip) or `data-split` (masked word reveal) and gets `data-inview` once seen.
 * The animations themselves are pure CSS (see globals.css), so reveals cost no JavaScript per element.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    // This effect runs once the root has hydrated, but page segments inside Suspense boundaries hydrate
    // a little later. Marking their elements before then makes React report an attribute mismatch, so the
    // first scan waits until the main thread is idle, which is after React has finished hydrating.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const first = hasIdle
      ? window.requestIdleCallback(() => scan(document), { timeout: 1500 })
      : window.setTimeout(() => scan(document), 200);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) io.observe(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (hasIdle) window.cancelIdleCallback(first);
      else window.clearTimeout(first);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
