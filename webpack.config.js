var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    index: ["webpack-dev-server/client?http://localhost:8080", "webpack/hot/only-dev-server", "./src/index.ts", "file?name=index.html!jade-html?pretty=true!./src/content/index.jade"],
    about: ["webpack-dev-server/client?http://localhost:8080", "webpack/hot/only-dev-server", "./src/about.ts", "file?name=about.html!jade-html?pretty=true!./src/content/about.jade"],
    experiments: ["webpack-dev-server/client?http://localhost:8080", "webpack/hot/only-dev-server", "./src/experiments.ts", "file?name=experiments.html!jade-html?pretty=true!./src/content/experiments.jade"]  
  },
  output: {
    path: path.join(__dirname, 'public/'),
    filename: "[name].js",
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss' ]
  },
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: 'ts-loader' 
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style', // backup loader when not building .css file
          'css!sass' // loaders to preprocess CSS
        )
      },
      {
        test: /\.woff$/,
        loader: 'file'
      }
    ]
  }
}