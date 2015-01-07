var report = require('./report');
var CLI = function() {};

CLI.prototype.run = function() {
  report();
};

module.exports.CLI = CLI;

