import type { StaticImageData } from "next/image";

import positioning from "@/assets/img/library/chapter-positioning.jpg";
import pov from "@/assets/img/library/chapter-pov.jpg";
import experience from "@/assets/img/library/chapter-experience.jpg";
import signal from "@/assets/img/library/chapter-signal.jpg";
import system from "@/assets/img/library/chapter-system.jpg";

export const WORKBOOK_URL = "https://pasted.studio/yourbrand";

export const VOLUMES = [
  {
    n: "Vol. I",
    title: "The Art of Becoming",
    status: "In circulation",
    body: "A field guide to building a brand asset from who you already are. Twelve sections, forty answers, about ninety minutes.",
    href: WORKBOOK_URL,
  },
  {
    n: "Vol. II",
    title: "The Art of Building",
    status: "Forthcoming · 2027",
    body: "From brand asset to operating system — how the practices that compound quietly pulled ahead.",
  },
  {
    n: "Vol. III–V",
    title: "To be written",
    status: "In the studio",
    body: "Volumes release when they are finished, not when a marketing calendar says so.",
  },
] as const;

export const ARCHITECTURE: { title: string; question: string; body: string; image: StaticImageData }[] = [
  {
    title: "Positioning",
    question: "Who are we for?",
    body: "Call-outs for the three percent of your market that is ready now, an ideal patient described as a person, three differentiators, a signature experience and a promise.",
    image: positioning,
  },
  {
    title: "Point of view",
    question: "What do we believe?",
    body: "A belief statement and a four-layer signature story: origin, continuity, mechanism, promise.",
    image: pov,
  },
  {
    title: "Experience",
    question: "What are we known for?",
    body: "A six-touchpoint audit — and an honest answer to where the brand breaks down today.",
    image: experience,
  },
  {
    title: "Signal",
    question: "What do we say, and when?",
    body: "Content in four quadrants — questions, questions from questions, objections, expectations — and a filter for every post.",
    image: signal,
  },
  {
    title: "System",
    question: "How does it compound?",
    body: "The patient journey from ad to referral, and the weakest link in it. Circle it. Fix it first.",
    image: system,
  },
];

export const SECTIONS = [
  "Prelude",
  "The Premise",
  "Foundation · Ikigai",
  "Compass",
  "Values",
  "Five-part architecture",
  "The three-question test",
  "Horizon · 10·3·1·90",
  "Your brand brief",
  "Doctrine",
  "The first thirty days",
  "Appendix · Plates",
] as const;
