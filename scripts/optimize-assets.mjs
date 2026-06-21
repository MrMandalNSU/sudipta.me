import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");

const tasks = [
  // Education Logos (Displayed at 90x90px or 60x60px, so 180x180px for 2x density)
  {
    input: join(PUBLIC_DIR, "education", "nsu_logo.png"),
    output: join(PUBLIC_DIR, "education", "nsu_logo.webp"),
    width: 180,
    height: 180,
  },
  {
    input: join(PUBLIC_DIR, "education", "bcic_logo.jpg"),
    output: join(PUBLIC_DIR, "education", "bcic_logo.webp"),
    width: 180,
    height: 180,
  },
  {
    input: join(PUBLIC_DIR, "education", "bghs_logo.jpg"),
    output: join(PUBLIC_DIR, "education", "bghs_logo.webp"),
    width: 180,
    height: 180,
  },
  // Experience Logos (Displayed at 40x40px, so 80x80px for 2x density)
  {
    input: join(PUBLIC_DIR, "eucaps_logo.png"),
    output: join(PUBLIC_DIR, "eucaps_logo.webp"),
    width: 80,
    height: 80,
  },
  {
    input: join(PUBLIC_DIR, "nsups_logo.png"),
    output: join(PUBLIC_DIR, "nsups_logo.webp"),
    width: 80,
    height: 80,
  },
  {
    input: join(PUBLIC_DIR, "sports_fixures_logo.avif"),
    output: join(PUBLIC_DIR, "sports_fixures_logo.webp"),
    width: 100,
    height: 100,
  },
  // Project Screenshots (Displayed on detail page, resize to max width 1200px)
  {
    input: join(PUBLIC_DIR, "screenshots", "projects", "desops", "do (1).png"),
    output: join(PUBLIC_DIR, "screenshots", "projects", "desops", "do (1).webp"),
    width: 1200,
  },
  {
    input: join(PUBLIC_DIR, "screenshots", "projects", "desops", "do (2).png"),
    output: join(PUBLIC_DIR, "screenshots", "projects", "desops", "do (2).webp"),
    width: 1200,
  },
];

async function run() {
  console.log("Starting image asset optimization...\n");

  for (const task of tasks) {
    if (!existsSync(task.input)) {
      console.warn(`⚠️ Input file not found: ${task.input}`);
      continue;
    }

    try {
      let pipeline = sharp(task.input);
      
      if (task.width && task.height) {
        pipeline = pipeline.resize({
          width: task.width,
          height: task.height,
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        });
      } else if (task.width) {
        pipeline = pipeline.resize({
          width: task.width,
          withoutEnlargement: true
        });
      }

      await pipeline.webp({ quality: 85 }).toFile(task.output);
      console.log(`✓ Optimized: ${task.input.replace(PUBLIC_DIR, "")} -> ${task.output.replace(PUBLIC_DIR, "")}`);
    } catch (error) {
      console.error(`✗ Failed optimizing ${task.input}:`, error.message);
    }
  }

  console.log("\nAsset optimization completed.");
}

run();
