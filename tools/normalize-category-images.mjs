import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const root = process.cwd();
const dir = path.join(root, "public", "images", "products");

const files = [
  "001.png",
  "011.png",
  "021.png",
  "031.png",
  "041.png",
  "051.png",
  "061.png",
  "071.png",
  "081.png",
  "091.png"
];

for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace(/\.png$/i, ".webp"));

  await fs.access(input);

  await sharp(input)
    .resize(1200, 900, {
      fit: "cover",
      position: "center"
    })
    .webp({ quality: 88 })
    .toFile(output);
}

console.log("Normalized category images to 1200x900 WEBP.");
