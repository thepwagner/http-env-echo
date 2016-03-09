'use strict';

const server = require('./server');

let port = process.env.PORT || 8080;
server.listen(port);
