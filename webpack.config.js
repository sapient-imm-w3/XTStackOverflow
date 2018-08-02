const HtmlWebpackPlugin = require('html-webpack-plugin');
const m = process.env.MODULE;
module.exports = {
  entry: `./src/js/Landing/index.${m}.js`,
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'], include: /node_modules\/bootstrap/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/js/Landing/index.${m}.html`,
      inject: 'body'
    })
  ]
};
