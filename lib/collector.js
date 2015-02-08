var moment = require('moment');
var Promise = require('es6-promise').Promise;

var CommitCounter = require('./commit-counter').CommitCounter;
var Target = require('./target').Target;

var Collector = function() {};

Collector.prototype.collect = function() {
  var target = new Target();
  return target.load()
  .then(function(targets) {
    return targets.reduce(function(promise, i) {
      var date = moment.utc().format('YYYY-MM-DD');
      var counter = new CommitCounter(i.user, i.repo, date);
      return promise
      .then(function() { return counter.count(); })
      .then(function() { return counter.save() })
      .then(function() {
        return new Promise(function(resolve) { setTimeout(resolve, 1000); });
      });
    }, Promise.resolve());
  })
  .catch(function(e) {
    console.error(e);
  });
};

module.exports.Collector = Collector;
