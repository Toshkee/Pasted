import type { StaticImageData } from "next/image";

import marashi from "@/assets/img/roster/jon-marashi.jpg";
import harris from "@/assets/img/roster/brian-harris.jpg";
import saleh from "@/assets/img/roster/sam-saleh.jpg";
import hanson from "@/assets/img/roster/marshall-hanson.jpg";
import ballard from "@/assets/img/cards/drew-ballard.jpg";
import wong from "@/assets/img/roster/serena-wong.jpg";
import ruminer from "@/assets/img/cards/kooper-ruminer.jpg";
import diabi from "@/assets/img/cards/nour-diabi.jpg";
import lidder from "@/assets/img/cards/gage-lidder.jpg";
import allen from "@/assets/img/cards/smiletrend.jpg";
import eskander from "@/assets/img/roster/rhona-eskander.jpg";

export type Testimonial = {
  quote: string;
  /** A short pull-quote used where the full quote would be too long. */
  pull: string;
  name: string;
  role: string;
  image?: StaticImageData;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    pull: "At this level, brand is not optional. It is fundamental.",
    quote:
      "At this level, brand is not optional. It is fundamental. Zac and Alan understand this better than anyone I’ve worked with. Their taste, restraint, and execution are elite. If you are serious about building a real brand — one that lasts — I would not work with anyone else.",
    name: "Dr. Jon Marashi",
    role: "Celebrity Dentist · Los Angeles, CA",
    image: marashi,
  },
  {
    pull: "Halo did not scale by accident.",
    quote:
      "Halo did not scale by accident. From a struggling general practice in Gilbert, AZ to my dream clinic — only doing the dentistry I want to do, surpassing all revenue goals, working less than 9 months per year, 3 days per week. Zac has been my partner for 5 years making it happen.",
    name: "Dr. Drew Ballard",
    role: "Founder, Halo Veneers & Halo Education · Gilbert, AZ",
    image: ballard,
  },
  {
    pull: "World-class work in every sense. Zero fluff.",
    quote:
      "This is world-class work in every sense. The strategy is genius-level, the execution is flawless, and there is zero fluff. I could not recommend them more highly.",
    name: "Dr. Sam Saleh",
    role: "Celebrity Dentist · Los Angeles & London",
    image: saleh,
  },
  {
    pull: "Pasted is the standard for brand and growth in modern aesthetic dentistry.",
    quote:
      "There is so much out there that looks artistic and beautiful on the surface, but very little of it is truly holistic or empathetic. Pasted not only encapsulates that and lets the work speak, but they truly bring dreams to life for dentistry’s best — past, present and future. Pasted is the standard for brand and growth in modern aesthetic dentistry.",
    name: "Dr. Marshall Hanson",
    role: "Founder, Marshall Hanson Method · Provo, UT",
    image: hanson,
  },
  {
    pull: "PASTED is setting the new standard for brand and growth.",
    quote: "PASTED is setting the new standard for brand and growth in modern aesthetic dentistry.",
    name: "Dr. Brian Harris",
    role: "Founder, Smile Virtual · Washington, DC",
    image: harris,
  },
  {
    pull: "They gave me the confidence to tell my story.",
    quote:
      "Working with this team has been an exceptional experience. They gave me the confidence to tell my story in a way that feels authentic and aligned with who I am. I am very selective about what I put my name behind, and their work stands out for its intention, professionalism, creativity and attention to detail.",
    name: "Dr. Serena Wong",
    role: "Cosmetic Dentist & Owner · Alberta, Canada",
    image: wong,
  },
  {
    pull: "Intelligent, restrained, and deeply respectful of individuality.",
    quote:
      "This work is intelligent, restrained, and deeply respectful of individuality. Zac and Alan build brands with intention and integrity. I’m genuinely grateful that more doctors can now access something this refined and thoughtful.",
    name: "Dr. Rhona Eskander",
    role: "Chelsea Dental Clinic · London",
    image: eskander,
  },
  {
    pull: "They remove confusion while preserving ambition.",
    quote:
      "I’ve built practices from the ground up, and I can say with absolute certainty — doing this without Zac and Alan would have taken years longer and cost far more mistakes. They remove confusion while preserving ambition. That alone is invaluable.",
    name: "Dr. Kooper Ruminer",
    role: "Associate & Practice Owner · Oklahoma City, OK",
    image: ruminer,
  },
  {
    pull: "I would not hand this responsibility to anyone else.",
    quote:
      "My brand is highly distinguished, and I am extremely selective about who I trust with it. I would not hand this responsibility to anyone else. I’m also incredibly glad that this level of work is now accessible to more doctors.",
    name: "Dr. Mark Hughes",
    role: "Celebrity Dentist · Harley Street, London",
  },
  {
    pull: "A consistent flow of cosmetic patients.",
    quote:
      "Working with Zac and his team helped me realize how powerful social media can be to bringing in that perfect cosmetic patient. Not only do I have a consistent flow of cosmetic patients, it has established me as the expert in my field in my local area. It’s been a great investment, and I plan to continue using them for a long time.",
    name: "Dr. Michael Allen",
    role: "Co-founder, Smile Trend Institute · Tucson, AZ",
    image: allen,
  },
  {
    pull: "They don’t just create content — they tell your story.",
    quote:
      "Pasted Studio don’t just create content, they tell your story. Alan and Zac captured who I am as a clinician with real depth and authenticity. Their focus on genuine storytelling over forced marketing is clear in every piece of content.",
    name: "Dr. Nour Diabi",
    role: "Associate · Liverpool",
    image: diabi,
  },
  {
    pull: "My online presence finally matches the standard of my work.",
    quote:
      "Pasted took the pressure off my shoulders. They helped me translate who I am in the clinic into a clear, authentic personal brand the world can actually see. They didn’t just create content — they helped me communicate confidence, credibility, and personality without it feeling forced. It finally feels like my online presence matches the standard of my work.",
    name: "Dr. Gage Lidder",
    role: "Associate · London",
    image: lidder,
  },
];
