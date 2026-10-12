/**
 * Optimizes the raw PASTED media library into src/assets/img.
 *
 * Usage: node scripts/media/optimize-images.mjs <raw-images-dir> <brands.json>
 * - raw-images-dir: files downloaded from pasted.studio/assets/images (+ getpasted/ subfolder)
 * - brands.json: brand case studies extracted from the live bundle
 *
 * Everything is auto-oriented (EXIF), resized to a sane max edge and re-encoded with mozjpeg.
 * next/image then serves AVIF/WebP variants at the exact size each layout needs.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [rawDir, brandsPath] = process.argv.slice(2);
if (!rawDir || !brandsPath) {
  console.error("usage: optimize-images.mjs <raw-images-dir> <brands.json>");
  process.exit(1);
}
const OUT = path.resolve("src/assets/img");
const gp = (f) => path.join(rawDir, "getpasted", f);
const raw = (f) => path.join(rawDir, f);

/** [source, destination (relative to OUT), max long edge, quality] */
const jobs = [];
const add = (src, dest, max = 1600, q = 80) => jobs.push([src, dest, max, q]);

// Roster portraits (candid) ----------------------------------------------------
const roster = {
  "jon-marashi": "jon-marashi-BO8aFonj.jpeg",
  "brian-harris": "brian-harris-D4ZLsoPi.jpeg",
  "sam-saleh": "sam-saleh-B9p4Achk.jpeg",
  "marshall-hanson": "marshall-hanson-z6K5S7P2.jpeg",
  "rhona-eskander": "rhona-eskander-C0fmQURR.webp",
  "mikaela-tozzi": "michaela-tozzi-D3vjFGwe.jpeg",
  "suzan-prater": "susan-prater-Beofc04W.jpeg",
  "piotr-irving": "piotr-irving-CGioDpfd.jpeg",
  "james-heaton": "james-heaton-DEVFbeuW.jpeg",
  "drew-ballard": "drew-ballard-iHuTbrBe.jpeg",
  "davis-beckstead": "davis-beckstead-Bmpo_nlv.jpeg",
  "dan-berant": "dan-berant-DnHlL2Mu.jpeg",
  "chinwe-akuonu": "chinwe-akuonu-Cx6hJPk-.png",
  "cole-herzik": "cole-herzik-Bh0KEfg_.jpeg",
  "vik-ravoory": "vik-ravoory-DMKqDJwr.jpeg",
  "alex-besmer": "alex-besmer-DD1QGICr.jpeg",
  "patrick-mccann": "patrick-mccann.png",
  "matt-smith": "matt-smith-BSj19OsS.jpeg",
  "serena-wong": "serena-wong-x94iRbkU.jpeg",
};
for (const [slug, f] of Object.entries(roster)) add(raw(f), `roster/${slug}.jpg`, 1100, 78);

// Graded "club" cards -----------------------------------------------------------
add(gp("roster_02.jpg"), "cards/alan-clarke.jpg", 1400, 86);
add(raw("drew-ballard-7twNfLRN.jpeg"), "cards/drew-ballard.jpg", 1400, 80);
add(raw("gage-lidder-DelhZQu-.jpeg"), "cards/gage-lidder.jpg", 1400, 80);
add(raw("kooper-ruminer-1JFY7rSC.jpeg"), "cards/kooper-ruminer.jpg", 1400, 80);
add(raw("michael-allen-CQc8QPT8.jpeg"), "cards/smiletrend.jpg", 1400, 80);
add(raw("nour-diabi-CGUn0ldo.jpeg"), "cards/nour-diabi.jpg", 1400, 80);
add(gp("roster_01.jpg"), "cards/zac-orender.jpg", 1400, 86);
add(gp("roster_03.jpg"), "cards/jon-marashi.jpg", 1400, 86);
add(gp("roster_10.jpg"), "cards/mikaela-tozzi.jpg", 1400, 86);
add(gp("roster_11.jpg"), "cards/marshall-hanson.jpg", 1400, 86);

// Founders ----------------------------------------------------------------------
add(gp("zac.jpeg"), "founders/zac-orender.jpg", 1200, 84);
add(gp("dr.alan.jpeg"), "founders/alan-clarke.jpg", 1200, 84);
add(raw("founder-card-clarke-MfibboDw.jpg"), "founders/editorial-green-room.jpg", 1600, 80);
add(raw("founder-card-orender-0ONgevAs.jpg"), "founders/editorial-red-carpet.jpg", 1600, 80);

