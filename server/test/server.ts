/// <reference path="../../typings/tsd.d.ts" />

import assert = require('assert');
import request = require('request');
import server = require("../server");

/**
 * Integration tests for the server which tests assets return something
 * and that the api endpoints work.
 */
describe('Server', function() {
  
  var request = require('request');
  var sv = new server.Server(8090, false).start();
  var uri = 'http://localhost:8090'
  
  describe('should return static assets', function () {
    
    it('for home page content', function (done) {
      request(uri, function (error, response, body) {
          assert.equal(200, response.statusCode);
          assert.equal("text/html; charset=UTF-8", response.headers['content-type']);
          done();
      });
    });
    
    it('for about page content', function (done) {
      request(uri + '/about.html', function (error, response, body) {
          assert.equal(200, response.statusCode);
          assert.equal("text/html; charset=UTF-8", response.headers['content-type']);
          done();
      });
    });
    
    it('for experiments page content', function (done) {
      request(uri + '/experiments.html', function (error, response, body) {
          assert.equal(200, response.statusCode);
          assert.equal("text/html; charset=UTF-8", response.headers['content-type']);
          done();
      });
    });
  });
  
  describe('should return content for /api/v0/build', function() {
    
     it('GET', function (done) {
      request(uri + '/api/v0/build', function (error, response, body) {
          assert.equal(200, response.statusCode);
          assert.equal('{"message":"/build"}', body);
          done();
      });
    });
    
  });
});