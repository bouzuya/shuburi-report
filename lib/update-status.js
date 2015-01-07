var request = require('request');
var Promise = require('es6-promise').Promise;

var request2 = function(params) {
  return new Promise(function(resolve, reject) {
    return request(params, function(err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};


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
  return request2(params);
};


