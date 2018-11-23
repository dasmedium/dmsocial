const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    proxy: {
      "/api": "https://apibeta.tetoka.co"
    },
    contentBase: "./build",
    open: true,
    historyApiFallback: true
  }
});
