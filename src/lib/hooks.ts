"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
}

/** SSR-safe media query hook (server snapshot is `fallback`). */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

/** True on devices with a precise pointer and real hover (desktop). */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)", false);
}
