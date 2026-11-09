import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Use Next's existing image processor; no extra dependency is needed.
const requireFromNext = createRequire(import.meta.resolve("next/package.json"));
const sharp = requireFromNext("sharp");
const source = await readFile(
  new URL("../src/app/icon.svg", import.meta.url),
  "utf8",
);
const shapes = source.match(/<g[\s\S]*<\/g>/)?.[0];
if (!shapes)
  throw new Error("The favicon SVG must contain its mark in a group.");

function svg({ tile = false } = {}) {
  // Raster fallbacks get a fine light keyline to stay visible on dark tabs.
  const mark = shapes.replace(
    'fill="currentColor"',
    tile
      ? 'fill="#f3f4ef"'
      : 'fill="#161e1d" stroke="#f3f4ef" stroke-width="0.65" paint-order="stroke"',
  );
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${
      tile ? '<rect width="32" height="32" fill="#161e1d"/>' : ""
    }<g transform="${tile ? "translate(5 5) scale(0.6875)" : ""}">${mark}</g></svg>`,
  );
}

const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) => sharp(svg()).resize(size, size).png().toBuffer()),
);
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
images.forEach((data, index) => {
  const entry = 6 + 16 * index;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(data.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});
await writeFile(
  new URL("../src/app/favicon.ico", import.meta.url),
  Buffer.concat([directory, ...images]),
);

for (const [size, path] of [
  [180, "../src/app/apple-icon.png"],
  [192, "../public/icons/noi-192.png"],
  [512, "../public/icons/noi-512.png"],
]) {
  await sharp(svg({ tile: true }))
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(path, import.meta.url)));
}
console.log(
  "Generated ICO (16/32/48), Apple (180), and application icons (192/512).",
);
