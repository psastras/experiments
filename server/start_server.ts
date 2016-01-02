import server = require("./server");

new server.Server(8080, (process.env.NODE_ENV !== 'production')).start();