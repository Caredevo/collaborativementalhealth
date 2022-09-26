
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "/src/index.js"],
  output: { path: path.resolve(__dirname, "dist"), 
            uniqueName:'mentalhealth_bundle' },
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
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
      {
        test:/\.html$/,
        use: [
          'html-loader'
        ]
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

