var File = require('./file').File;
var Promise = require('es6-promise').Promise;

var Target = function() {
  this.file = './target.json';
};

Target.prototype.load = function() {
  return File.exists(this.file)
  .then(function(exists) {
    if (!exists) return [];
    return File.read(this.file, { encoding: 'utf8' });
  }.bind(this));
};

Target.prototype.save = function(targets) {
  return File.write(this.file, targets, { encoding: 'utf8' });
};

module.exports.Target = Target;
