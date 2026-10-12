"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { usePlayFilm } from "@/components/media/VideoModal";
import { PlayGlyph } from "@/components/ui/PlayButton";
import { useReducedMotion } from "@/lib/hooks";
import { afterFirstPaint, useMotion } from "@/lib/motion";

type Props = { poster: ReactNode; filmId: string; children: ReactNode };

export function HeroStage({ poster, filmId, children }: Props) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();
  const play = usePlayFilm();

  // Only spend bandwidth on the loop when motion is welcome and the connection allows it;
  // pause it whenever the hero is off screen.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      v.pause();
      return;
    }
    let io: IntersectionObserver | undefined;
    let alive = true;
    // The poster carries first paint; the loop is fetched only once the page has painted.
    afterFirstPaint().then(() => {
      if (!alive) return;
      v.load();
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
        threshold: 0.05,
      });
      io.observe(v);
    });
    return () => {
      alive = false;
      io?.disconnect();
    };
  }, [reduce]);

  // Scroll: the film recedes into a framed plate while the headline lifts away.
  useMotion(root, (mm, { gsap }) => {
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(frame.current, { clipPath: "inset(0% 0% 0% 0% round 0px)" });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to(frame.current, { clipPath: "inset(7% 3.5% 0% 3.5% round 22px)" }, 0)
        .to(media.current, { scale: 1.14, yPercent: 6 }, 0)
        .to(content.current, { yPercent: -22, opacity: 0.1 }, 0);
    });
  });


  return (
    <section ref={root} className="relative min-h-[100svh] overflow-clip bg-ink md:h-[100svh] md:min-h-[680px]" aria-label="Introduction">
      <div ref={frame} className="absolute inset-0 overflow-clip will-change-[clip-path]">
        <div ref={media} className="absolute inset-0 will-change-transform">
          {poster}
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            className="absolute inset-0 size-full object-cover transition-opacity duration-[1.6s]"
            style={{ opacity: playing ? 1 : 0 }}
          >
            <source src="/media/hero/hero-540x960.mp4" type="video/mp4" media="(max-width: 767px) and (orientation: portrait)" />
            <source src="/media/hero/hero-1280.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Legibility: a heavy floor, a soft ceiling for the header, a gentle vignette. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_10_9/0.7)_0%,rgb(11_10_9/0.05)_28%,rgb(11_10_9/0.2)_55%,rgb(11_10_9/0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_40%,rgb(11_10_9/0.55)_100%)]" />
        {/* Headline side: phones get an even veil, desktop a left-hand shade where the type sits. */}
        <div className="absolute inset-0 bg-ink/45 md:bg-[linear-gradient(90deg,rgb(11_10_9/0.62)_0%,rgb(11_10_9/0.25)_45%,transparent_70%)]" />
      </div>

      <div ref={content} className="wrap relative z-10 flex min-h-[100svh] flex-col pb-8 md:h-full md:min-h-0 lg:pb-14">
        {children}
      </div>

      <button
        type="button"
        data-cursor="Play"
        onClick={() => play({ wistiaId: filmId, title: "The PASTED Partnership", orientation: "landscape" })}
        className="group absolute right-7 top-[36%] z-20 hidden items-center gap-4 text-left md:flex lg:right-11 lg:top-[38%]"
        data-reveal="auto"
        style={{ "--d": 1100 } as React.CSSProperties}
      >
        <span className="text-right">
          <span className="eyebrow block text-bone">Watch the film</span>
          <span className="eyebrow block text-bone-2">The PASTED Partnership · 1:28</span>
        </span>
        <PlayGlyph size="lg" />
      </button>
    </section>
  );
}
