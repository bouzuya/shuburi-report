var request = require('request-b');
var cheerio = require('cheerio');
var Promise = require('es6-promise').Promise;

var getRepos = function() {
  var url = 'https://raw.githubusercontent.com/shuburi/shuburi.github.io/master/index.json';
  return request(url).then(function(res) {
    var json = JSON.parse(res.body);
    var repos = json.filter(function(i) {
      return i.user === 'bouzuya';
    });
    return repos.reduce(function(promise, i) {
      var result = null;
      return promise
      .then(function(r) { result = r; })
      .then(function() {
        return request('https://github.com/' + i.user + '/' + i.repo);
      })
      .then(function(res) {
        var $ = cheerio.load(res.body);
        var count = $('ul.numbers-summary li.commits .num').text().trim();
        i.count = count;
        result.push(i);
        return result;
      });
    }, Promise.resolve([]));
  });
};

module.exports = getRepos;

