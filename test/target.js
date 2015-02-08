var assert = require('power-assert');
var sinon = require('sinon');
var Target = require('../lib/target').Target;

describe('Target', function() {
  beforeEach(function() {
    this.target = new Target();
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
  });

  describe.skip('#lock', function() {});
  describe.skip('#unlock', function() {});
});
