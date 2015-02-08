var TweetParser = function() {};

TweetParser.prototype.parse = function(s) {
  var pattern = new RegExp('^.*(\\d{4}-W\\d{2}).*?([-_0-9a-zA-Z]+)/([-_0-9a-zA-Z]+).*(?:週|しゅう?)ぶ(る|ろう|ります).*#shuburi.*$');
  var match = s.match(pattern);
  if (!match) return null;
  var week = match[1];
  var user = match[2];
  var repo = match[3];
  return { week: week, user: user, repo: repo };
};

module.exports.TweetParser = TweetParser;
