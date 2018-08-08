const HtmlWebpackPlugin = require('html-webpack-plugin');
const QuestionModule = process.env.MODULE;

module.exports = {
  entry: `./src/js/index.${QuestionModule}.js`,
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'], include: /node_modules\/bootstrap/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/html/index.${QuestionModule}.html`,
      inject: 'body'
    })
  ]
};
