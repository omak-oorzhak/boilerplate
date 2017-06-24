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
  entry: glob.sync('./src/**/*.+(js|scss|sass|pug)'),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        //use: ['html-loader', 'pug-html-loader']
        use: ['pug-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
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
    port: 3000,
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      //minify: { collapseWhitespace: true },
      filename: 'index.html',
      hash: true,
      template: './src/pages/index.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      hash: true,
      template: './src/pages/about.pug',
    }),
    new ExtractTextPlugin({
      filename: "index.css",
      disable: !isProd,
      allChunks: true
    })
  ]
};