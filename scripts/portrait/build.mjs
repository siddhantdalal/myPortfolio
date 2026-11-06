// Step 2 of 2 for the hero portrait:
//   node scripts/portrait/build.mjs <photo.jpg> <cutout.png> src/assets/siddhant-cutout.webp
// Takes the original photo and the cut-out mask from cutout.swift and writes the web asset: a
// head-to-waist crop with clean hair and edges, as WebP with alpha. Uses sharp, which Next.js installs.
import { statSync } from "node:fs";
import sharp from "sharp";

const [, , photo, cutout, output] = process.argv;
if (!photo || !cutout || !output) {
  console.error("Usage: node scripts/portrait/build.mjs <photo.jpg> <cutout.png> <output.webp>");
  process.exit(1);
}

/** Tuned for the current photo (1932 × 2576): head centred, cut just below the hand. */
const crop = { left: 0, top: 400, width: 1460, height: 2050 };
const width = 880;
/** The hair's colour, the "foreground" each fringe pixel is matted against. */
const HAIR = [20, 18, 17];

const raw = (channels) => ({ raw: { width: crop.width, height: crop.height, channels } });
const pixels = crop.width * crop.height;
/** Raw pixels, checked: sharp quietly turns one-channel input into three on output unless told not to. */
async function toRaw(pipeline, channels) {
  const shaped = channels === 1 ? pipeline.toColourspace("b-w") : pipeline;
  const buffer = await shaped.raw().toBuffer();
  if (buffer.length !== pixels * channels) throw new Error(`expected ${channels} channel(s), got ${buffer.length / pixels}`);
  return buffer;
}
const smoothstep = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));

// Colours come from the photo itself; only the mask comes from the cut-out.
const rgb = await toRaw(sharp(photo).extract(crop).removeAlpha(), 3);
const visionMask = await toRaw(sharp(cutout).extract(crop).extractChannel(3), 1);

// 1. The wall behind each fringe pixel: spread the visible background inward (a normalised blur of
//    everything outside the mask), so each point gets the wall colour from just beside it.
const background = Buffer.alloc(pixels * 3);
const backgroundWeight = Buffer.alloc(pixels);
for (let i = 0; i < pixels; i++) {
  const weight = 255 - visionMask[i];
  backgroundWeight[i] = weight;
  for (let c = 0; c < 3; c++) background[i * 3 + c] = Math.round((rgb[i * 3 + c] * weight) / 255);
}
const [wallSpread, wallCoverage, nearEdge] = await Promise.all([
  toRaw(sharp(background, raw(3)).blur(30), 3),
  toRaw(sharp(backgroundWeight, raw(1)).blur(30), 1),
  // Anything within roughly 100 px of the outline.
  toRaw(sharp(visionMask, raw(1)).blur(40), 1),
]);

// 2. Matte the fringe. Near the outline, a pixel that lies on the line between the hair colour and
//    the local wall colour is a mix of the two, and its position on that line is its opacity. That
//    clears the wall showing through wispy hair and the pale rim the mask left around the head.
//    Pixels off that line (skin, the hoodie) or reddish in hue (skin) keep the original mask.
const alpha = Buffer.from(visionMask);
const colour = Buffer.from(rgb);
for (let i = 0; i < pixels; i++) {
  if (visionMask[i] === 0 || nearEdge[i] >= 250 || wallCoverage[i] < 3) continue;
  const C = [rgb[i * 3], rgb[i * 3 + 1], rgb[i * 3 + 2]];
  const B = [0, 1, 2].map((c) => (wallSpread[i * 3 + c] * 255) / wallCoverage[i]);
  const BH = B.map((value, c) => value - HAIR[c]);
  const CH = C.map((value, c) => value - HAIR[c]);
  const length = BH[0] ** 2 + BH[1] ** 2 + BH[2] ** 2;
  const t = Math.min(1, Math.max(0, (CH[0] * BH[0] + CH[1] * BH[1] + CH[2] * BH[2]) / length));
  const residual = Math.hypot(...C.map((value, c) => value - (HAIR[c] + t * BH[c])));
  const max = Math.max(...C);
  const redness = max === 0 ? 0 : (C[0] - C[1]) / max;
  // How much this pixel looks like hair-over-wall rather than something else.
  const strength = (1 - smoothstep(residual, 14, 30)) * (1 - smoothstep(redness, 0.09, 0.14));
  if (strength === 0) continue;
  const seeThrough = 1 - smoothstep(t, 0.3, 0.88);
  // Gaps between strands deep inside the hair are filled with hair rather than left see-through,
  // which on a light page would read as specks. Only the outer edge stays truly feathered.
  const depth = smoothstep(nearEdge[i], 105, 190);
  const opacity = Math.max(seeThrough, 0.9 * depth);
  alpha[i] = Math.round(visionMask[i] * (1 - strength) + Math.min(visionMask[i], opacity * 255) * strength);
  // Un-mix the wall out of the colour so strands stay dark instead of turning beige, and paint any
  // filled gap in the hair's colour.
  const a = Math.max(seeThrough, 0.25);
  const fill = (1 - seeThrough) * depth;
  for (let c = 0; c < 3; c++) {
    const unmixed = Math.min(255, Math.max(0, (C[c] - (1 - a) * B[c]) / a));
    const hairy = unmixed * (1 - fill) + HAIR[c] * fill;
    colour[i * 3 + c] = Math.round(C[c] * (1 - strength) + hairy * strength);
  }
}

// 3. Tidy the outline: shrink it slightly and smooth the steps (sharp names morphology for a dark
//    foreground, so dilate is what shrinks the opaque area here).
const [edge, core] = await Promise.all([
  toRaw(sharp(alpha, raw(1)).dilate(2).blur(1.2), 1),
  toRaw(sharp(alpha, raw(1)).dilate(12).blur(4), 1),
]);

// 4. Defringe what's left: repaint the outermost pixels with the colour just inside them, spread
//    outward from the core, so soft edges read as hair or hoodie rather than a pale halo.
const premultiplied = Buffer.alloc(pixels * 3);
for (let i = 0; i < pixels; i++) {
  for (let c = 0; c < 3; c++) premultiplied[i * 3 + c] = Math.round((colour[i * 3 + c] * core[i]) / 255);
}
const [spread, coverage] = await Promise.all([
  toRaw(sharp(premultiplied, raw(3)).blur(10), 3),
  toRaw(sharp(core, raw(1)).blur(10), 1),
]);

const result = Buffer.alloc(pixels * 4);
for (let i = 0; i < pixels; i++) {
  const inside = core[i] / 255;
  for (let c = 0; c < 3; c++) {
    const original = colour[i * 3 + c];
    // Only trust the estimate where enough of the interior is nearby.
    const estimate = coverage[i] > 24 ? Math.min(255, (spread[i * 3 + c] * 255) / coverage[i]) : original;
    result[i * 4 + c] = Math.round(original * inside + estimate * (1 - inside));
  }
  result[i * 4 + 3] = edge[i];
}

await sharp(result, raw(4))
  .resize({ width })
  .webp({ quality: 82, alphaQuality: 90, effort: 6 })
  .toFile(output);
const meta = await sharp(output).metadata();
console.log(
  `wrote ${output}: ${meta.width} × ${meta.height}, ${Math.round(statSync(output).size / 1024)} KB`,
);
