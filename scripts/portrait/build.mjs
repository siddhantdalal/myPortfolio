// Step 2 of 2 for the hero portrait: node scripts/portrait/build.mjs <cutout.png> src/assets/siddhant-cutout.webp
// Takes the full-resolution cut-out from cutout.swift and writes the web asset: a head-to-waist crop
// with clean edges, as WebP with alpha. Uses sharp, which Next.js already installs.
import { statSync } from "node:fs";
import sharp from "sharp";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("Usage: node scripts/portrait/build.mjs <cutout.png> <output.webp>");
  process.exit(1);
}

/** Tuned for the current photo (1932 × 2576): head centred, cut just below the hand. */
const crop = { left: 0, top: 400, width: 1460, height: 2050 };
const width = 880;
const raw = (channels) => ({ raw: { width: crop.width, height: crop.height, channels } });

const rgba = await sharp(input).extract(crop).ensureAlpha().raw().toBuffer();

// sharp names morphology for a dark foreground, so dilate is what shrinks the opaque area here.
// A blur afterwards turns the stair-stepped result back into a smooth, anti-aliased edge.
const mask = (radius, soften) =>
  sharp(input).extract(crop).extractChannel(3).dilate(radius).blur(soften).raw().toBuffer();
const [alpha, core] = await Promise.all([mask(3, 1.6), mask(12, 4)]);
const pixels = alpha.length;

// Defringe: outline pixels are part background, part subject. Estimate the subject's colour there by
// spreading the interior colours outward (a normalised blur of the core), then repaint the outline
// with it, so the soft edge reads as hair or hoodie instead of a pale halo from the wall behind.
const premultiplied = Buffer.alloc(pixels * 3);
for (let i = 0; i < pixels; i++) {
  const weight = core[i] / 255;
  for (let c = 0; c < 3; c++) premultiplied[i * 3 + c] = Math.round(rgba[i * 4 + c] * weight);
}
const sigma = 10;
const [spread, coverage] = await Promise.all([
  sharp(premultiplied, raw(3)).blur(sigma).raw().toBuffer(),
  sharp(core, raw(1)).blur(sigma).raw().toBuffer(),
]);

const result = Buffer.alloc(pixels * 4);
for (let i = 0; i < pixels; i++) {
  const inside = core[i] / 255;
  for (let c = 0; c < 3; c++) {
    const original = rgba[i * 4 + c];
    // Only trust the estimate where enough of the interior is nearby.
    const estimate = coverage[i] > 24 ? Math.min(255, (spread[i * 3 + c] * 255) / coverage[i]) : original;
    result[i * 4 + c] = Math.round(original * inside + estimate * (1 - inside));
  }
  result[i * 4 + 3] = alpha[i];
}

await sharp(result, raw(4))
  .resize({ width })
  .webp({ quality: 82, alphaQuality: 90, effort: 6 })
  .toFile(output);
const meta = await sharp(output).metadata();
console.log(
  `wrote ${output}: ${meta.width} × ${meta.height}, ${Math.round(statSync(output).size / 1024)} KB`,
);
