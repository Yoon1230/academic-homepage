import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const outputDir = join(process.cwd(), "dist", "client");
const publicPath = "/academic-homepage";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

function prefixRootPaths(source) {
  return source.replace(/(["'(=])\/(?!academic-homepage(?:[\/("'])?)/g, `$1${publicPath}/`);
}

const htmlFiles = (await walk(outputDir)).filter((path) => path.endsWith(".html"));
for (const path of htmlFiles) {
  const source = await readFile(path, "utf8");
  await writeFile(path, prefixRootPaths(source), "utf8");
}

for (const path of htmlFiles) {
  const name = relative(outputDir, path);
  if (!name.endsWith(".html") || name === "index.html" || name === "404.html") continue;
  const route = name.slice(0, -".html".length);
  const routeIndex = join(outputDir, route, "index.html");
  await mkdir(dirname(routeIndex), { recursive: true });
  await cp(path, routeIndex);
}
