import { copyFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "../apps/web/out");

const copies = [
  ["index.html", "oneshot.html"],
  ["index.txt", "oneshot.txt"],
];

async function main() {
  for (const [source, target] of copies) {
    const srcPath = path.join(outDir, source);
    const destPath = path.join(outDir, target);
    try {
      await copyFile(srcPath, destPath);
    } catch (error) {
      console.warn(`Skipping ${source} -> ${target}:`, error instanceof Error ? error.message : error);
    }
  }
}

main().catch((error) => {
  console.error("post-export copy failed:", error);
  process.exitCode = 1;
});
