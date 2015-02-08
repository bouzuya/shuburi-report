var assert = require('power-assert');
var sinon = require('sinon');
var Locker = require('../lib/locker').Locker;

describe('Locker', function() {
  beforeEach(function() {
    this.locker = new Locker();
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
  });

  describe.skip('#lock', function() {});
  describe.skip('#unlock', function() {});
});
