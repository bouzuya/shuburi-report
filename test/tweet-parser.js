var assert = require('power-assert');
var sinon = require('sinon');
var TweetParser = require('../lib/tweet-parser').TweetParser;

describe('TweetParser', function() {
  beforeEach(function() {
    this.parser = new TweetParser();
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
  });

  describe('#parse', function() {
    context('when valid message', function() {
      beforeEach(function() {
        this.sinon.stub(this.parser, 'parseMessage', function() {
          return { week: '2015-W01', user: 'bouzuya', repo: 'hspd-api' };
        });
        this.tweet = {
          user: {
            id_str: '123456789',
            screen_name: 'bouzuya'
          }
        };
      });

      it('contains twitter_{user_id,user_screen_name}', function() {
        var result = this.parser.parse(this.tweet);
        assert(result.twitter_user_id === '123456789');
        assert(result.twitter_user_screen_name === 'bouzuya');
      });
    });

    context('when invalid message', function() {
      beforeEach(function() {
        this.sinon.stub(this.parser, 'parseMessage', function() {
          return null;
        });
        this.tweet = {
          user: {
            id_str: '123456789',
            screen_name: 'bouzuya'
          }
        };
      });

      it('returns null', function() {
        assert(this.parser.parse(this.tweet) === null);
      });
    });
  });

  describe('#parseMessage', function() {
    beforeEach(function() {
      this.data = [
        {
          tweet: '2015-W01 は bouzuya/hspd-api で週ぶる #shuburi',
          result: { week: '2015-W01', user: 'bouzuya', repo: 'hspd-api' }
        },
        {
          tweet: '2015-W02 bouzuya/hspd-app しゅうぶる #shuburi',
          result: { week: '2015-W02', user: 'bouzuya', repo: 'hspd-app' }
        },
        {
          tweet: '2015-W03 bouzuya/hspd-bootstrap しゅぶる #shuburi',
          result: { week: '2015-W03', user: 'bouzuya', repo: 'hspd-bootstrap' }
        },
        {
          tweet: '2015-W04bouzuya/hspd-search週ぶる#shuburi',
          result: { week: '2015-W04', user: 'bouzuya', repo: 'hspd-search' }
        },
        {
          tweet: '2015-W05 bouzuya/hspd-plus を週ぶろう #shuburi',
          result: { week: '2015-W05', user: 'bouzuya', repo: 'hspd-plus' }
        },
        {
          tweet: 'とりあえず 2015-W06 は bouzuya/peggie-app で週ぶります！ #shuburi',
          result: { week: '2015-W06', user: 'bouzuya', repo: 'peggie-app' }
        },
        {
          tweet: '2015-W01 は bouzuya/hspd-app でしゅうぶってた！ #shuburi',
          result: null
        }
      ];
    });

    it('works', function() {
      this.data.forEach(function(data) {
        assert.deepEqual(this.parser.parseMessage(data.tweet), data.result);
      }, this);
    });
  });
});
