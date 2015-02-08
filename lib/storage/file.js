var fs = require('fs');
var Promise = require('es6-promise').Promise;

var File = function() {};

// static
File.read = function(file, options) {
  return new Promise(function(resolve, reject) {
    fs.exists(file, function(exists) {
      if (!exists) return resolve(null);
      fs.readFile(file, options, function(err, data) {
        if (err) return reject(err);
        resolve(JSON.parse(data));
      });
    });
  });
};

// static
File.write = function(file, json, options) {
  return new Promise(function(resolve, reject) {
    var data = JSON.stringify(json);
    fs.writeFile(file, data, options, function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports.File = File;
