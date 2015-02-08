var moment = require('moment');
var Promise = require('es6-promise').Promise;

var CommitCounter = require('./commit-counter').CommitCounter;
var Target = require('./target').Target;

var Collector = function() {};

Collector.prototype.collect = function() {
  var target = new Target();
  console.log('collector: start');
  return target.load()
  .then(function(targets) {
    console.log('collector: loaded');
    return targets;
  })
  .then(function(targets) {
    return targets.reduce(function(promise, i) {
      var date = moment.utc().format('YYYY-MM-DD');
      var counter = new CommitCounter(i.user, i.repo, date);
      return promise
      .then(function() { return counter.count(); })
      .then(function() {
        console.log('collector: counted commits');
        console.log(counter);
      })
      .then(function() { return counter.save() })
      .then(function() {
        console.log('collector: saved count');
      })
      .then(function() {
        return new Promise(function(resolve) { setTimeout(resolve, 1000); });
      });
    }, Promise.resolve());
  })
  .then(function() { console.log('collector: end'); })
  .catch(function(e) {
    console.error(e);
  });
};

module.exports.Collector = Collector;
