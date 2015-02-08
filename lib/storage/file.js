var fs = require('fs');
var Promise = require('es6-promise').Promise;

var File = function() {};

// static
File.exists = function(file) {
  return new Promise(function(resolve) {
    fs.exists(file, function(exists) {
      resolve(exists);
    });
  });
};

// static
File.read = function(file, options) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, options, function(err, data) {
      if (err) return reject(err);
      resolve(JSON.parse(data));
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
