'use strict';

const fs = require('fs');
const path = require('path');

module.exports.listDpaths = (topDpath) => {
  var dpaths = [];

  var walk = (parent) => {
    dpaths.push(parent);
    fs.readdirSync(parent).map((name) => {
      return path.resolve(parent, name);
    }).filter((test) => {
      return fs.statSync(test).isDirectory();
    }).forEach((child) => {
      walk(child);
    });
  };

  walk(path.resolve(topDpath));
  return dpaths;
};

module.exports.listDirSummary = (topDpath) => {
  var dirs = [];

  var walk = (parent) => {
    var dir = {};
    dir.path = parent;

    var dpaths = [];
    var fpaths = [];
    fs.readdirSync(parent).map((name) => {
      return path.resolve(parent, name);
    }).forEach((test) => {
      if (fs.statSync(test).isDirectory()) {
        dpaths.push(test);
      } else {
        fpaths.push(test);
      }
    });

    dir.fileCount = fpaths.length;
    dirs.push(dir);

    dpaths.forEach((child) => {
      walk(child);
    });
  };
  walk(path.resolve(topDpath));
  return dirs;
};

module.exports.listFpaths = (dpath) => {
  var fpaths = fs.readdirSync(dpath).map((name) => {
    return path.resolve(dpath, name);
  }).filter((test) => {
    return !fs.statSync(test).isDirectory();
  });
  return fpaths;
};
