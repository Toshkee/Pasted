import type { StaticImageData } from "next/image";

import imgRoom from "@/assets/img/studio/case-room.jpg";
import imgStudio from "@/assets/img/studio/world-partnership.jpg";
import imgBody from "@/assets/img/brands/serena-wong/08.jpg";
import imgNotebook from "@/assets/img/studio/case-notebook.jpg";
import imgArches from "@/assets/img/studio/arches.jpg";
import imgDinner from "@/assets/img/studio/exp-dinner.jpg";
import imgCorridor from "@/assets/img/studio/case-corridor.jpg";

import imgTransformation from "@/assets/img/studio/blueprint.jpg";
import imgBrands from "@/assets/img/brands/jake-bateman/04.jpg";
import imgCreative from "@/assets/img/films/posters/the-pasted-partnership.jpg";
import imgAds from "@/assets/img/brands/nav-atwal/06.jpg";

export type Component = { title: string; body: string; image: StaticImageData };

/** What a partnership is — seven parts, as stated by the studio. */
export const COMPONENTS: Component[] = [
  {
    title: "The Immersion",
    body: "Four weeks before the first frame. Your market researched, your positioning locked, the narrative spine set.",
    image: imgRoom,
  },
  {
    title: "Cinematic shoots",
    body: "Four fully produced shoot days a year — one per quarter. Directed, shot and cut by our own team.",
    image: imgStudio,
  },
  {
    title: "The body of work",
    body: "One hundred–plus premium pieces a year, eight to ten a month — cut, curated and posted on cadence. You never touch a calendar.",
    image: imgBody,
  },
  {
    title: "The counsel",
    body: "Monthly strategy calls on the practice, not just the content. Creative direction between shoots.",
    image: imgNotebook,
  },
  {
    title: "Market exclusivity",
    body: "One practice per market, held for as long as you hold your seat. Competitors are not waitlisted. They are declined.",
    image: imgArches,
  },
  {
    title: "The world",
    body: "A seat in the closed network — the dinners, the masterminds, the rooms, the standard.",
    image: imgDinner,
  },
  {
    title: "Ownership",
    body: "The brand and the entire body of work are yours, in perpetuity, at the close of term.",
    image: imgCorridor,
  },
];

export type Surface = {
  title: string;
  headline: string;
  body: string;
  points: string[];
  cta: string;
  image: StaticImageData;
};

export const SURFACES: Surface[] = [
  {
    title: "Practice transformation",
    headline: "Rebuilt from positioning up.",
    body: "Long-form partnerships that reshape a practice, not a quarter: positioning, narrative, offer architecture, and the operating system to hold it.",
    points: ["Market & positioning research", "Narrative and offer architecture", "Operating framework", "Quarterly value reviews"],
    cta: "Rebuild my positioning",
    image: imgTransformation,
  },
  {
    title: "Brands & sites",
    headline: "Identity systems built to last.",
    body: "Wordmarks, monograms, environments and brand websites — designed as one system, so the brand carries the same weight as the work.",
    points: ["Identity & monogram systems", "Brand websites", "Clinic & environmental design", "Collateral and templates"],
    cta: "Build my brand",
    image: imgBrands,
  },
  {
    title: "Creative & content",
    headline: "Directed in-house. Built to age well.",
    body: "Cinematic shoots, brand films and content systems — directed, shot and cut by our own team, for paid, organic and the way patients actually watch.",
    points: ["Quarterly cinematic shoots", "Brand & documentary films", "Monthly content cadence", "Editorial photography"],
    cta: "Commission a shoot",
    image: imgCreative,
  },
  {
    title: "Ads & results",
    headline: "Accountable to the chair, not the click.",
    body: "Meta and Google campaigns for veneers, implants and full-arch — procedure-specific funnels, speed-to-lead and show-rate systems, optimized on consults that show.",
    points: ["Meta & Google campaigns", "Procedure-specific funnels", "Speed-to-lead & nurture", "Ad account audits"],
    cta: "Audit my ad account",
    image: imgAds,
  },
];

export const STEPS = [
  { title: "Book a discovery call.", body: "Pick a time. A few questions on your field, your city, your ambition." },
  { title: "Meet a founder.", body: "45 minutes with Zac Orender or Dr. Alan Clarke. Positioning, not a pitch." },
  { title: "If it fits, we begin.", body: "You will know on the call. So will we." },
] as const;

export const FOR = [
  "Clinicians whose work already outruns their reputation.",
  "Practices past the referral ceiling, ready to own a category rather than compete in one.",
  "Doctors who understand that at this level, restraint is the loudest signal.",
  "Doctors ready to be the face of the brand — not just the founder.",
] as const;

export const NOT_FOR = [
  "Practices shopping for a vendor to manage.",
  "Anyone who needs leads by Friday.",
  "The doctor who wants marketing.",
] as const;

export const FAQ = [
  {
    q: "Who actually does the work?",
    a: "Founders and a named team. No account managers, no layers, no handoffs. The people on the call are the people on set.",
  },
  {
    q: "How much of my time does this take?",
    a: "Four shoot days a year. Two calls a month. The rest runs without you.",
  },
  { q: "Do I own the work?", a: "Yes. Everything created vests to you at the close of term." },
  {
    q: "What does it cost?",
    a: "Terms are discussed on the call, after fit. If price is the deciding factor, this is not the right room.",
  },
  { q: "What if my market is already held?", a: "Then it is held. Request a consultation to confirm." },
  {
    q: "What if it doesn’t deliver?",
    a: "Your first shoot, your locked positioning and live content land in quarter one — or production continues until they do. No partner ends a term empty-handed.",
  },
  {
    q: "How is progress shown?",
    a: "A quarterly value review: the owned asset counted, reach trend, inbound quality, pricing power, and how the practice reads against its market. Ninety days at a time, in writing.",
  },
] as const;

export const ICEBERG = {
  visible: ["Logo", "Website", "Photography", "Language", "The room", "Detail"],
  invisible: ["Positioning", "Messaging", "Strategy", "Brand voice", "Consistency", "Trust"],
} as const;
