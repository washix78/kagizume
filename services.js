'use strict';

var fs = require('fs');
var path = require('path');
var trash = require('trash');

module.exports.listDpaths = (rootDpath) => {
  if (!fs.existsSync(rootDpath) || !fs.statSync(rootDpath).isDirectory()) {
    throw new Error(`Not directory ${rootDpath}.`);
  }
  var allDpaths = [];

  var loop = (topDpath) => {
    var paths = fs.readdirSync(topDpath).map((name) => {
      return path.resolve(topDpath, name);
    }).filter((test) => {
      return fs.statSync(test).isDirectory();
    });
    Array.prototype.push.apply(allDpaths, paths);
  };
  loop(rootDpath);

  return allDpaths;
};

module.exports.listFpaths = (dpath) => {
  var fpaths = fs.readdirSync(dpath).map((name) => {
    return path.resolve(dpath, name);
  }).filter((test) => {
    return !fs.statSync(test).isDirectory();
  });
  return fpaths;
};

module.exports.removeFpaths = (fpaths) => {
  if (!Array.isArray(fpaths)) {
    throw new Error('Not array.');
  }

  fpaths.forEach((fpath) => {
    if (fs.statSync(fpath).isDirectory()) {
      throw new Error(`${fpath} is directory.`);
    }
  });

  trash(fpaths).then(() => {
    return true;
  }).catch((e) => {
    return e;
  });
};

module.exports.moveFpaths = (apaths, bpaths) => {
  if (!Array.isArray(apaths) || !Array.isArray(bpaths) || apaths.length !== bpaths.length) {
    throw new Error('Illegal arrays.');
  }

  apaths.forEach((fpath) => {
    if (!fs.existsSync(fpath)) {
      throw new Error(`${fpath} not exist.`);
    }
    if (fs.statSync(fpath).isDirectory()) {
      throw new Error(`${fpath} is directory.`);
    }

    bpaths.forEach((fpath) => {
      if (fs.existsSync(fpath)) {
        throw new Error(`${fpath} exists.`);
      }

      if (bPaths.indexOf(fpath) !== -1) {
        throw new Error(`Duplicate path ${fpath}.`);
      }
    });
  });

  for (var i = 0; i < apaths.length; i++) {
    var apath = apaths[i];
    var bpath = bpaths[i];
    if (path.dirname(apath) !== path.dirname(bpath)) {
      throw new Error(`Not same directory. ${apath} and ${bpath}.`);
    }
  }

  var errors = [];
  for (var i = 0; i < apaths.length; i++) {
    var apath = apaths[i];
    var bpath = bpaths[i];
    try {
      fs.renameSync(apath, bpath);
    } catch (e) {
      errors.push(e);
    }
  }
};
