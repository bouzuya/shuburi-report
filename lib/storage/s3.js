var AWS = require('aws-sdk');
var Promise = require('es6-promise').Promise;

var File = function() {};

// static
File.read = function(file, options) {
  return new Promise(function(resolve, reject) {
    var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    var params = { Bucket: process.env.AWS_S3_BUCKET, Key: file };
    s3.getObject(params, function(err, data) {
      if (err) return reject(err);
      resolve(JSON.parse(data.Body));
    });
  });
};

// static
File.write = function(file, json, options) {
  return new Promise(function(resolve, reject) {
    var data = JSON.stringify(json);
    var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    var params = { Bucket: process.env.AWS_S3_BUCKET, Key: file, Body: data };
    s3.putObject(params, function(err, data) {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports.File = File;
