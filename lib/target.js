var fs = require('fs');
var Promise = require('es6-promise').Promise;

var Target = function() {
  this.file = './target.json';
};

Target.prototype.load = function() {
  return new Promise(function(resolve, reject) {
    fs.exists(this.file, function(exists) {
      if (!exists) return resolve([]);
      fs.readFile(this.file, { encoding: 'utf8' }, function(err, data) {
        if (err) return reject(err);
        resolve(JSON.parse(data));
      });
    });
  }.bind(this));
};

Target.prototype.save = function(targets) {
  return new Promise(function(resolve, reject) {
    var data = JSON.stringify(targets);
    fs.writeFile(this.file, data, { encoding: 'utf8' }, function(err, data) {
      if (err) return reject(err);
      resolve();
    });
  }.bind(this));
};

module.exports.Target = Target;
