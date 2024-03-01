const path = require("path");

module.exports = {
  entry: "./dist/lo1.js",
  output: {
    path: path.resolve(__dirname, "dist/lo"),
    filename: "bundle.js",
  },
};
