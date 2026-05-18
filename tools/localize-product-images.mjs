import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const dataPath = path.join(ROOT, "src", "data", "shopData.ts");
const outDir = path.join(ROOT, "public", "images", "products");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

const source = await fs.readFile(dataPath, "utf8");
const pattern = /makeImage\("([^"]+)",\s*(\d+)\)/g;

const matches = [...source.matchAll(pattern)].map((match) => ({
  full: match[0],
  query: match[1],
  lock: Number(match[2]),
}));

await fs.mkdir(outDir, { recursive: true });

let updated = source;

for (const item of matches) {
  const slug = slugify(item.query) || `image-${item.lock}`;
  const fileName = `${String(item.lock).padStart(3, "0")}-${slug}.jpg`;
  const localPath = `/images/products/${fileName}`;
  const outputPath = path.join(outDir, fileName);
  const remoteUrl = `https://source.unsplash.com/900x700/?${encodeURIComponent(item.query)},food&sig=${item.lock}`;

  const response = await fetch(remoteUrl);
  if (!response.ok) {
    throw new Error(`Failed download for ${item.query}: ${response.status}`);
  }

  const data = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, data);
  updated = updated.replace(item.full, `"${localPath}"`);
}

updated = updated.replace(
  /const makeImage[\s\S]*?;\n\n/,
  ""
);

await fs.writeFile(dataPath, updated);

console.log(`Downloaded ${matches.length} images and localized paths.`);
