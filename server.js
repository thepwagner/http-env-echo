'use strict';

const http = require('http');
const version = require('./package.json')['version'];

exports.MESSAGE = process.env.MESSAGE || 'unknown';

let server = http.createServer(function(req, res) {
  let message = exports.MESSAGE;
  res.end(JSON.stringify({ version, message }));
});

exports.listen = function listen(port) {
  return new Promise(resolve => {
    server.listen(port, () => {
      return resolve(server.address());
    });
  });
};

exports.close = function close() {
  return new Promise(function(resolve, reject) {
    server.close(err => {
      if (err) return reject();
      return resolve();
    });
  });
};
