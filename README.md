# PASTED — site redesign

A ground-up redesign of [pasted.studio](https://pasted.studio): the operating partner behind some of the most recognized names in cosmetic dentistry. Same studio, same work, same voice — rebuilt to feel like the films they make, and to load like a static page.

## Before / after (Lighthouse, mobile)

| | Current site | Redesign |
|---|---|---|
| Performance | 57 | 96–98 |
| Accessibility | 100 | 100 |
| Best practices | 75 | 100 |
| Largest Contentful Paint | 9.9 s | ~2.6 s (simulated slow 4G) |
| Time to Interactive | 18.8 s | ~3 s |
| Page weight (home) | 91 MB | 1.3 MB |
| Hero film | 233 MB MP4 | 1.5 MB loop (0.9 MB on phones) |

SEO scores 100 with indexing enabled; concept deployments ship `noindex` (see below).

## What's inside

- **Home** — film-loop hero with an art-directed poster, scroll-read manifesto, pinned "brand iceberg", horizontal partnership track, drifting brand showcase, Halo feature, film rail with hover previews, roster index with cursor portraits, testimonials and a market-availability checker.
- **Partnership** — seven-part breakdown with a sticky plate, four service surfaces, the path, accountability, fit, dotted world map, FAQ.
- **Work** — three practice transformations and nine identity systems, each a statically generated case study with shared-element view transitions.
- **Films** — features, archive one-sheets and a filterable library (React `<ViewTransition>`).
- **Founders**, **Library** (paper edition with Insider sign-up) and **Contact** — a five-question intake that hands off to a prefilled Calendly, loaded only at the last step.

## Stack

Next.js 16 (App Router, Cache Components, fully prerendered), React 19.3, Tailwind CSS 4, GSAP + ScrollTrigger and Lenis (both loaded after first paint), `next/font` (Libre Caslon Display, Geist). No UI kit, no animation framework in the critical path.

## Performance decisions

- Hero poster is the first paint; the film loop is fetched only after load and plays only while on screen.
- Every film preview is a 4-second muted loop (50–330 KB) that isn't requested until it nears the viewport. Full films stream from Wistia only when someone presses play.
- Reveal animations are CSS driven by one shared `IntersectionObserver`; above-the-fold type animates on first paint without waiting for JavaScript.
- GSAP, ScrollTrigger and Lenis load lazily after first paint; scroll effects respect `prefers-reduced-motion`, and touch devices keep native scrolling.
- 92 MB of source photography was re-encoded to 12.6 MB of masters; `next/image` serves AVIF/WebP at the exact size each layout needs.

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `ALLOW_INDEXING` | unset | Set to `true` on the official domain to allow search indexing. Otherwise every page is `noindex` and `robots.txt` disallows crawling. |

## Integration points

- `src/app/api/subscribe` and `src/app/api/intake` validate and acknowledge; wire them to the studio's existing Supabase tables (`lead_magnet_submissions`, `eligibility_submissions`).
- The intake prefills Calendly's `name`, `email` and the first custom question (`a1`) with a summary of the answers — confirm `a1` maps to the right question on the event type.
- Brand font: the live site licenses *Quaria Display*. It can replace Libre Caslon Display in `src/app/layout.tsx`; it is wider with a taller x-height, so retune the `display-*` scale in `globals.css` alongside it. The font files are licensed and should not be committed to a public repository.

## Media pipeline

`scripts/media/` holds the reproducible pipeline used to build the asset library from the live site: image optimisation, hero/preview encoding (ffmpeg), poster extraction, logo vectorisation and the dotted world map.

## Structure

```
src/
  app/            routes, metadata, OG image, sitemap, API handlers
  components/
    layout/       header, footer, page shell, page hero
    motion/       reveal observer, split text, smooth scroll, scroll effects
    media/        film cards, preview loops, cinema dialog, cursor
    sections/     page sections
    ui/           buttons, accordion, logo
  content/        all copy and data (single source of truth)
  assets/img/     optimised photography
public/media/     hero loops, preview clips, world map
scripts/media/    asset pipeline
```
