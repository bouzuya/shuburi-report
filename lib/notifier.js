var moment = require('moment');
var mustache = require('mustache');
var Promise = require('es6-promise').Promise;

var Target = require('./target').Target;
var CommitCounter = require('./commit-counter').CommitCounter;
var updateStatus = require('./update-status');

var Notifier = function() {};

Notifier.prototype.notify = function() {
  var week = this._getCurrentWeek();
  var now = moment.utc();
  var today = now.format('YYYY-MM-DD');
  var yesterday = moment.utc(now).subtract(1, 'days').format('YYYY-MM-DD');
  var target = new Target();
  return target.load()
  .then(function(targets) {
    return targets.filter(function(i) { return i.week === week; });
  })
  .then(function(targets) {
    return targets.reduce(function(promise, i) {
      var counter1 = new CommitCounter(i.user, i.repo, today);
      var counter2 = new CommitCounter(i.user, i.repo, yesterday);
      return promise.then(function() { return counter1.load(); })
      .then(function() { return counter2.load(); })
      .then(function() {
        var data = {
          week: i.week,
          user: i.user,
          repo: i.repo,
          commits: counter1.commits,
          offset: (counter2 ? counter1.commits - counter2.commits : 0),
        };
        var message = this._formatMessage(data);
        return updateStatus(message);
      }.bind(this))
      .then(function(res) {
        if (res.statusCode < 200 || 299 < res.statusCode)
          throw new Error(res.body);
      })
      .then(function() {
        return new Promise(function(resolve) { setTimeout(resolve, 1000); });
      });
    }.bind(this), Promise.resolve());
  }.bind(this));
};

Notifier.prototype._formatMessage = function(repo) {
  var template = [
    '週ぶり (shuburi) {{week}} の ',
    '{{user}}/{{repo}} は {{commits}} (+{{offset}}) commits です。',
    'どんどん週ぶっていきましょう。 ',
    'https://github.com/{{user}}/{{repo}} ',
    '#shuburi'
  ].join('');
  return mustache.render(template, repo);
};

Notifier.prototype._getCurrentWeek = function() {
  return moment.utc().format('GGGG-[W]WW');
};

module.exports.Notifier = Notifier;
