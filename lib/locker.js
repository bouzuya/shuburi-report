var Promise = require('es6-promise').Promise;
var File = require('./file').File;

var Locker = function() {
  this.file = 'lock.json';
};

Locker.prototype.lock = function() {
  var options = { encoding: 'utf8' };
  return File.read(this.file, options)
  .then(function(json) {
    if (!json) return;
    if (json.updating) throw new Error();
    return File.write(this.file, { updating: true }, options);
  }.bind(this));
};

Locker.prototype.unlock = function() {
  return File.write(this.file, { updating: false }, { encoding: 'utf8' });
};

module.exports.Locker = Locker;
