var assert = require('power-assert');
var sinon = require('sinon');
var Promise = require('es6-promise').Promise;
var TweetSearcher = require('../lib/tweet-searcher').TweetSearcher;

describe('TweetSearcher', function() {
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    this.searcher = new TweetSearcher();
    this.status1 = {
      id_str: '123',
      text: null,
      user: {
        id_str: null,
        screen_name: null
      }
    };
    this.status2 = {
      id_str: '456',
      text: null,
      user: {
        id_str: null,
        screen_name: null
      }
    };
  });

  afterEach(function() {
    this.sinon.restore();
  });

  describe('#search', function() {
    context('[], []', function() {
      beforeEach(function() {
        this.sinon.stub(this.searcher, '_search', function() {
          return Promise.resolve({
            body: JSON.stringify({
              statuses: []
            })
          });
        });
      });

      it('works', function() {
        return this.searcher.search().then(function(statuses) {
          assert(this.searcher.sinceId === null);
          assert.deepEqual(statuses, [])
          return this.searcher.search().then(function(statuses) {
            assert(this.searcher.sinceId === null);
            assert.deepEqual(statuses, []);
          }.bind(this));
        }.bind(this));
      });
    });

    context('[], [{id_str:"123"}]', function() {
      beforeEach(function() {
        var stub = this.sinon.stub(this.searcher, '_search');
        stub.onFirstCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: []
          })
        }));

        stub.onSecondCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: [this.status1]
          })
        }));
      });

      it('works', function() {
        return this.searcher.search().then(function(statuses) {
          assert(this.searcher.sinceId === null);
          assert.deepEqual(statuses, []);
          return this.searcher.search().then(function(statuses) {
            assert(this.searcher.sinceId === '123');
            assert.deepEqual(statuses, [this.status1]);
          }.bind(this));
        }.bind(this));
      });
    });

    context('[{id_str:"123"}], []', function() {
      beforeEach(function() {
        var stub = this.sinon.stub(this.searcher, '_search');
        stub.onFirstCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: [this.status1]
          })
        }));

        stub.onSecondCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: []
          })
        }));
      });

      it('works', function() {
        return this.searcher.search().then(function(statuses) {
          assert(this.searcher.sinceId === '123');
          assert.deepEqual(statuses, [this.status1]);
          return this.searcher.search().then(function(statuses) {
            assert(this.searcher.sinceId === '123');
            assert.deepEqual(statuses, []);
          }.bind(this));
        }.bind(this));
      });
    });

    context('[{id_str:"123"}], [{id_str:"456"}]', function() {
      beforeEach(function() {
        var stub = this.sinon.stub(this.searcher, '_search');
        stub.onFirstCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: [this.status1]
          })
        }));

        stub.onSecondCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: [this.status2]
          })
        }));
      });

      it('works', function() {
        return this.searcher.search().then(function(statuses) {
          assert(this.searcher.sinceId === '123');
          assert.deepEqual(statuses, [this.status1]);
          return this.searcher.search().then(function(statuses) {
            assert(this.searcher.sinceId === '456');
            assert.deepEqual(statuses, [this.status2]);
          }.bind(this));
        }.bind(this));
      });
    });

    context('[{id_str:"123"}, {id_str:"456"}], []', function() {
      beforeEach(function() {
        var stub = this.sinon.stub(this.searcher, '_search');
        stub.onFirstCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: [this.status1, this.status2]
          })
        }));

        stub.onSecondCall().returns(Promise.resolve({
          body: JSON.stringify({
            statuses: []
          })
        }));
      });

      it('works', function() {
        return this.searcher.search().then(function(statuses) {
          assert(this.searcher.sinceId === '456');
          assert.deepEqual(statuses, [this.status1, this.status2]);
          return this.searcher.search().then(function(statuses) {
            assert(this.searcher.sinceId === '456');
            assert.deepEqual(statuses, []);
          }.bind(this));
        }.bind(this));
      });
    });
  });
});
