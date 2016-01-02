/// <reference path="./../typings/tsd.d.ts" />

import http = require("http")
import path = require("path")
import express = require("express")
import compression = require('compression');
import morgan = require('morgan');
var webpack = require('webpack');
var static_path = path.join(__dirname, '../../public');

export class Server {
  
  private path = path.join(__dirname, 'public');
  private server: express.Application;
  
  constructor(private port: number, private local: boolean) {
    this.server = this.local ? this.developmentServer() : this.productionServer();
    this.server.use('/api/v0/', this.router());
  }
  
  public start(): Server {
    this.server.listen(this.port, 'localhost', function (err, result) {
      if (err) { console.log(err) }
    });
    return this;
  }
  
  private router(): express.Router {
    var router = express.Router();
    router.get('/build/', function(req, res) {
        res.json({ message: 'Test' });   
    });
    return router;
  }
  
  private developmentServer(): express.Application {
    var config = require('./../webpack.config');
    var WebpackDevServer = require('webpack-dev-server');
    return new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      hot: true,
      inline: true
    });
  }
  
  private productionServer(): express.Application {
    var app = express();
    // app.use(morgan('combined'));
    app.use(compression());
    app.use(express.static(static_path, { maxAge: 86400000 }))
      .get('/', function (req, res) {
        res.sendFile('index.html', { root: static_path });
      });
    return app;
  }
}