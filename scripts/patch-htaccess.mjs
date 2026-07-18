// When building for the /oneshot subdirectory (USE_BASE_PATH=true), point the
// exported .htaccess ErrorDocument at the subdirectory's 404 page so bad URLs
// show the styled page with no manual edit after upload.
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

if (process.env.USE_BASE_PATH === "true") {
  const htaccess = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../apps/web/out/.htaccess"
  );
  try {
    const content = await readFile(htaccess, "utf8");
    const patched = content.replace(
      "ErrorDocument 404 /404.html",
      "ErrorDocument 404 /oneshot/404.html"
    );
    if (patched !== content) {
      await writeFile(htaccess, patched);
      console.log("patch-htaccess: ErrorDocument now targets /oneshot/404.html");
    }
  } catch (error) {
    console.warn("patch-htaccess: skipped —", error instanceof Error ? error.message : error);
  }
}
