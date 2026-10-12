import type { StaticImageData } from "next/image";

import zac from "@/assets/img/founders/zac-orender.jpg";
import alan from "@/assets/img/founders/alan-clarke.jpg";
import club from "@/assets/img/studio/exp-club.jpg";
import dinner from "@/assets/img/studio/exp-dinner.jpg";
import masterclass from "@/assets/img/studio/exp-masterclass.jpg";
import candles from "@/assets/img/studio/world-experiences.jpg";

export type Founder = {
  slug: string;
  name: string;
  role: string;
  portrait: StaticImageData;
  thesis: string;
  bio: string[];
  focus: string[];
  email: string;
};

export const FOUNDERS: Founder[] = [
  {
    slug: "zac-orender",
    name: "Zac Orender",
    role: "Co-Founder · Strategy",
    portrait: zac,
    thesis: "The brand is the practice. The practice is the brand.",
    bio: [
      "An entrepreneur, writer and strategist who has helped businesses scale past $100 million in revenue — across healthcare, technology, media and consumer growth.",
      "Zac treats growth as a whole-business question: where a practice sits in its market, why anyone should care, how it communicates, how it scales, and what it must become to lead. Position first. Everything else after.",
    ],
    focus: ["Positioning & offer", "Growth systems", "Narrative strategy", "Partner counsel"],
    email: "zac@getpasted.com",
  },
  {
    slug: "alan-clarke",
    name: "Dr. Alan Clarke",
    role: "Co-Founder · Creative direction",
    portrait: alan,
    thesis: "A standard set in the chair, then carried into the brand.",
    bio: [
      "A clinician, entrepreneur and creative director — and the studio’s original case study. From burnout inside the NHS in Belfast to Forbes, the New York Post and an O-1 visa for extraordinary ability.",
      "Alan directs much of PASTED’s visual work, from campaigns to documentary films across the US, Europe, Australia, India and the Middle East. Behind every partnership decision sits one question: does this hold up in the chair, on the day?",
    ],
    focus: ["Creative direction", "Film & campaigns", "Patient experience", "Gatherings"],
    email: "alan@getpasted.com",
  },
];

export const GATHERINGS: { title: string; place: string; body: string; image: StaticImageData }[] = [
  {
    title: "The Annual Summit",
    place: "Miami · Delano South Beach",
    body: "A full day for the roster — brand strategy sessions, cinematic previews and conversations on growth. Held each September.",
    image: candles,
  },
  {
    title: "Founders Dinner Series",
    place: "London · New York",
    body: "Long tables, off-record. The doctors on the roster — and the practices we are watching.",
    image: dinner,
  },
  {
    title: "The Pasted Mastermind",
    place: "By invitation",
    body: "A program for the next ten years of aesthetic dentistry. Run live, four times a year, in person.",
    image: masterclass,
  },
  {
    title: "Practice Retreats",
    place: "Los Angeles · Marrakech",
    body: "Away from the operatory. Where strategy gets made and friendships hold.",
    image: club,
  },
];
