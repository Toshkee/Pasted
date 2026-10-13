import type { StaticImageData } from "next/image";

import { BRAND_GALLERY, type GalleryImage } from "./brand-gallery";

import ballardCard from "@/assets/img/cards/drew-ballard.jpg";
import ballardPoster from "@/assets/img/films/posters/drew-ballard.jpg";
import ballardCandid from "@/assets/img/roster/drew-ballard.jpg";
import clarkePortrait from "@/assets/img/founders/alan-clarke.jpg";
import clarkeCard from "@/assets/img/cards/alan-clarke.jpg";
import clarkeEditorial from "@/assets/img/founders/editorial-green-room.jpg";
import clarkeRestraint from "@/assets/img/films/posters/on-restraint.jpg";

export type CaseStudy = {
  slug: string;
  name: string;
  /** The arc, e.g. "Startup → Category Leader". */
  arc: string;
  location?: string;
  kind: "Practice transformation" | "Brand & identity";
  summary: string;
  challenge: string;
  work: string;
  outcomes: string[];
  services: string[];
  timeline?: string;
  cover: StaticImageData;
  gallery: GalleryImage[];
  quote?: { text: string; by: string };
  /** Film on /films that belongs to this story. */
  film?: string;
};

const g = (slug: string) => BRAND_GALLERY[slug];

