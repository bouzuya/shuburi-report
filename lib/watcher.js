var Promise = require('es6-promise').Promise;

var Target = require('./target').Target;
var TweetParser = require('./tweet-parser').TweetParser;
var TweetSearcher = require('./tweet-searcher').TweetSearcher;

var Watcher = function() {};

Watcher.prototype.watch = function() {
  var searcher = new TweetSearcher();
  var target = new Target();

  searcher.load()
  .then(function() { console.log('search since_id: ' + searcher.sinceId); })
  .then(function() { return searcher.search(); })
  .then(function(tweets) {
    console.log('searched length: ' + tweets.length);
    var parser = new TweetParser();
    return tweets.map(function(tweet) {
      return parser.parse(tweet);
    }).filter(function(tweet) {
      return tweet;
    });
  })
  .then(function(targets) {
    // remove duplicate items
    return targets.reduce(function(r, i) {
      if (r.filter(function(j) {
        return j.week === i.week &&
               j.user === i.user &&
               j.repo === i.repo &&
               j.twitter_user_id && i.twitter_user_id;
      }).length > 0) {
        return r;
      } else {
        return r.concat(i);
      }
    }, []);
  })
  .then(function(targets) {
    console.log('new targets length: ' + targets.length);
    if (targets.length === 0) return;
    return target.load()
    .then(function(oldTargets) {
      var newTargets = oldTargets.concat(targets).reduce(function(r, i) {
        if (r.filter(function(j) {
          return j.week === i.week &&
                 j.user === i.user &&
                 j.repo === i.repo &&
                 j.twitter_user_id && i.twitter_user_id;
        }).length > 0) {
          return r;
        } else {
          return r.concat(i);
        }
      }, []);
      return target.save(newTargets);
    });
  })
  .then(function() { return searcher.save(); })
  .then(function() { console.log('save since_id: ' + searcher.sinceId); })
  .catch(function(e) { console.error(e); });
};

module.exports.Watcher = Watcher;
