var assert = require('power-assert');
var sinon = require('sinon');

var Watcher = require('../lib/watcher').Watcher;

describe('Watcher', function() {
  beforeEach(function() {
    this.watcher = new Watcher();
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
  });

  describe.skip('#watch', function() {});
});
