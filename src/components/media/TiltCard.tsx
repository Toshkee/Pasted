"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The PASTED Club cards are graded slabs — so they behave like ones: a 3D tilt that follows the
 * pointer and a specular glare across the acrylic. Pointer-fine devices only; static elsewhere.
 */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 18}deg`);
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
      el.style.setProperty("--go", "1");
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--go", "0");
  };

  return (
    <div className={cn("[perspective:1100px]", className)}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative transition-transform duration-500 ease-[var(--ease-out-quart)] [transform-style:preserve-3d] motion-reduce:!transform-none"
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light transition-opacity duration-500"
          style={{
            opacity: "var(--go, 0)",
            background:
              "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgb(255 255 255 / 0.75), rgb(255 255 255 / 0) 55%)",
          }}
        />
      </div>
    </div>
  );
}
