import server = require("./server");

new server.Server(process.env.PORT || 8080, !(process.env.NODE_ENV !== 'production')).start();