import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderSeoTags, renderSitemap, seoPages } from "../src/seo/seoConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const publicSitemapPath = path.join(rootDir, "public", "sitemap.xml");
const distSitemapPath = path.join(distDir, "sitemap.xml");

const SEO_START = "<!-- SEO_START -->";
const SEO_END = "<!-- SEO_END -->";

const replaceSeoBlock = (html, routePath) => {
  const startIndex = html.indexOf(SEO_START);
  const endIndex = html.indexOf(SEO_END);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("Unable to find SEO_START and SEO_END markers in dist/index.html");
  }

  const before = html.slice(0, startIndex + SEO_START.length);
  const after = html.slice(endIndex);
  return `${before}\n  ${renderSeoTags(routePath)}\n  ${after}`;
};

const routeOutputPath = (routePath) => {
  if (routePath === "/") {
    return indexPath;
  }

  return path.join(distDir, routePath, "index.html");
};

const routeCleanUrlOutputPath = (routePath) => {
  if (routePath === "/") {
    return indexPath;
  }

  return path.join(distDir, `${routePath}.html`);
};

const writeRouteHtml = async (baseHtml, routePath) => {
  const html = replaceSeoBlock(baseHtml, routePath);
  const outputPaths = [routeOutputPath(routePath), routeCleanUrlOutputPath(routePath)];

  await Promise.all(
    outputPaths.map(async (outputPath) => {
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, "utf8");
    }),
  );
};

const main = async () => {
  const baseHtml = await readFile(indexPath, "utf8");
  const sitemap = renderSitemap();

  await Promise.all(seoPages.map((page) => writeRouteHtml(baseHtml, page.path)));
  await writeFile(publicSitemapPath, sitemap, "utf8");
  await writeFile(distSitemapPath, sitemap, "utf8");

  console.log(`Generated SEO HTML for ${seoPages.length} routes.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
