export const SITE = {
  name: "PASTED",
  url: "https://pasted.studio",
  tagline: "The Standard in Aesthetic Dentistry",
  description:
    "The operating partner behind the most recognized names in cosmetic dentistry. Brand, film, content and growth — one practice per market, by invitation.",
  /**
   * The discovery-call Calendly, set per deployment. Unset (the concept site), the intake ends in a demo
   * calendar that books nothing. Live: https://calendly.com/getpasted/pasted-partner-discovery
   */
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  heroFilmId: "8kirf86p7j",
  emails: [
    { label: "Partnerships", address: "zac@getpasted.com" },
    { label: "Events", address: "alan@getpasted.com" },
    { label: "Co-production", address: "kim@getpasted.com" },
    { label: "General", address: "hello@getpasted.com" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/pasted.studio/" },
    { label: "YouTube", href: "https://www.youtube.com/@Pasted.studio" },
  ],
  houses: [
    { label: "Pasted Series", href: "https://pastedseries.com", note: "The film archive" },
    { label: "Pasted India", href: "https://pastedmasterclass.com/", note: "Free community" },
  ],
} as const;

export const NAV = [
  { href: "/partnership", label: "Partnership" },
  { href: "/work", label: "Work" },
  { href: "/films", label: "Films" },
  { href: "/founders", label: "Founders" },
  { href: "/library", label: "Library" },
] as const;

export const STATS = [
  { value: 100, prefix: "$", suffix: "M+", label: "Aesthetic case revenue across partners" },
  { value: 97, suffix: "%", label: "Partner retention, audited annually" },
  { value: 50, label: "Partner seats, in total" },
  { value: 6, label: "Continents with partner practices" },
] as const;

/** Outlets the roster has been featured in (as listed on the live site). */
export const PRESS = [
  "Vogue",
  "Forbes",
  "The New York Times",
  "Netflix",
  "The Times",
  "People",
  "Bravo",
  "New York Post",
  "Hollywood Insider",
  "Dentistry Magazine",
  "AACD",
] as const;

export const DISCLAIMERS = {
  results:
    "Results vary. Case studies, testimonials and revenue figures reflect the experience of specific practices and are not a guarantee of future results. Outcomes depend on market, team, clinical capacity and execution. Nothing on this site is financial, legal, medical or clinical advice.",
  advertising:
    "This site is not part of, endorsed by, or affiliated with Meta Platforms, Inc. or Google LLC. Meta, Facebook, Instagram, Google and YouTube are trademarks of their respective owners.",
} as const;
