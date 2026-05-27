const fs = require("fs");
const path = require("path");

const pagePath = path.join(__dirname, "app", "page.tsx");

let content = fs.readFileSync(pagePath, "utf8");

content = content
  .replace(/\.JPG/g, ".webp")
  .replace(/\.JPEG/g, ".webp")
  .replace(/\.jpg/g, ".webp")
  .replace(/\.jpeg/g, ".webp");

fs.writeFileSync(pagePath, content);

console.log("All image paths replaced with .webp");