/** Copies preview loops and resizes Wistia stills into poster images. */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
const [stillsDir, previewsDir] = process.argv.slice(2);
const manifest = JSON.parse(fs.readFileSync("scripts/media/films-manifest.json", "utf8"));
for (const [id, slug] of Object.entries(manifest)) {
  fs.copyFileSync(path.join(previewsDir, `${id}.mp4`), `public/media/previews/${slug}.mp4`);
  const img = sharp(path.join(stillsDir, `${id}.jpg`)).rotate();
  const m = await img.metadata();
  const vertical = m.height > m.width;
  await img
    .resize(vertical ? { width: 720, height: 1280, fit: "cover" } : { width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(`src/assets/img/films/posters/${slug}.jpg`);
  console.log(slug.padEnd(30), vertical ? "vertical" : "landscape", `${m.width}x${m.height}`);
}
