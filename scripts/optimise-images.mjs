/**
 * One-time image optimisation script.
 * Compresses every JPEG and PNG in public/images/ and public/logos/ in-place.
 *
 * Rules:
 *  - JPEG: resize width to ≤2000px, quality 82 (perceptually near-lossless)
 *  - PNG (photography / covers): convert to JPEG at quality 82
 *  - PNG (logos / graphics with transparency): optimise as PNG, no resize
 *
 * Run: node scripts/optimise-images.mjs
 *
 * Originals are NOT backed up — run from a clean git working tree
 * so you can `git checkout public/` to revert if needed.
 */

import sharp from 'sharp';
import { readdir, stat, rename, writeFile } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Folders to process
const SCAN_DIRS = [
  join(ROOT, 'public', 'images'),
  join(ROOT, 'public', 'logos'),
];

// Max width for any image (2× retina display width)
const MAX_WIDTH = 2000;

// PNGs whose names match these patterns likely have transparency (graphics, not photos)
// Keep them as PNG rather than converting to JPEG.
const PNG_KEEP_AS_PNG = /logo|icon|badge|mark|sticker|graphic|brand/i;

// ─── helpers ────────────────────────────────────────────────────────────────

function humanSize(bytes) {
  if (bytes > 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(full));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

// ─── main ───────────────────────────────────────────────────────────────────

let totalBefore = 0;
let totalAfter  = 0;
let skipped = 0;
let processed = 0;

async function processFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath);
  const { size: sizeBefore } = await stat(filePath);
  totalBefore += sizeBefore;

  try {
    let pipeline = sharp(filePath);
    const meta  = await pipeline.metadata();
    const width = meta.width ?? 0;

    // Resize if too wide
    if (width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    let outPath = filePath;

    if (ext === '.png') {
      const hasAlpha = meta.hasAlpha;
      const keepPng  = hasAlpha || PNG_KEEP_AS_PNG.test(name);

      if (keepPng) {
        // Optimise as PNG
        const buf = await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
        await writeFile(filePath, buf);
        outPath = filePath;
      } else {
        // Convert photo PNG → JPEG (smaller, no transparency needed)
        outPath = filePath.replace(/\.png$/i, '.jpg');
        const buf = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
        await writeFile(outPath, buf);
        // Remove original PNG if a different path was written
        if (outPath !== filePath) {
          await rename(filePath, filePath + '.bak_delete');
          // We leave the .bak_delete so you can inspect/delete manually
        }
      }
    } else {
      // JPEG
      const buf = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      await writeFile(filePath, buf);
    }

    const { size: sizeAfter } = await stat(outPath);
    totalAfter += sizeAfter;
    const pct = Math.round((1 - sizeAfter / sizeBefore) * 100);

    if (pct > 0) {
      const nameDisplay = filePath.replace(ROOT + '/', '');
      console.log(`✓ ${nameDisplay}`);
      console.log(`  ${humanSize(sizeBefore)} → ${humanSize(sizeAfter)} (${pct}% smaller)`);
      if (outPath !== filePath) {
        console.log(`  (renamed to .jpg — update src reference if needed)`);
      }
    }
    processed++;
  } catch (err) {
    console.warn(`⚠ Skipped ${filePath}: ${err.message}`);
    skipped++;
    totalAfter += sizeBefore; // count unchanged
  }
}

async function main() {
  console.log('🔍 Scanning for images…\n');
  const files = (await Promise.all(SCAN_DIRS.map(collectFiles))).flat();
  console.log(`Found ${files.length} images. Optimising…\n`);

  for (const f of files) {
    await processFile(f);
  }

  console.log(`\n─────────────────────────────────────────`);
  console.log(`Processed : ${processed} files (${skipped} skipped)`);
  console.log(`Before    : ${humanSize(totalBefore)}`);
  console.log(`After     : ${humanSize(totalAfter)}`);
  console.log(`Saved     : ${humanSize(totalBefore - totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
  if (skipped) {
    console.log(`\n⚠  ${skipped} file(s) skipped — check warnings above.`);
  }
  console.log(`\nDone. Review changes with: git diff --stat public/`);
}

main().catch(console.error);
