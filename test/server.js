'use strict';

require('co-mocha');

const assert = require('assert');
const http = require('http');
const server = require('../server');

describe('server', () => {
  let serverUrl;
  beforeEach(function* () {
    let address = yield server.listen(0);
    serverUrl = `http://localhost:${address.port}`;
  });

  afterEach(function* () {
    yield server.close();
  });

  function getUrl() {
    return new Promise((resolve, reject) => {
      http.get(serverUrl, res => {
        if (res.statusCode !== 200) {
          return reject(new Error('Invalid response'));
        }

        let body = '';
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(body));
        });
      });
    });
  }

  describe('GET /', () => {
    it('should return 200', function* () {
      yield getUrl();
    });

    it('should return version', function* () {
      let res = yield getUrl();
      assert.strictEqual('4.0.0', res['version']);
    });

    it('should return message', function* () {
      server.MESSAGE = 'meow';
      let res = yield getUrl();
      assert.strictEqual('meow', res['message']);
    });
  });
});
