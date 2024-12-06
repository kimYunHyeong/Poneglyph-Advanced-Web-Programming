const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/client/js/main.js",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css", // css 파일이 "assets/css/styles.css"로 생성됩니다.
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/client/img"), // 복사할 원본 이미지 폴더
          to: path.resolve(__dirname, "assets/images"), // 복사될 대상 폴더
        },
      ],
    }),
  ],
  mode: "development",
  watch: true,
  output: {
    filename: "js/main.js",
    path: path.resolve(__dirname, "assets"), // 모든 빌드 파일을 "assets" 디렉토리에 생성
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
