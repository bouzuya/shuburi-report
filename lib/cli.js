var report = require('./report');
var Watcher = require('./watcher').Watcher;
var CLI = function() {};

CLI.prototype.run = function(action) {
  if (action === 'watch') {
    var watcher = new Watcher();
    watcher.watch();
  } else {
    report();
  }
};

module.exports.CLI = CLI;