export const CASES: CaseStudy[] = [
  {
    slug: "drew-ballard",
    name: "Dr. Drew Ballard",
    arc: "General practice → category of one",
    location: "Gilbert, Arizona",
    kind: "Practice transformation",
    summary:
      "A struggling general practice in a suburb no one associated with cosmetic dentistry — rebuilt into HALO Veneers, a named category with one author.",
    challenge:
      "Drew didn’t need more marketing. He needed an entirely new structure — brand, systems, positioning and demand generation built from nothing in a suburb no one associated with cosmetic dentistry.",
    work:
      "We built Halo from the ground up: full brand identity and positioning, conversion infrastructure, content and ad systems, and an operational framework that lets the practice run without him.",
    outcomes: [
      "$0 → $2M+ aesthetic case revenue in 18 months",
      "Works three days a week, nine months a year",
      "Only does the dentistry he wants to do",
      "Halo Education courses now sold out",
    ],
    services: ["Brand identity", "Positioning", "Conversion infrastructure", "Ad systems", "Operational framework"],
    cover: ballardPoster,
    gallery: [
      { src: ballardCard, label: "PASTED Club — founding member" },
      { src: ballardCandid, label: "On the road with the founder" },
    ],
    quote: {
      text: "Halo did not scale by accident. Zac has been my partner for five years making it happen.",
      by: "Dr. Drew Ballard · Founder, Halo Veneers & Halo Education",
    },
    film: "drew-ballard",
  },
  {
    slug: "mikaela-tozzi",
    name: "Dr. Mikaela Tozzi",
    arc: "Luxury dentistry, without the noise",
    location: "Las Vegas, Nevada",
    kind: "Practice transformation",
    summary:
      "For decision-makers who refuse to settle. A complete brand transformation that positioned Dr. Tozzi as the definitive authority in luxury cosmetic dentistry.",
    challenge:
      "Dr. Tozzi had exceptional clinical skills but lacked a cohesive brand identity that matched her premium positioning. Her online presence didn’t reflect the caliber of her work or the exclusivity of her practice.",
    work:
      "We developed a sophisticated visual identity system that communicates understated luxury. Every touchpoint — from editorial photography to social content — was crafted to attract high-net-worth patients who value discretion and excellence.",
    outcomes: [
      "3× increase in high-value case inquiries",
      "Complete brand identity system delivered in 45 days",
      "Content pipeline generating 150k+ monthly impressions",
    ],
    services: ["Brand strategy", "Visual identity", "Content system", "Editorial photography", "Social management"],
    timeline: "45-day build + ongoing management",
    cover: g("mikaela-tozzi")[1].src,
    gallery: g("mikaela-tozzi"),
  },
  {
    slug: "alan-clarke",
    name: "Dr. Alan Clarke",
    arc: "Burnout → global authority",
    location: "Belfast → the world",
    kind: "Practice transformation",
    summary:
      "The original case study. Excellent clinical skills, no brand infrastructure, building someone else’s equity inside the NHS — until identity led the way.",
    challenge:
      "Alan wasn’t failing — he was trapped. Excellent clinical skills with no brand infrastructure meant he was building someone else’s equity while burning out inside the NHS system.",
    work:
      "We gave him a voice, a narrative and a platform that matched his ability. Identity led before ads: personal brand architecture, PR and media strategy, content positioning and an authority narrative framework.",
    outcomes: [
      "Forbes and New York Post features in year one",
      "O-1 visa granted for extraordinary ability",
      "An autonomous practice with five associates",
      "International recognition as an industry authority",
    ],
    services: ["Personal brand architecture", "PR & media strategy", "Content positioning", "Authority narrative"],
    cover: clarkePortrait,
    gallery: [
      { src: clarkeCard, label: "PASTED Club — founder & speaker" },
      { src: clarkeEditorial, label: "Editorial portrait" },
      { src: clarkeRestraint, label: "On restraint — film still" },
    ],
    film: "on-restraint",
  },
  {
    slug: "only-fangs",
    name: "Only Fangs™",
    arc: "Momentum → monetized brand",
    location: "Las Vegas Smile Suite",
    kind: "Brand & identity",
    summary:
      "Tom was already creating buzz through personality, clinical work and cultural relevance. The problem was not attention — it was structure. Only Fangs™ was built to turn momentum into a scalable, monetizable brand.",
    challenge:
      "Tom had attention and cultural relevance, but lacked structure. The momentum was real but scattered — no framework to turn buzz into a scalable, monetizable brand that could grow independently.",
    work:
      "The work centered on sharpening the concept, elevating the aesthetic and building a narrative strong enough to sustain demand beyond novelty. What emerged was a clearly defined brand extension that turned scattered interest into intentional engagement, opened new revenue pathways, and positioned Tom as more than a clinician — a cultural operator with a brand that can grow independently of geography.",
    outcomes: [
      "A brand that scales independent of geography",
      "New revenue pathways through a monetized brand extension",
      "Positioned as a cultural operator, not just a clinician",
      "Scattered attention turned into intentional engagement",
    ],
    services: ["Brand positioning", "Visual identity", "Content strategy", "Brand architecture", "Monetization framework"],
    timeline: "45-day build + ongoing management",
    cover: g("only-fangs")[1].src,
    gallery: g("only-fangs"),
  },
  {
    slug: "nav-atwal",
    name: "Dr. Nav Atwal",
    arc: "A rock star in the making",
    location: "Miami, Florida",
    kind: "Brand & identity",
    summary:
      "Dr. Nav Atwal lives and practices in Miami — a city where taste, visibility and cultural relevance are non-negotiable. He’s not just becoming well known. He’s becoming unavoidable.",
    challenge:
      "His first identity was designed to stand out in a sea of sameness — and it did. But as he stepped into the next stage, the brand needed to rise with him: keep the individuality and freshness, while mirroring the sophistication, artistry and luxury of the work he delivers.",
    work:
      "Blending serif character with sans-serif clarity, the ATWAL wordmark was crafted from the ground up to feel both distinctive and refined. The identity balances playfulness with professionalism — setting a new tone, with the foundation, positioning and narrative to build toward something far bigger than a practice.",
    outcomes: [
      "A complete identity system elevated to Miami standards",
      "A wordmark balancing individuality with elegance",
      "Positioned as a cultural operator, not just a clinician",
      "A trajectory toward becoming unavoidable in the market",
    ],
    services: ["Brand strategy", "Visual identity", "Wordmark design", "Brand architecture", "Cultural positioning"],
    timeline: "45-day build + ongoing management",
    cover: g("nav-atwal")[1].src,
    gallery: g("nav-atwal"),
  },
  {
    slug: "serena-wong",
    name: "Dr. Serena Wong",
    arc: "Invisible excellence → recognized authority",
    location: "Alberta, Canada",
    kind: "Brand & identity",
    summary:
      "Serena’s challenge was never quality — it was visibility aligned with her standards. The work focused on refinement, coherence and authorship rather than amplification.",
    challenge:
      "Serena had excellence but lacked visibility aligned with her standards. Her brand demanded more from her than it gave back, requiring compromises that didn’t reflect her level of care and intention.",
    work:
      "By distilling her voice, values and visual language into a unified identity, the brand began to work for her instead of demanding more from her — stronger inbound alignment, greater confidence in communication, and a presence that reflects her level of care.",
    outcomes: [
      "One identity across voice, values and visual language",
      "Stronger inbound alignment with ideal patients",
      "A professional presence that feels unmistakably her own",
      "Fewer compromises, clearer demand",
    ],
    services: ["Brand refinement", "Visual identity", "Voice development", "Content strategy", "Authority positioning"],
    timeline: "45-day build + ongoing management",
    cover: g("serena-wong")[0].src,
    gallery: g("serena-wong"),
    quote: {
      text: "They gave me the confidence to tell my story in a way that feels authentic and aligned with who I am.",
      by: "Dr. Serena Wong · Cosmetic Dentist & Owner, Alberta",
    },
    film: "serena-wong",
  },
  {
    slug: "jake-bateman",
    name: "Dr. Jake Bateman",
    arc: "Cosmetic dentistry that’s elevated",
    location: "Brentwood, Tennessee",
    kind: "Brand & identity",
    summary:
      "A brand identity that captures Dr. Bateman’s presence and translates it into visual form — elevated, sophisticated, instantly recognizable.",
    challenge:
      "Dr. Bateman needed an identity that projected the credibility of an experienced practitioner at the highest level — established and assured without leaning into excess, with the same precision and artistry that define his clinical work.",
    work:
      "The BATEMAN wordmark was crafted with minimalist elegance — letter spacing and geometric detail that convey precision. The JB monogram distills the brand to its purest form: instantly recognizable, yet understated. Together, the system embodies confidence, clarity and refinement.",
    outcomes: [
      "A BATEMAN wordmark with geometric precision",
      "A JB monogram for every application",
      "Complete environmental design for the Brentwood practice",
      "A system that projects established authority",
    ],
    services: ["Brand strategy", "Visual identity", "Wordmark design", "Monogram design", "Environmental design", "Collateral"],
    timeline: "45-day build + ongoing management",
    cover: g("jake-bateman")[0].src,
    gallery: g("jake-bateman"),
  },
  {
    slug: "nakul-ratra",
    name: "Dr. Nakul Ratra",
    arc: "Restoring character, not just smiles",
    kind: "Brand & identity",
    summary:
      "Beauty already exists within structure. His role is not to overwrite it — it is to bring it forward. With precision. With restraint. With artistry.",
    challenge:
      "Dr. Ratra had a distinctive philosophy — preserve first, enhance second — but no brand infrastructure to communicate it. His identity didn’t reflect the intentionality of his clinical approach, or the calibre of patient he wanted to attract.",
    work:
      "A brand rooted in warmth, restraint and natural sophistication: a single burnt-clay palette, a handwritten ‘Dr.’ signature against structured serif typography, and an earthy visual language for a dentist who designs smiles the way an artist works — layering, refining, revealing.",
    outcomes: [
      "A complete identity with dual wordmark and monogram",
      "Brand architecture connecting the personal brand to Karma Dentistry",
      "A content system reflecting a natural, intentional philosophy",
      "A visual language for patients who value preservation over perfection",
    ],
    services: ["Brand strategy", "Visual identity", "Wordmark design", "Monogram design", "Content direction", "Social templates"],
    timeline: "45-day build + ongoing management",
    cover: g("nakul-ratra")[1].src,
    gallery: g("nakul-ratra"),
  },
  {
    slug: "meg-rascius",
    name: "Dr. Meg Rascius",
    arc: "Timeless artistry, beautiful smiles",
    kind: "Brand & identity",
    summary:
      "Like an heirloom piece of jewelry, a healthy, happy smile becomes part of the moments we treasure most — shining bright and carrying stories of joy, confidence and connection.",
    challenge:
      "Dr. Rascius needed an identity that matched her philosophy of gentle refinement — revealing natural brilliance rather than manufacturing it. Warm, approachable and unmistakably premium, without tipping into clinical coldness.",
    work:
      "Inspired by vintage jewelry pendants, we built a system anchored by the MR monogram seal and a handwritten signature wordmark. A sage and blush palette with serif typography creates calm sophistication that puts patients at ease from the very first glance.",
    outcomes: [
      "A distinctive MR monogram seal inspired by vintage jewelry",
      "Clinic design integration with branded signage",
      "A system spanning digital, print and environmental design",
      "An identity that feels enduring, graceful and rooted in care",
    ],
    services: ["Brand strategy", "Visual identity", "Monogram design", "Clinic design", "Content direction", "Collateral"],
    timeline: "45-day build + ongoing management",
    cover: g("meg-rascius")[0].src,
    gallery: g("meg-rascius"),
  },
  {
    slug: "vik-ravoory",
    name: "Dr. Vik Ravoory",
    arc: "Brand creation & career inflection",
    location: "Palm Beach, Florida",
    kind: "Brand & identity",
    summary:
      "A young associate with ambition, clinical promise and the same uncertainty most early-career dentists face: no differentiation, no narrative ownership, no framework for long-term leverage.",
    challenge:
      "Like many associates, Vik was doing everything ‘right’ on paper, yet felt invisible in practice. No clear differentiation, no narrative ownership and no framework for long-term leverage defined his early trajectory.",
    work:
      "The early work focused not on exposure, but on foundation. Identity, voice, values and long-term direction were clarified before a single piece of content mattered. There were real growing pains — iterations that didn’t land, recalibration of tone — and that friction was essential. The brand wasn’t manufactured; it was built. Vik stopped trying to fit existing molds and began operating from authorship.",
    outcomes: [
      "An intentional, coherent brand identity",
      "Credible positioning in the market",
      "Control over his career trajectory",
      "Accelerated momentum and clearer opportunities",
    ],
    services: ["Brand architecture", "Identity development", "Voice & values", "Content strategy", "Career positioning"],
    timeline: "45-day build + ongoing management",
    cover: g("vik-ravoory")[0].src,
    gallery: g("vik-ravoory"),
  },
  {
    slug: "suzan-prater",
    name: "Dr. Suzan Prater",
    arc: "Precision → presence",
    location: "Charleston, South Carolina",
    kind: "Brand & identity",
    summary:
      "A refined identity for a practice built on meticulous clinical standards and understated warmth — quiet expertise turned into a brand patients remember before they ever sit in the chair.",
    challenge:
      "Dr. Prater had built a reputation on clinical excellence and personal care, but her brand presence was fragmented. The practice communicated skill without the warmth that defined the patient experience.",
    work:
      "A unified identity centered on an elegant monogram and a restrained gold-and-charcoal palette. Every touchpoint — from stationery to digital — signals precision, warmth and quiet authority.",
    outcomes: [
      "A cohesive identity across print and digital",
      "Elevated patient perception within the first 90 days",
      "Streamlined materials with less production friction",
      "A foundation for a multi-location presence",
    ],
    services: ["Brand strategy", "Visual identity", "Monogram design", "Collateral system", "Digital presence"],
    timeline: "45-day build + ongoing management",
    cover: g("suzan-prater")[0].src,
    gallery: g("suzan-prater"),
  },
  {
    slug: "karma-dentistry",
    name: "Karma Dentistry",
    arc: "Character → culture",
    kind: "Brand & identity",
    summary:
      "A practice brand built around the idea that dentistry should preserve and reveal what already exists — warm, earthy sophistication with a clear cultural point of view.",
    challenge:
      "Karma had a distinctive patient philosophy — preserve first, enhance second — but lacked the infrastructure to communicate it at scale, without defaulting to clinical sterility.",
    work:
      "A system built around a botanical mark, a warm terracotta and cream palette, and structured serif typography balanced by a human signature — running across environmental, print and digital touchpoints.",
    outcomes: [
      "Brand architecture connecting personal and practice brands",
      "Environmental design integrated across the clinic",
      "A content system reflecting a natural, intentional philosophy",
      "A visual language for patients who value preservation",
    ],
    services: ["Brand strategy", "Visual identity", "Brand architecture", "Environmental design", "Content direction"],
    timeline: "45-day build + ongoing management",
    cover: g("karma-dentistry")[1].src,
    gallery: g("karma-dentistry"),
  },
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);

export const TRANSFORMATIONS = CASES.filter((c) => c.kind === "Practice transformation");
export const IDENTITIES = CASES.filter((c) => c.kind === "Brand & identity");
