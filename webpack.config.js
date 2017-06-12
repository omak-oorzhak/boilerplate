let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let path = require('path');
let glob = require("glob");

let isProd = process.env.NODE_ENV === 'production'; //true or false
let cssDev = ['style-loader', 'css-loader', 'sass-loader'];
let cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/dist'
});
let cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: glob.sync('./src/**/*.+(js|scss|sass|ejs)'),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ['ejs-compiled-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=[name].[ext]&outputPath=img/',
          'image-webpack-loader'
        ]
      },
    ]
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/',
    compress: true,
    stats: "errors-only",
    port: 9000,
    open: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: true },
      filename: 'index.html',
      hash: true,
      template: './src/pages/index.ejs',
    }),
    new HtmlWebpackPlugin({
      minify: { collapseWhitespace: true },
      filename: 'contacts.html',
      hash: true,
      template: './src/pages/contacts.ejs',
    }),
    new ExtractTextPlugin({
      filename: "index.css",
      disable: !isProd,
      allChunks: true
    })
  ]
};