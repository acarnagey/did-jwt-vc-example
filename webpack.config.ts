import * as path from "path";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";

import HtmlWebPackPlugin from "html-webpack-plugin";

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const config: webpack.Configuration = {
  mode: "development",
  entry:  "./src/index.ts",
  devtool: "source-map",
  output: { path: __dirname, filename: "bundle.js" },
  devServer: {
    proxy: {
      "/api/*": "http://localhost:5000",
    },
    port: 3000,
    // to get private IP addresses to work to test on emulators
    host: "0.0.0.0",
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/subpage/, to: "/index.html" },
        { from: /./, to: "/index.html" },
      ],
    },
    contentBase: path.resolve(__dirname, "src"),
    inline: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [],
      },
    ],
  },
};

export default config;
