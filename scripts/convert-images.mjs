import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const GALLERY_DIR = join(__dirname, "..", "public", "screenshots", "projects", "textanalyzer");

const MAX_WIDTH = 1200;
const QUALITY = 80;

async function convert() {
  const files = await readdir(GALLERY_DIR);
  const imageFiles = files.filter((f) =>
    [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase())
  );

  console.log(`Found ${imageFiles.length} images to convert:\n`);

  for (const file of imageFiles) {
    const inputPath = join(GALLERY_DIR, file);
    const outputName = basename(file, extname(file)) + ".webp";
    const outputPath = join(GALLERY_DIR, outputName);

    try {
      const metadata = await sharp(inputPath).metadata();
      const originalKB = Math.round(metadata.size / 1024) || "?";

      await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      // Get output size
      const outputMeta = await sharp(outputPath).metadata();
      const newKB = Math.round(outputMeta.size / 1024) || "?";

      console.log(
        `✓ ${file} (${originalKB} KB) → ${outputName} (${newKB} KB)`
      );
    } catch (err) {
      console.error(`✗ Failed to convert ${file}:`, err.message);
    }
  }

  console.log("\nDone! You can now delete the original files.");
}

convert();
