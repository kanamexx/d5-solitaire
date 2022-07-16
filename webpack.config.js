const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],

  target: "node",
  entry: {
    server: "./src/server/index.tsx",
    "public/client": "./src/client/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "@linaria/webpack-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                strict: false,
                strictNullChecks: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
  resolve: {
    fallback: {
      modules: [path.resolve("./src"), "node_modules"],
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      fs: require.resolve("fs"),
      http: require.resolve("stream-http"),
      assert: require.resolve("assert/"),
    },
    extensions: [".ts", ".js", ".tsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  externals: {
    "node-fetch": "commonjs2 node-fetch",
  },
  devtool: "inline-source-map",
};
