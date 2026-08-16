// Finalizes the static export for GitHub Pages:
//  - .nojekyll so files/folders starting with "_" are served
//  - 404.html = index.html so client-side routing works on direct deep links
import { copyFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("dist/client");
const indexHtml = path.join(outDir, "index.html");

try {
  await access(indexHtml);
} catch {
  console.log("[postbuild] No dist/client/index.html (non-static build) — skipping.");
  process.exit(0);
}

await writeFile(path.join(outDir, ".nojekyll"), "");
await copyFile(indexHtml, path.join(outDir, "404.html"));
console.log("[postbuild] Static site ready in dist/client (.nojekyll + 404.html added).");
