import server = require("./server");

var port = process.env.PORT || 8080;
var local = process.env.NODE_ENV !== 'production'

console.log("Starting server with port: " + port + " local: " + local);

new server.Server(port, local).start();