// Studio / world / experiences ---------------------------------------------------
const studio = {
  "operatory": "hero-operatory-CFTYIhgH.jpg",
  "case-room": "studio-case-01-RaT7FUVc.jpg",
  "case-notebook": "studio-case-02-v4KmJ-fT.jpg",
  "case-corridor": "studio-case-03-JlEg5HrX.jpg",
  "world-experiences": "world-experiences-DhP70iEs.jpg",
  "world-library": "world-library-C2Pey2wH.jpg",
  "world-partnership": "world-partnership-BAbw9OmX.jpg",
  "world-studio": "world-studio-Cfzz0P2V.jpg",
  "exp-club": "exp-club-D7kVKKBz.jpg",
  "exp-dinner": "exp-dinner-BzGl3rhr.jpg",
  "exp-masterclass": "exp-masterclass-Bkuz8gn6.jpg",
  "arches": "showcase-01-DPoRzogT.jpeg",
  "blueprint": "iconic-vft-HMVWmFNZ.jpg",
  "library-cover": "library-cover-hero-tvX7dGPG.jpg",
};
for (const [slug, f] of Object.entries(studio)) add(raw(f), `studio/${slug}.jpg`, 1920, 78);

// Library (sepia plates) ----------------------------------------------------------
for (const f of fs.readdirSync(rawDir).filter((f) => f.startsWith("workbook-"))) {
  const slug = f.replace(/^workbook-/, "").replace(/-[A-Za-z0-9_-]{8}\.(jpe?g)$/, "");
  add(raw(f), `library/${slug}.jpg`, 1800, 78);
}

// Film posters (designed one-sheets) ---------------------------------------------
add(gp("film-thumbnails_art-of-restraint.jpg"), "films/one-sheet-art-of-restraint.jpg", 1600, 82);
add(gp("film-thumbnails_built-by-design.jpg"), "films/one-sheet-built-by-design.jpg", 1600, 82);
add(gp("film-thumbnails_brian-harris-thumbnail.jpeg"), "films/brian-harris-walk.jpg", 1400, 82);

// Brand case studies ---------------------------------------------------------------
const brandSlug = {
  "dr-michaela-tozzi": "mikaela-tozzi",
  onlyfangs: "only-fangs",
  "dr-meg-rascius": "meg-rascius",
  "dr-jake-bateman": "jake-bateman",
  "dr-serena-wong": "serena-wong",
  "dr-nakul-ratra": "nakul-ratra",
  "dr-nav-atwal": "nav-atwal",
  "dr-vik-ravoory": "vik-ravoory",
  "dr-suzan-prater": "suzan-prater",
  "karma-dentistry": "karma-dentistry",
};
const brands = JSON.parse(fs.readFileSync(brandsPath, "utf8"));
for (const b of brands) {
  const slug = brandSlug[b.slug];
  b.examples.forEach((e, i) => {
    add(raw(path.basename(e.src)), `brands/${slug}/${String(i + 1).padStart(2, "0")}.jpg`, 1500, 78);
  });
}

// Partner logos (kept as PNG with alpha) -------------------------------------------
const logos = {
  smiletrend: "cocofloss-white-Bv9uxF6Z.png",
  suri: "figs-white-BjKN6VYY.png",
  "marshall-hanson-method": "marshall-hanson-method-white-Cr5gTxWC.png",
  "smile-virtual": "smile-virtual-white-DziGygjm.png",
  solventum: "solventum-white-DE0ygUHq.png",
};

let bytesIn = 0;
let bytesOut = 0;
await Promise.all(
  jobs.map(async ([src, dest, max, q]) => {
    const out = path.join(OUT, dest);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    bytesIn += fs.statSync(src).size;
    await sharp(src)
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#0b0a09" })
      .jpeg({ quality: q, mozjpeg: true, progressive: true })
      .toFile(out);
    bytesOut += fs.statSync(out).size;
  }),
);
for (const [slug, f] of Object.entries(logos)) {
  const out = path.join(OUT, "logos", `${slug}.png`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(raw(f)).trim().png({ compressionLevel: 9, palette: true }).toFile(out);
}
console.log(`images: ${jobs.length}  in: ${(bytesIn / 1e6).toFixed(1)}MB  out: ${(bytesOut / 1e6).toFixed(1)}MB`);
