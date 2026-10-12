"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Cursor-following image preview for index lists. Rows are marked `data-hover-index="n"`;
 * matching layers inside `[data-hover-stage]` are marked `data-hover-layer="n"`.
 * The stage glides after the pointer with a little lag and tilt. Fine pointers only.
 */
export function HoverReveal({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = el.querySelector<HTMLElement>("[data-hover-stage]");
    if (!stage) return;
    const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-hover-layer]"));

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let active: string | null = null;
    let raf = 0;
    let running = false;

    const loop = () => {
      const dx = target.x - pos.x;
      pos.x += dx * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      const tilt = Math.max(-10, Math.min(10, dx * 0.06));
      stage.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(18%, -55%) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(loop);
    };

    const show = (index: string | null) => {
      if (index === active) return;
      active = index;
      stage.style.opacity = index === null ? "0" : "1";
      stage.style.scale = index === null ? "0.85" : "1";
      layers.forEach((l) => (l.style.opacity = l.dataset.hoverLayer === index ? "1" : "0"));
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!running) {
        pos.x = target.x;
        pos.y = target.y;
        running = true;
        raf = requestAnimationFrame(loop);
      }
      const row = (e.target as Element).closest<HTMLElement>("[data-hover-index]");
      show(row?.dataset.hoverIndex ?? null);
    };
    const onLeave = () => {
      show(null);
      cancelAnimationFrame(raf);
      running = false;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
