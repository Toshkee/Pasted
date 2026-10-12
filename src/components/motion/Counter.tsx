"use client";

import { useEffect, useRef } from "react";

type Props = { value: number; prefix?: string; suffix?: string; duration?: number; className?: string };

/**
 * Counts up once when scrolled into view. The final value is server-rendered, so crawlers,
 * no-JS and reduced-motion users always see the real number.
 */
export function Counter({ value, prefix = "", suffix = "", duration = 1800, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const render = (v: number) => (el.textContent = `${prefix}${Math.round(v)}${suffix}`);
    render(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          render(value * (1 - Math.pow(1 - t, 4)));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      render(value);
    };
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
