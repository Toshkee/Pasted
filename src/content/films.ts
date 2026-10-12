import type { StaticImageData } from "next/image";

import pPartnership from "@/assets/img/films/posters/the-pasted-partnership.jpg";
import pHumanEdge from "@/assets/img/films/brian-harris-walk.jpg";
import pRestraint from "@/assets/img/films/posters/on-restraint.jpg";
import pBallard from "@/assets/img/films/posters/drew-ballard.jpg";
import pHerzik from "@/assets/img/films/posters/cole-herzik.jpg";
import pWong from "@/assets/img/films/posters/serena-wong.jpg";
import pMahmood from "@/assets/img/films/posters/naweed-mahmood.jpg";
import pCosgrove from "@/assets/img/films/posters/ben-cosgrove.jpg";
import pSaleh from "@/assets/img/films/posters/sam-saleh-presents.jpg";
import pRecap from "@/assets/img/films/posters/pasted-2025.jpg";
import pNY from "@/assets/img/films/posters/new-york.jpg";
import pLondon from "@/assets/img/films/posters/london.jpg";
import pLA from "@/assets/img/films/posters/los-angeles.jpg";
import pVerde from "@/assets/img/films/posters/verde-river.jpg";
import pSolventum from "@/assets/img/films/posters/solventum.jpg";
import pMHM from "@/assets/img/films/posters/marshall-hanson-method.jpg";
import pMarashi from "@/assets/img/films/posters/broke-to-billionaire.jpg";
import pSmiletrend from "@/assets/img/films/posters/smiletrend-mastering-veneers.jpg";
import pAllen from "@/assets/img/films/posters/michael-allen.jpg";
import pBesmer from "@/assets/img/films/posters/alex-besmer.jpg";
import pOnZac from "@/assets/img/films/posters/on-zac.jpg";
import pPlatform from "@/assets/img/films/posters/the-platform.jpg";

export type FilmCategory = "Feature" | "Partner portrait" | "Gathering" | "Brand film" | "In their words";

export type Film = {
  slug: string;
  /** Wistia media id — full film streams from Wistia only when the viewer presses play. */
  wistiaId: string;
  title: string;
  subtitle: string;
  category: FilmCategory;
  duration: string;
  orientation: "landscape" | "portrait";
  poster: StaticImageData;
};

/** 4-second, muted, ~100 KB loops cut from each film (public/media/previews). */
export const previewSrc = (slug: string) => `/media/previews/${slug}.mp4`;

