var Collector = require('./collector').Collector;
var Notifier = require('./notifier').Notifier;
var Watcher = require('./watcher').Watcher;
var CLI = function() {};

CLI.prototype.run = function(action) {
  if (action === 'collect') {
    var collector = new Collector();
    collector.collect();
  } else if (action === 'notify') {
    var notifier = new Notifier();
    notifier.notify();
  } else if (action === 'watch') {
    var watcher = new Watcher();
    watcher.watch();
  } else {
    console.error('invalid action: ' + action);
  }
};

module.exports.CLI = CLI;
