"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * A horizontal scroller that also responds to mouse drag (with momentum), wheel-x and keyboard,
 * while touch devices keep native swipe + scroll-snap. Clicks are suppressed after a real drag.
 */
export function DragScroll({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let down = false;
    let moved = 0;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastT = 0;
    // px per ms, so the glide covers the same ground whether frames come at 60 Hz (Safari) or 120 Hz.
    let velocity = 0;
    let raf = 0;
    let prev = 0;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      down = true;
      moved = 0;
      startX = lastX = e.clientX;
      lastT = e.timeStamp;
      startLeft = el.scrollLeft;
      velocity = 0;
      cancelAnimationFrame(raf);
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      velocity = (e.clientX - lastX) / Math.max(e.timeStamp - lastT, 1);
      lastX = e.clientX;
      lastT = e.timeStamp;
      el.scrollLeft = startLeft - dx;
      if (moved > 6) el.dataset.dragging = "";
    };
    // Loses 6% of its speed every 120 Hz frame, scaled by the real time between frames.
    const glide = (now: number) => {
      const dt = prev ? Math.min(Math.max(now - prev, 0), 100) : 1000 / 120;
      prev = now;
      velocity *= Math.pow(0.94, dt / (1000 / 120));
      el.scrollLeft -= velocity * dt;
      if (Math.abs(velocity) > 0.4 / (1000 / 120)) raf = requestAnimationFrame(glide);
      else el.style.scrollSnapType = "";
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      prev = 0;
      raf = requestAnimationFrame(glide);
      requestAnimationFrame(() => delete el.dataset.dragging);
    };
    const onClick = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      data-cursor="Drag"
      className={cn(
        "scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain select-none [&[data-dragging]_*]:pointer-events-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