export const FILMS: Film[] = [
  {
    slug: "the-pasted-partnership",
    wistiaId: "8kirf86p7j",
    title: "The PASTED Partnership",
    subtitle: "Unscripted. Marashi, Harris, Saleh and others on what five years inside looks like.",
    category: "Feature",
    duration: "1:28",
    orientation: "landscape",
    poster: pPartnership,
  },
  {
    slug: "the-human-edge",
    wistiaId: "t79pc3h06u",
    title: "The Human Edge",
    subtitle: "In conversation with Dr. Brian Harris, founder of Smile Virtual.",
    category: "Feature",
    duration: "6:09",
    orientation: "landscape",
    poster: pHumanEdge,
  },
  {
    slug: "on-restraint",
    wistiaId: "5kv4bksmgi",
    title: "On Restraint",
    subtitle: "Dr. Alan Clarke on why restraint matters so much in branding.",
    category: "Feature",
    duration: "1:06",
    orientation: "landscape",
    poster: pRestraint,
  },
  {
    slug: "drew-ballard",
    wistiaId: "d2frf6dfar",
    title: "Dr. Drew Ballard",
    subtitle: "Halo Veneers · Gilbert, Arizona",
    category: "Partner portrait",
    duration: "1:50",
    orientation: "portrait",
    poster: pBallard,
  },
  {
    slug: "cole-herzik",
    wistiaId: "0dlp41jm4g",
    title: "Dr. Cole Herzik",
    subtitle: "Las Vegas, Nevada",
    category: "Partner portrait",
    duration: "1:16",
    orientation: "portrait",
    poster: pHerzik,
  },
  {
    slug: "serena-wong",
    wistiaId: "6mg4oi3z42",
    title: "Dr. Serena Wong",
    subtitle: "Alberta, Canada",
    category: "Partner portrait",
    duration: "1:37",
    orientation: "portrait",
    poster: pWong,
  },
  {
    slug: "broke-to-billionaire",
    wistiaId: "4tha81fm7s",
    title: "From Broke to Billionaire",
    subtitle: "With Dr. Jon Marashi · Los Angeles",
    category: "Partner portrait",
    duration: "0:49",
    orientation: "portrait",
    poster: pMarashi,
  },
  {
    slug: "naweed-mahmood",
    wistiaId: "ea4bpi99jb",
    title: "Dr. Naweed Mahmood",
    subtitle: "Portrait film",
    category: "Partner portrait",
    duration: "1:01",
    orientation: "portrait",
    poster: pMahmood,
  },
  {
    slug: "ben-cosgrove",
    wistiaId: "qb4s0ch4sg",
    title: "Dr. Ben Cosgrove",
    subtitle: "Portrait film",
    category: "Partner portrait",
    duration: "1:34",
    orientation: "portrait",
    poster: pCosgrove,
  },
  {
    slug: "sam-saleh-presents",
    wistiaId: "lrt1tuadco",
    title: "Dr. Sam Saleh",
    subtitle: "Dentistry × Pasted Presents — the stage trailer",
    category: "Gathering",
    duration: "1:10",
    orientation: "portrait",
    poster: pSaleh,
  },
  {
    slug: "verde-river",
    wistiaId: "nvo7tlonj5",
    title: "Verde River",
    subtitle: "Dentistry × Pasted Presents · Arizona retreat",
    category: "Gathering",
    duration: "1:07",
    orientation: "portrait",
    poster: pVerde,
  },
  {
    slug: "pasted-2025",
    wistiaId: "8ogqkyozsk",
    title: "Pasted, 2025",
    subtitle: "The year in twenty-two seconds.",
    category: "Gathering",
    duration: "0:22",
    orientation: "portrait",
    poster: pRecap,
  },
  {
    slug: "new-york",
    wistiaId: "3jd279wbcn",
    title: "New York",
    subtitle: "On location",
    category: "Gathering",
    duration: "0:35",
    orientation: "portrait",
    poster: pNY,
  },
  {
    slug: "london",
    wistiaId: "e2i9vigkz6",
    title: "London",
    subtitle: "On location",
    category: "Gathering",
    duration: "0:34",
    orientation: "portrait",
    poster: pLondon,
  },
  {
    slug: "los-angeles",
    wistiaId: "atfx14vrba",
    title: "Los Angeles",
    subtitle: "On location",
    category: "Gathering",
    duration: "0:53",
    orientation: "portrait",
    poster: pLA,
  },
  {
    slug: "smiletrend-mastering-veneers",
    wistiaId: "8vygnsrycv",
    title: "Mastering Veneers",
    subtitle: "Smile Trend Institute of Modern Cosmetic Dentistry",
    category: "Brand film",
    duration: "1:50",
    orientation: "portrait",
    poster: pSmiletrend,
  },
  {
    slug: "solventum",
    wistiaId: "b3ch9wkwaf",
    title: "Solventum × PASTED",
    subtitle: "Brand partnership film",
    category: "Brand film",
    duration: "1:16",
    orientation: "portrait",
    poster: pSolventum,
  },
  {
    slug: "marshall-hanson-method",
    wistiaId: "00u7mh4ze8",
    title: "Marshall Hanson Method",
    subtitle: "Brand film",
    category: "Brand film",
    duration: "0:49",
    orientation: "portrait",
    poster: pMHM,
  },
  {
    slug: "michael-allen",
    wistiaId: "wqd6gdwzc8",
    title: "Dr. Michael Allen",
    subtitle: "“Working with Zac and his team…”",
    category: "In their words",
    duration: "0:33",
    orientation: "portrait",
    poster: pAllen,
  },
  {
    slug: "alex-besmer",
    wistiaId: "sqll3pksgd",
    title: "Dr. Alex Besmer",
    subtitle: "On being seen",
    category: "In their words",
    duration: "0:50",
    orientation: "portrait",
    poster: pBesmer,
  },
  {
    slug: "on-zac",
    wistiaId: "5ue7wlj8b6",
    title: "On Zac",
    subtitle: "A partner on working with the founder",
    category: "In their words",
    duration: "0:49",
    orientation: "portrait",
    poster: pOnZac,
  },
  {
    slug: "the-platform",
    wistiaId: "af7m87juf2",
    title: "The Platform",
    subtitle: "A conversation, cut short",
    category: "In their words",
    duration: "0:15",
    orientation: "portrait",
    poster: pPlatform,
  },
];

export const filmBySlug = (slug: string) => {
  const film = FILMS.find((f) => f.slug === slug);
  if (!film) throw new Error(`Unknown film: ${slug}`);
  return film;
};

export const FILM_CATEGORIES: FilmCategory[] = ["Feature", "Partner portrait", "Gathering", "Brand film", "In their words"];
