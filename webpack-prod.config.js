var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: ["./src/index.ts", "file?name=index.html!jade-html?pretty=true!./src/content/index.jade"],
    about: ["./src/about.ts", "file?name=about.html!jade-html?pretty=true!./src/content/about.jade"],
    experiments: ["./src/experiments.ts", "file?name=experiments.html!jade-html?pretty=true!./src/content/experiments.jade"],
    webgl: [ "./src/webgl.ts", "file?name=webgl.html!jade-html?pretty=true!./src/content/webgl.jade"]  
  },
  output: {
    path: path.join(__dirname, 'public/'),
    filename: "[name].js",
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss', '.ico', '.json' ]
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
      },
      {
        test: /\.ico$/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}