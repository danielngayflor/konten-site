/**
 * Strips the embedded raster <image> elements from konten-logo.svg
 * and cleans up Illustrator-specific bloat (comments, doctype hints,
 * redundant xmlns, empty groups, etc.).
 *
 * The <image xlink:href="data:image/…"> blocks are Illustrator "placed"
 * images that end up encoded in the SVG even though they are not part of
 * the visible logo. Removing them reduces the file from ~1.9 MB to a
 * typical SVG size (<100 KB).
 *
 * Run: node scripts/optimise-svg-logo.mjs
 */

import { readFile, writeFile, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const SVG_PATH  = join(ROOT, 'public', 'konten-logo.svg');
const BAK_PATH  = SVG_PATH + '.bak';

function humanSize(bytes) {
  return bytes > 1_000_000
    ? `${(bytes / 1_000_000).toFixed(2)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

async function main() {
  const original = await readFile(SVG_PATH, 'utf8');
  const sizeBefore = Buffer.byteLength(original, 'utf8');

  // Back up original
  await copyFile(SVG_PATH, BAK_PATH);
  console.log(`Backup saved → konten-logo.svg.bak`);

  let svg = original;

  // 1. Remove all <image …> blocks (they contain the embedded base64 rasters).
  //    These elements can span multiple lines, so use a dotAll regex.
  const imagesBefore = (svg.match(/<image[\s\S]*?\/>/g) ?? []).length;
  svg = svg.replace(/<image[\s\S]*?\/>/g, '');
  console.log(`Removed ${imagesBefore} embedded <image> elements`);

  // 2. Remove the Adobe Illustrator generator comment
  svg = svg.replace(/<!--[\s\S]*?-->/g, '');

  // 3. Strip unused xlink namespace if no more xlink: references
  if (!svg.includes('xlink:')) {
    svg = svg.replace(/\s+xmlns:xlink="[^"]*"/g, '');
  }

  // 4. Remove legacy enable-background style and xml:space attributes
  svg = svg.replace(/\s+xml:space="[^"]*"/g, '');
  svg = svg.replace(/enable-background:[^;}"]+;?/g, '');

  // 5. Collapse excessive whitespace (multiple blank lines → one)
  svg = svg.replace(/\n{3,}/g, '\n\n');

  const sizeAfter = Buffer.byteLength(svg, 'utf8');
  await writeFile(SVG_PATH, svg, 'utf8');

  console.log(`\nBefore : ${humanSize(sizeBefore)}`);
  console.log(`After  : ${humanSize(sizeAfter)}`);
  console.log(`Saved  : ${humanSize(sizeBefore - sizeAfter)} (${Math.round((1 - sizeAfter / sizeBefore) * 100)}%)`);
  console.log(`\nDone. Open the logo in a browser to verify it still looks correct.`);
  console.log(`If something looks wrong, restore with:\n  cp public/konten-logo.svg.bak public/konten-logo.svg`);
}

main().catch(console.error);
