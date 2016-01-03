require("file?name=[name].[ext]!./favicon.ico");
require("./styles/base.scss")

var request = require('ajax-request');
var container = document.getElementById("commits");

request({ url: '/api/v0/build/recent/', method: 'GET' }, function(error, response, body) {
  if (response.statusCode == 200) {
    container.innerHTML = JSON.parse(body).map(function(commit) {
      return "<a href='" + commit.url + "' class='commit commit-" + commit.outcome + "'>"
        + commit.commit.substring(0, 6) + "<br />" + commit.subject + " (" + commit.author + ")"  
        + "</a>";
    }).join('');
  }
});