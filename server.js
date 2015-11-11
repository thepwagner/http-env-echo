'use strict';

const http = require('http');

let server = http.createServer(function(req, res) {
  let message = process.env.MESSAGE || 'unknown';
  res.end(`Version 1.0.0, message "${message}"`);
});


let port = process.env.PORT || 8080;
server.listen(port);

