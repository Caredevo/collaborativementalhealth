
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "/src/index.js"],
  output: { path: path.resolve(__dirname, "dist"), uniqueName:'mentalhealth_bundle', clean: true },
  mode: 'production',
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
            },
        },
      },
      {
        test: /\.key$/i,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mentalhealth",
      filename: "remoteEntry.js",
      exposes : {
        './MentalHealthIndex': './src/bootstrap'
      },
      shared: ['react','react-dom','react-router-dom', 'react-redux','react-final-form', 'react-moment', 'axios']
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};