var request = require('request-b');

var TweetSearcher = function(options) {
  options = options || {};
  this.sinceId = options.sinceId || null;
};

TweetSearcher.prototype.search = function() {
  return this._search().then(function(res) {
    var statuses = JSON.parse(res.body).statuses.map(function(i) {
      return {
        id_str: i.id_str,
        text: i.text,
        user: {
          id_str: i.user.id_str,
          screen_name: i.user.screen_name
        }
      };
    });
    this.sinceId = statuses.reduce(function(id, i) {
      return (!id || i.id_str > id) ? i.id_str : id;
    }, this.sinceId);
    return statuses;
  }.bind(this));
};

TweetSearcher.prototype._search = function() {
  var q = '#shuburi';
  var params = {
    method: 'get',
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    qs: (this.sinceId ? { since_id: this.sinceId, q: q } : { q: q }),
    oauth: {
      consumer_key:    process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      token:           process.env.TWITTER_ACCESS_TOKEN,
      token_secret:    process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
  };
  return request(params);
};

module.exports.TweetSearcher = TweetSearcher;
