import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import wordmark from "@/assets/logo/wordmark.json";

export const alt = "PASTED — The Standard in Aesthetic Dentistry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Cached so the image is generated once at build time rather than on every request. */
async function background() {
  "use cache";
  const file = await readFile(join(process.cwd(), "src/assets/img/library/doctrine-backdrop.jpg"));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  const bg = await background();
  const [, , w, h] = wordmark.viewBox.split(" ").map(Number);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0b0a09" }}>
        <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover", opacity: 0.4 }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 72,
            background: "linear-gradient(180deg, rgba(11,10,9,0.35), rgba(11,10,9,0.9))",
          }}
        >
          <div style={{ display: "flex", color: "#c08552", fontSize: 22, letterSpacing: 6 }}>THE STANDARD IN AESTHETIC DENTISTRY</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <svg width={560} height={(560 * h) / w} viewBox={wordmark.viewBox} fill="#ede8e0">
              <path fillRule="evenodd" d={wordmark.d} />
            </svg>
            <div style={{ display: "flex", marginTop: 28, color: "#c8c1b6", fontSize: 30 }}>
              Brand, film and growth for cosmetic dentistry · One practice per market
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
