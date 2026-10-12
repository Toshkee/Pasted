/** Traces the raster PASTED logos into compact single-path SVGs (fill = currentColor). */
import fs from "node:fs";
import sharp from "sharp";
import potrace from "potrace";
const [src, out] = process.argv.slice(2);
// Logos are light-on-transparent: composite onto black, invert so the mark is dark for potrace.
const buf = await sharp(src).flatten({ background: "#000" }).grayscale().negate().png().toBuffer();
const svg = await new Promise((res, rej) =>
  potrace.trace(buf, { threshold: 128, turdSize: 4, optTolerance: 0.3, color: "currentColor", background: "transparent" }, (e, s) => (e ? rej(e) : res(s))),
);
const d = svg.match(/ d="([^"]+)"/)[1];
const { width, height } = await sharp(src).metadata();
fs.writeFileSync(out, JSON.stringify({ viewBox: `0 0 ${width} ${height}`, d }));
console.log(out, width, height, `${(d.length / 1024).toFixed(1)}KB path`);
