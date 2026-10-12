"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

type Props = {
  src: string;
  className?: string;
  /**
   * "hover" — plays while the pointer is over the closest `.group` (falls back to in-view on touch).
   * "inview" — plays whenever it is on screen.
   */
  mode?: "hover" | "inview";
};

/**
 * Muted preview loop layered over a poster image. The file is not even requested until the element
 * is near the viewport, and it pauses as soon as it leaves — so a page of twenty previews costs
 * nothing until someone actually looks at one.
 */
export function PreviewVideo({ src, className, mode = "hover" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const effectiveMode = mode === "hover" && !fine ? "inview" : mode;

  // Arm (attach src) when close to the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Play/pause policy.
  useEffect(() => {
    const el = ref.current;
    if (!el || !armed || reduce) return;

    const play = () => {
      el.play().then(() => setPlaying(true)).catch(() => {});
    };
    const pause = () => {
      el.pause();
      setPlaying(false);
    };

    if (effectiveMode === "inview") {
      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()), { threshold: 0.35 });
      io.observe(el);
      return () => {
        io.disconnect();
        el.pause();
      };
    }

    const host = el.closest(".group") ?? el.parentElement;
    if (!host) return;
    host.addEventListener("pointerenter", play);
    host.addEventListener("pointerleave", pause);
    host.addEventListener("focusin", play);
    host.addEventListener("focusout", pause);
    return () => {
      host.removeEventListener("pointerenter", play);
      host.removeEventListener("pointerleave", pause);
      host.removeEventListener("focusin", play);
      host.removeEventListener("focusout", pause);
      el.pause();
    };
  }, [armed, effectiveMode, reduce]);

  if (reduce) return null;

  return (
    <video
      ref={ref}
      src={armed ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={cn(
        "pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-700",
        playing ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
