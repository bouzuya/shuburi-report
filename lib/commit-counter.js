var moment = require('moment');
var request = require('request-b');
var File = require('./file').File;

var CommitCounter = function(user, repo, date) {
  this.user = user;
  this.repo = repo;
  this.date = date;
  this.commits = null;
};

CommitCounter.prototype.count = function() {
  var baseUrl = 'https://api.github.com/';
  var path = 'repos/' + this.user + '/' + this.repo + '/stats/punch_card';
  var url = baseUrl + path;
  return request({ url: url, headers: { 'User-Agent': 'peggie' } })
  .then(function(res) {
    var json = JSON.parse(res.body);
    this.commits = json.reduce(function(r, i) { return r + i[2]; }, 0);
    return this.commits;
  }.bind(this));
};

CommitCounter.prototype.load = function() {
  var file = this.user + '/' + this.repo + '/' + this.date + '.json';
  return File.read(file, { encoding: 'utf8' }).then(function(data) {
    if (data) this.commits = data.commits;
  }.bind(this));
};

CommitCounter.prototype.save = function() {
  var file = this.user + '/' + this.repo + '/' + this.date + '.json';
  var json = {
    commits: this.commits,
    date: this.date,
    repo: this.repo,
    user: this.user
  };
  return File.write(file, json, { encoding: 'utf8' });
};

module.exports.CommitCounter = CommitCounter;
