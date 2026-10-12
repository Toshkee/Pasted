"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-inview]), [data-split]:not([data-inview])";

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
    scan(document);

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
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
