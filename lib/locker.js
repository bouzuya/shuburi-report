var Promise = require('es6-promise').Promise;
var fs = require('fs');

var Locker = function() {
  this.file = './lock.json';
};

Locker.prototype.lock = function() {
  var options = { encoding: 'utf8' };
  return new Promise(function(resolve, reject) {
    fs.exists(this.file, function(exists) {
      if (!exists) return resolve();
      fs.readFile(this.file, options, function(err, data) {
        if (err) return reject(err);
        var json = JSON.parse(data);
        if (json.updating) return reject();
        var data = JSON.stringify({ updating: true });
        fs.writeFile(this.file, data, options, function(err, data) {
          if (err) return reject(err);
          resolve();
        });
      }.bind(this));
    }.bind(this));
  }.bind(this));
};

Locker.prototype.unlock = function() {
  var options = { encoding: 'utf8' };
  return new Promise(function(resolve, reject) {
    var data = JSON.stringify({ updating: false });
    fs.writeFile(this.file, data, options, function(err, data) {
      if (err) return reject(err);
      resolve();
    });
  }.bind(this));
};

module.exports.Locker = Locker;
