var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();
var compression = require('compression');
var morgan = require('morgan');

var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(__dirname, 'public');
var defaultPort = 8080;

if (isDevelopment) {
  var config = require('./webpack.config');
  var WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true
  }).listen(defaultPort, 'localhost', function (err, result) {
    if (err) { console.log(err) }
    console.log('Listening at localhost:8080');
  });
} else {
  app.use(morgan('combined'));
  app.use(compression());
  app.use(express.static(static_path, { maxAge: 86400000 }))
    .get('/', function (req, res) {
      res.sendFile('index.html', {
        root: static_path
      });
    })
  .listen(process.env.PORT || defaultPort, function (err) {
    if (err) { console.log(err) };
    console.log('Listening at localhost:8080');
  });
}