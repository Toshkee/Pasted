import type { MetadataRoute } from "next";

import { SITE } from "@/content/site";
import { CASES } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/partnership", "/work", "/films", "/founders", "/library", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...CASES.map((c) => ({ url: `${SITE.url}/work/${c.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
