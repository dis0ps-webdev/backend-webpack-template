const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternalsDev = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

var config = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/app.ts",
  target: "node",
  externals: [nodeExternalsDev()],
  output: {
    filename: "backend.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: "src/public", to: "public" }] }),
    new NodemonPlugin({
      nodeArgs: ["--inspect"],
      env: {
        NODE_ENV: "development",
      },
      delay: '5000',
      verbose: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.mode = "development";
    config.devtool = "inline-source-map";
  }

  if (argv.mode === "production") {
    config.mode = "production";
  }

  return config;
};
