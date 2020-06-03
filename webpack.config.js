const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");
const config = {
  entry: path.resolve(__dirname, "assets", "js", "main.js"),
  mode: process.env.WEBPACK_ENV,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugin() {
                return [autoprefixer({ browser: "cover 99.5%" })];
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: { path: path.join(__dirname, "static"), filename: "[name].js" },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
