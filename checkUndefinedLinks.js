// file: checkUndefinedLinks.js
const fs = require("fs");
const path = require("path");

const projectDir = path.resolve(__dirname); // root proyek
const exts = [".js", ".jsx", ".ts", ".tsx"];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (exts.includes(path.extname(file))) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const regex = /href=\{([^\}]+)\}|src=\{([^\}]+)\}/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const variable = match[1] || match[2];
    console.log(`${filePath}: Found possible undefined -> ${variable}`);
  }
}

scanDir(projectDir);
