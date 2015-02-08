var assert = require('power-assert');
var TweetParser = require('../lib/tweet-parser').TweetParser;

describe('TweetParser', function() {
  beforeEach(function() {
    this.parser = new TweetParser();
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
  })

  it('works', function() {
    this.data.forEach(function(data) {
      assert.deepEqual(this.parser.parse(data.tweet), data.result);
    }, this);
  });
});
