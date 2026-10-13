import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Cursor } from "@/components/media/Cursor";
import { VideoModalProvider } from "@/components/media/VideoModal";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE } from "@/content/site";

import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `PASTED — ${SITE.tagline}`,
    template: "%s · PASTED",
  },
  description: SITE.description,
  applicationName: "PASTED",
  openGraph: {
    type: "website",
    siteName: "PASTED",
    title: `PASTED — ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // Concept deployments stay out of search results until the studio adopts the site (ALLOW_INDEXING=true).
  robots: process.env.ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PASTED",
  url: SITE.url,
  slogan: SITE.tagline,
  description: SITE.description,
  email: SITE.emails[0].address,
  founder: [
    { "@type": "Person", name: "Zac Orender" },
    { "@type": "Person", name: "Dr. Alan Clarke" },
  ],
  sameAs: SITE.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveal animations hide content only once we know JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh bg-ink text-bone">
        <SmoothScroll>
          <VideoModalProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </VideoModalProvider>
        </SmoothScroll>
        <RevealObserver />
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
