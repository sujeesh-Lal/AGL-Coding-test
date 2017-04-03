var path = require("path");
module.exports = {
  entry: {
    app: ["./dist/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    port: 8000
  },
  watch: true
};