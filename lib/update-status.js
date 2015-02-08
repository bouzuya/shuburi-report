var request = require('request-b');
var Promise = require('es6-promise').Promise;

module.exports = function(message) {
  var oauth = {
    consumer_key:    process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    token:           process.env.TWITTER_ACCESS_TOKEN,
    token_secret:    process.env.TWITTER_ACCESS_TOKEN_SECRET
  };
  var params = {
    method: 'post',
    url: 'https://api.twitter.com/1.1/statuses/update.json',
    form: { status: message },
    oauth: oauth
  };
  return request(params);
};
