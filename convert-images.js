const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const galleryPath = path.join(__dirname, "public", "gallery");

async function convertImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await convertImages(fullPath);
      continue;
    }

    const originalExt = path.extname(file);
    const ext = originalExt.toLowerCase();

    if ([".jpg", ".jpeg"].includes(ext)) {
      const outputPath = fullPath.slice(0, -originalExt.length) + ".webp";

      try {
        await sharp(fullPath)
          .rotate()
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`Converted: ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}`, err);
      }
    }
  }
}

convertImages(galleryPath).then(() => {
  console.log("All images converted!");
});