var assert = require('power-assert');
var sinon = require('sinon');
var File = require('../lib/file').File;

describe('File', function() {
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
  });

  describe.skip('.read', function() {});
  describe.skip('.write', function() {});
});
