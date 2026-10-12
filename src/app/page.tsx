import type { Metadata } from "next";

import { Page } from "@/components/layout/Page";
import { MarketChecker } from "@/components/sections/MarketChecker";
import { PressMarquee } from "@/components/sections/PressMarquee";
import { RosterIndex } from "@/components/sections/RosterIndex";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { BrandsShowcase } from "@/components/sections/home/BrandsShowcase";
import { FeatureCase } from "@/components/sections/home/FeatureCase";
import { FilmsRail } from "@/components/sections/home/FilmsRail";
import { Hero } from "@/components/sections/home/Hero";
import { Iceberg } from "@/components/sections/home/Iceberg";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { PartnershipRail } from "@/components/sections/home/PartnershipRail";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <Page>
      <Hero />
      <PressMarquee />
      <Manifesto />
      <Iceberg />
      <Stats />
      <PartnershipRail />
      <BrandsShowcase />
      <FeatureCase />
      <FilmsRail />
      <RosterIndex />
      <Testimonials />
      <MarketChecker />
    </Page>
  );
}
