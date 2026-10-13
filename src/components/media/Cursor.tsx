"use client";

import { useEffect, useRef, useState } from "react";

import { useFinePointer, useReducedMotion } from "@/lib/hooks";

/**
 * A quiet cursor companion for precise pointers. Elements opt in with `data-cursor="Play"` (or any
 * label); the ring grows and shows the label. Native cursor stays visible — this only adds context.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;
    const el = ring.current;
    if (!el) return;

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let raf = 0;
    let last = 0;

    // Eases a fifth of the way per 120 Hz frame, scaled by elapsed time so the ring keeps the same
    // pace where frames come at 60 Hz (Safari). It sleeps once it has caught up with the pointer.
    const loop = (now: number) => {
      const dt = last ? Math.min(Math.max(now - last, 0), 100) : 1000 / 120;
      const k = 1 - Math.pow(0.8, dt / (1000 / 120));
      last = now;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(hit?.dataset.cursor ?? null);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, reduce]);

  if (!fine || reduce) return null;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-normal"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}
    >
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-out-expo)]"
        style={{
          width: label ? 92 : 10,
          height: label ? 92 : 10,
          background: label ? "var(--color-copper)" : "var(--color-bone)",
        }}
      >
        <span
          className="eyebrow text-ink transition-opacity duration-300"
          style={{ opacity: label ? 1 : 0, fontSize: "0.625rem" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
