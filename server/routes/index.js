'use strict';

var config = require('config');
var express = require('express');
var fs = require('fs');
var JSON5 = require('json5');
var log4js = require('log4js');
var path = require('path');
var router = express.Router();

var services = require('../services');

log4js.configure(JSON5.parse(fs.readFileSync(config.logConfFpath)));
var logger = log4js.getLogger('default');

router.get('/info', (req, res, next) => {
  try {
    res.json({
      rootDir: path.resolve(config.rootDpath),
      sep: path.sep
    });
  } catch (e) {
    logger.error(e.stack);
    res.status(500).json({
      message: e.message
    });
  }
});

router.get('/dir', (req, res, next) => {
  try {
    var dpaths = services.listDpaths(config.rootDpath);
    res.json(dpaths);
  } catch (e) {
    logger.error(e.stack);
    res.status(400).json({
      message: e.message
    });
  }
});

router.get('/file', (req, res, next) => {
  try {
    var fpaths = services.listFpaths(req.query.dir);
    res.json(fpaths);
  } catch (e) {
    logger.error(e.stack);
    res.status(400).json({
      message: e.message
    });
  }
});

router.put('/file', (req, res, next) => {
  try {
    services.moveFpaths(req.body.apaths, req.body.bpaths);
  } catch (e) {
    logger.error(e.stack);
    res.status(400).json({
      message: e.message
    });
  }
});

router.delete('/file', (req, res, next) => {
  try {
    console.log('OKOKOKOKOKOKOKOKOKO');
    console.log(req.body);
    // services.removeFpaths(req.body.fpaths);
    res.status(400).json({
      message: 'uiui'
    });
  } catch (e) {
    logger.error(e.stack);
    res.status(400).json({
      message: e.message
    });
  }
});

module.exports = router;
