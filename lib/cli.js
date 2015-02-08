var Collector = require('./collector').Collector;
var report = require('./report');
var Watcher = require('./watcher').Watcher;
var CLI = function() {};

CLI.prototype.run = function(action) {
  if (action === 'collect') {
    var collector = new Collector();
    collector.collect();
  } else if (action === 'watch') {
    var watcher = new Watcher();
    watcher.watch();
  } else {
    report();
  }
};

module.exports.CLI = CLI;
