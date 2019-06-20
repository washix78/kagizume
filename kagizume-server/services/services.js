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
