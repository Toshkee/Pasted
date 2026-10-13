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
    body: "Four weeks of research before the first shoot: your market, your positioning and the story the brand will tell.",
    image: imgRoom,
  },
  {
    title: "Cinematic shoots",
    body: "Four fully produced shoot days a year, one each quarter, directed, shot and cut by our own team.",
    image: imgStudio,
  },
  {
    title: "The body of work",
    body: "More than a hundred pieces a year, eight to ten a month, edited and posted for you on a steady schedule.",
    image: imgBody,
  },
  {
    title: "The counsel",
    body: "A strategy call every month about the whole practice, with creative direction between shoots.",
    image: imgNotebook,
  },
  {
    title: "Market exclusivity",
    body: "Your city is yours for as long as the partnership runs. Other practices there are turned down.",
    image: imgArches,
  },
  {
    title: "The world",
    body: "A place in the partner network: dinners, masterminds and events with the other doctors on the roster.",
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
    headline: "Films and content, directed in-house.",
    body: "Cinematic shoots, brand films and content systems — directed, shot and cut by our own team, for paid, organic and the way patients actually watch.",
    points: ["Quarterly cinematic shoots", "Brand & documentary films", "Monthly content cadence", "Editorial photography"],
    cta: "Commission a shoot",
    image: imgCreative,
  },
  {
    title: "Ads & results",
    headline: "Measured on consultations that show up.",
    body: "Meta and Google campaigns for veneers, implants and full-arch — procedure-specific funnels, speed-to-lead and show-rate systems, optimized on consults that show.",
    points: ["Meta & Google campaigns", "Procedure-specific funnels", "Speed-to-lead & nurture", "Ad account audits"],
    cta: "Audit my ad account",
    image: imgAds,
  },
];

export const STEPS = [
  { title: "Book a discovery call.", body: "Answer five short questions, then pick a time." },
  { title: "Meet a founder.", body: "45 minutes on Zoom with Zac Orender or Dr. Alan Clarke about your practice and your market." },
  { title: "If it fits, we begin.", body: "If both sides agree, the partnership starts with the Immersion." },
] as const;

export const FOR = [
  "Clinicians whose work already outruns their reputation.",
  "Practices past the referral ceiling, ready to own a category rather than compete in one.",
  "Doctors who would rather have a quiet, considered brand than louder marketing.",
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
    a: "The founders and a named team. The people you meet on the call are the people on set.",
  },
  {
    q: "How much of my time does this take?",
    a: "Four shoot days a year and two calls a month. Everything else runs without you.",
  },
  { q: "Do I own the work?", a: "Yes. Everything created vests to you at the close of term." },
  {
    q: "What does it cost?",
    a: "Terms are discussed on the call, once both sides know it is a fit.",
  },
  { q: "What if my market is already held?", a: "Then we can’t take on a second practice there. Request a consultation to confirm; a neighboring market may still be open." },
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
