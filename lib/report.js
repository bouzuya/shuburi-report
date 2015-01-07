var getRepos = require('./get-repos');
var request = require('request-b');
var moment = require('moment');
var updateStatus = require('./update-status');

var getCurrentWeek = function() {
  return moment().format('GGGG-[W]WW');
};

var getCurrentRepo = function(repos) {
  return getRepos().then(function(repos) {
    var currentWeek = getCurrentWeek();
    var repo = repos.filter(function(i) {
      return i.week === currentWeek;
    })[0];
    return repo;
  });
};

var formatMessage = function(repo) {
  var message = [
    '週ぶり (shuburi)',
    repo.week,
    'の',
    repo.user + '/' + repo.repo,
    'は',
    repo.count,
    'commits',
    'です。どんどん週ぶっていきましょう。',
    'https://github.com/' + repo.user + '/' + repo.repo,
    '#shuburi'
  ].join(' ');
  return message;
};

module.exports = function() {
  return getCurrentRepo().then(function(repo) {
    if (!repo) {
      console.log('no repository in current week');
      return;
    }
    var message = formatMessage(repo);
    return updateStatus(message);
  })
  .then(function(res) {
    if (res.statusCode < 200 || 299 < res.statusCode) throw new Error(res.body);
    console.log('OK');
  })
  .catch(function(e) {
    console.error('NG');
    console.error(e);
  });
};
