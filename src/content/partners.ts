import type { StaticImageData } from "next/image";

import marashi from "@/assets/img/roster/jon-marashi.jpg";
import harris from "@/assets/img/roster/brian-harris.jpg";
import saleh from "@/assets/img/roster/sam-saleh.jpg";
import hanson from "@/assets/img/roster/marshall-hanson.jpg";
import eskander from "@/assets/img/roster/rhona-eskander.jpg";
import tozzi from "@/assets/img/roster/mikaela-tozzi.jpg";
import prater from "@/assets/img/roster/suzan-prater.jpg";
import irving from "@/assets/img/roster/piotr-irving.jpg";
import heaton from "@/assets/img/roster/james-heaton.jpg";
import ballard from "@/assets/img/roster/drew-ballard.jpg";
import beckstead from "@/assets/img/roster/davis-beckstead.jpg";
import berant from "@/assets/img/roster/dan-berant.jpg";
import akuonu from "@/assets/img/roster/chinwe-akuonu.jpg";
import herzik from "@/assets/img/roster/cole-herzik.jpg";
import ravoory from "@/assets/img/roster/vik-ravoory.jpg";
import besmer from "@/assets/img/roster/alex-besmer.jpg";
import mccann from "@/assets/img/roster/patrick-mccann.jpg";
import smith from "@/assets/img/roster/matt-smith.jpg";
import wong from "@/assets/img/roster/serena-wong.jpg";

import cardZac from "@/assets/img/cards/zac-orender.jpg";
import cardClarke from "@/assets/img/cards/alan-clarke.jpg";
import cardMarashi from "@/assets/img/cards/jon-marashi.jpg";
import cardBallard from "@/assets/img/cards/drew-ballard.jpg";
import cardTozzi from "@/assets/img/cards/mikaela-tozzi.jpg";
import cardHanson from "@/assets/img/cards/marshall-hanson.jpg";
import cardSmiletrend from "@/assets/img/cards/smiletrend.jpg";
import cardRuminer from "@/assets/img/cards/kooper-ruminer.jpg";
import cardDiabi from "@/assets/img/cards/nour-diabi.jpg";
import cardLidder from "@/assets/img/cards/gage-lidder.jpg";

export type Partner = {
  slug: string;
  name: string;
  city: string;
  note?: string;
  image: StaticImageData;
  /** Related case study on /work, if one exists. */
  work?: string;
};

export const ROSTER: Partner[] = [
  { slug: "jon-marashi", name: "Dr. Jon Marashi", city: "Los Angeles", note: "Celebrity dentist", image: marashi },
  { slug: "brian-harris", name: "Dr. Brian Harris", city: "Washington, DC", note: "Founder, Smile Virtual", image: harris },
  { slug: "sam-saleh", name: "Dr. Sam Saleh", city: "LA · London", note: "Celebrity dentist", image: saleh },
  { slug: "marshall-hanson", name: "Dr. Marshall Hanson", city: "Provo, UT", note: "Marshall Hanson Method", image: hanson },
  { slug: "rhona-eskander", name: "Dr. Rhona Eskander", city: "Chelsea, London", note: "Chelsea Dental Clinic", image: eskander },
  { slug: "mikaela-tozzi", name: "Dr. Mikaela Tozzi", city: "Las Vegas", note: "Luxury cosmetic dentistry", image: tozzi, work: "mikaela-tozzi" },
  { slug: "suzan-prater", name: "Dr. Suzan Prater", city: "Charleston, SC", image: prater, work: "suzan-prater" },
  { slug: "piotr-irving", name: "Dr. Piotr Irving", city: "Dubai", note: "APA Aesthetic", image: irving },
  { slug: "james-heaton", name: "Dr. James Heaton", city: "Gilbert, AZ", note: "Smile Trend Institute", image: heaton },
  { slug: "drew-ballard", name: "Dr. Drew Ballard", city: "Gilbert, AZ", note: "Halo Veneers", image: ballard, work: "drew-ballard" },
  { slug: "davis-beckstead", name: "Dr. Davis Beckstead", city: "Palo Alto, CA", image: beckstead },
  { slug: "dan-berant", name: "Dr. Dan Berant", city: "New York City", image: berant },
  { slug: "chinwe-akuonu", name: "Dr. Chinwe Akuonu", city: "London", image: akuonu },
  { slug: "cole-herzik", name: "Dr. Cole Herzik", city: "Las Vegas", image: herzik },
  { slug: "vik-ravoory", name: "Dr. Vik Ravoory", city: "Palm Beach, FL", image: ravoory, work: "vik-ravoory" },
  { slug: "alex-besmer", name: "Dr. Alex Besmer", city: "Tampa, FL", image: besmer },
  { slug: "patrick-mccann", name: "Dr. Patrick McCann", city: "Sydney", image: mccann },
  { slug: "matt-smith", name: "Dr. Matt Smith", city: "Milwaukee, WI", image: smith },
  { slug: "serena-wong", name: "Dr. Serena Wong", city: "Alberta, Canada", image: wong, work: "serena-wong" },
];

export type ClubCard = { name: string; role: string; image: StaticImageData };

/** The graded "PASTED Club" member cards — a signature brand artifact. */
export const CLUB_CARDS: ClubCard[] = [
  { name: "Zac Orender", role: "Founder & Speaker", image: cardZac },
  { name: "Dr. Alan Clarke", role: "Founder & Speaker", image: cardClarke },
  { name: "Dr. Jon Marashi", role: "Keynote Speaker", image: cardMarashi },
  { name: "Dr. Drew Ballard", role: "Founding Member", image: cardBallard },
  { name: "Dr. Mikaela Tozzi", role: "Founding Member", image: cardTozzi },
  { name: "Dr. Marshall Hanson", role: "Founding Member", image: cardHanson },
  { name: "Smile Trend", role: "Dr. Allen & Dr. Heaton", image: cardSmiletrend },
  { name: "Dr. Kooper Ruminer", role: "Founding Member", image: cardRuminer },
  { name: "Dr. Nour Diabi", role: "Founding Member", image: cardDiabi },
  { name: "Dr. Gage Lidder", role: "Founding Member", image: cardLidder },
];
