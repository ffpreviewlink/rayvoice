// Builds every favicon file from the ORIGINAL artwork (brand/favicon-source.png, the character
// from the first site's favicon). The drawing is not redrawn: the white backdrop becomes transparent,
// contrast is raised and each size gets its own resampling + sharpening so it stays readable.
// Run: npm run favicons   (uses sharp, already a dependency; nothing else is needed)
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));

// 1. White backdrop -> transparency (flood fill from the border, soft alpha on the rim) ---------------
const { data, info } = await sharp(root('brand/favicon-source.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const idx = (x, y) => (y * W + x) * 4;
const isWhite = (x, y) => Math.min(data[idx(x, y)], data[idx(x, y) + 1], data[idx(x, y) + 2]) >= 244;
const bg = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push([x, 0], [x, H - 1]);
for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);
while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= W || y >= H || bg[y * W + x] || !isWhite(x, y)) continue;
  bg[y * W + x] = 1;
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}
const out = Buffer.from(data);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = idx(x, y);
    if (bg[y * W + x]) {
      out[i + 3] = 0;
      continue;
    }
    // rim pixel (touches the backdrop): derive coverage from how "white" it is, then remove the white fringe
    const rim = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]].some(([dx, dy]) => x + dx >= 0 && y + dy >= 0 && x + dx < W && y + dy < H && bg[(y + dy) * W + x + dx]);
    if (rim) {
      const whiteness = Math.min(data[i], data[i + 1], data[i + 2]) / 255;
      const a = Math.min(1, Math.max(0.35, (1 - whiteness) / 0.3));
      for (let k = 0; k < 3; k++) out[i + k] = Math.max(0, Math.min(255, Math.round((data[i + k] - 255 * (1 - a)) / a)));
      out[i + 3] = Math.round(a * 255);
    }
  }
}
// 2. Crop to the artwork and centre it on a square canvas ---------------------------------------------
let minx = W, maxx = 0, miny = H, maxy = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (out[idx(x, y) + 3] > 40) { minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); }
const cw = maxx - minx + 1, ch = maxy - miny + 1, side = Math.max(cw, ch);
const cut = await sharp(out, { raw: { width: W, height: H, channels: 4 } }).extract({ left: minx, top: miny, width: cw, height: ch }).png().toBuffer();
const square = await sharp({ create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: cut, left: Math.floor((side - cw) / 2), top: Math.floor((side - ch) / 2) }])
  .png()
  .toBuffer();

// 3. Masters: enlarged once with a good filter, then ONLY the outlines are darkened (fills keep the
// original colours: orange, grey hair, skin, pale lenses). The "bold" master also thickens the dark
// lines so they survive being reduced to 16-48 px; the "soft" master is for the larger icons.
const MASTER = 512;
const upscaled = await sharp(square).resize(MASTER, MASTER, { kernel: 'lanczos3' }).ensureAlpha().raw().toBuffer();
const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
const px = Buffer.from(upscaled);
// 3a. darken dark pixels (outlines, features); anything lighter than the orange is left untouched
for (let i = 0; i < px.length; i += 4) {
  const l = lum(px[i], px[i + 1], px[i + 2]);
  if (l < 175) {
    const f = Math.pow(l / 175, 1.15);
    px[i] = Math.round(px[i] * f);
    px[i + 1] = Math.round(px[i + 1] * f);
    px[i + 2] = Math.round(px[i + 2] * f);
  }
}
const toPng = (buf) => sharp(buf, { raw: { width: MASTER, height: MASTER, channels: 4 } }).png().toBuffer();
const soft = await toPng(px);

// 3b. thicken the dark lines: grow the darkest neighbour outwards
const R = 5;
const L = new Float32Array(MASTER * MASTER);
for (let i = 0; i < L.length; i++) L[i] = lum(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]);
const pass = (src, srcIdx, horizontal) => {
  const dstL = new Float32Array(src.length);
  const dstIdx = new Int32Array(src.length);
  for (let y = 0; y < MASTER; y++) {
    for (let x = 0; x < MASTER; x++) {
      let best = Infinity, bi = y * MASTER + x;
      for (let d = -R; d <= R; d++) {
        const xx = horizontal ? x + d : x, yy = horizontal ? y : y + d;
        if (xx < 0 || yy < 0 || xx >= MASTER || yy >= MASTER) continue;
        const j = yy * MASTER + xx;
        if (src[j] < best) { best = src[j]; bi = srcIdx ? srcIdx[j] : j; }
      }
      dstL[y * MASTER + x] = best;
      dstIdx[y * MASTER + x] = bi;
    }
  }
  return [dstL, dstIdx];
};
const [hL, hIdx] = pass(L, null, true);
const [, vIdx] = pass(hL, hIdx, false);
const thick = Buffer.from(px);
for (let i = 0; i < MASTER * MASTER; i++) {
  const j = vIdx[i];
  if (px[i * 4 + 3] > 0 && L[j] < 105 && L[i] >= 105) {
    thick[i * 4] = px[j * 4];
    thick[i * 4 + 1] = px[j * 4 + 1];
    thick[i * 4 + 2] = px[j * 4 + 2];
  }
}
const bold = await toPng(thick);

// 4. Each size is resampled from the master and sharpened for that size --------------------------------
const make = (size, pad = 0.04) => {
  const inner = Math.round(size * (1 - 2 * pad));
  return sharp(bold)
    .resize(inner, inner, { kernel: 'lanczos3' })
    .sharpen(size <= 48 ? { sigma: 0.7, m1: 1.1, m2: 1.6 } : { sigma: 0.8 })
    .extend({ top: Math.floor((size - inner) / 2), bottom: Math.ceil((size - inner) / 2), left: Math.floor((size - inner) / 2), right: Math.ceil((size - inner) / 2), background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
};
const png16 = await make(16, 0.02);
const png32 = await make(32, 0.03);
const png48 = await make(48, 0.03);
writeFileSync(root('public/favicon-16x16.png'), png16);
writeFileSync(root('public/favicon-32x32.png'), png32);

// 5. favicon.ico with 16 / 32 / 48 px images (PNG payloads) -------------------------------------------
const images = [[16, png16], [32, png32], [48, png48]];
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map(([size, buf]) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
writeFileSync(root('public/favicon.ico'), Buffer.concat([header, ...entries, ...images.map(([, b]) => b)]));

// 6. Apple touch icon: iOS fills transparency with black, so give it a solid ivory square -----------
const art = await sharp(soft).resize(144, 144, { kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#f6f4ed' } }).composite([{ input: art, left: 18, top: 18 }]).png({ compressionLevel: 9 }).toFile(root('public/apple-touch-icon.png'));
// larger transparent PNG, handy for previews / future manifest use
await sharp(soft).png({ compressionLevel: 9 }).toFile(root('brand/favicon-512.png'));

console.log('written: public/favicon.ico (16/32/48), favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, brand/favicon-512.png');
