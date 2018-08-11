const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const m = process.env.MODULE;
const webpack = require('webpack');

module.exports = {
  entry: `./src/js/index.js`,
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
        },
      },
      { test: /\.css$/,
        loaders: ['style-loader', 'css-loader'] 
      },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'], include: /node_modules/ },
     
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/html/index.html`,
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      firebase: 'firebase'
    })
  ]
};
