const AsyncFiles = require("../lib/index.js").default;
const path = require("path");

console.log('AsyncFiles',AsyncFiles, typeof AsyncFiles)

const asf = new AsyncFiles({
  source: path.resolve(__dirname, "./source"),
  target: path.resolve(__dirname, "./target"),
  watch: true,
});
