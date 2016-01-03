/// <reference path="./../typings/tsd.d.ts" />

import http = require("http")
import path = require("path")
import express = require("express")
import compression = require('compression');
import morgan = require('morgan');
import request = require('request');

var webpack = require('webpack');
var static_path = path.join(__dirname, '../../public');
var circleci_token = process.env.CIRCLECI_TOKEN;

export class Server {
  
  private path = path.join(__dirname, 'public');
  private server: express.Application;
  
  constructor(private port: number, private local: boolean) {
    this.server = this.local ? this.developmentServer() : this.productionServer();
    this.server.use('/api/v0/', this.router());
  }
  
  public start(): Server {
    this.server.listen(this.port, function (err, result) {
      if (err) { console.log(err) }
    });
    return this;
  }
  
  private router(): express.Router {
    var router = express.Router();
    // TODO: Factor this out
    router.get('/build', function(req, res) {
      res.status(200).json({ message: "/build" });
    });
    router.get('/build/recent', function(req, res) {
        var options = {
            uri: 'https://circleci.com/api/v1/project/psastras/experiments?circle-token=' + circleci_token + '&limit=5&offset=0&filter=completed',
            method: 'GET',
            json: true
        }
        request(options, function(error, response, body) {
          if (circleci_token != null) {
            if (!error && response.statusCode == 200) {
              var json = body.map(function(item) {
                return {
                    subject: item.subject,
                    author: item.committer_name,
                    date: item.committer_date,
                    url: item.build_url,
                    commit: item.vcs_revision,
                    outcome: item.outcome
                }
              });
              res.status(200).json(json); 
            } else {
              res.status(500).json({ message: "Error fetching data from circle ci"});
            }
          } else {
            res.status(500).json({ message: "No CIRCLECI_TOKEN defined."});
          }
        });  
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