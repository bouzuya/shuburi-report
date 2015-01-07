var express = require('express');

var App = function() {};

App.prototype.run = function() {
  var app = express();

  app.get('/', function(req, res) {
    res.send('hello');
  });

  app.listen(process.env.PORT || 3000);
};

module.exports.App = App;

