'use strict';

var config = require('config');
var express = require('express');
var JSON5 = require('json5');
var log4js = require('log4js');
var router = express.Router();

var services = require('../services');

log4js.configure(JSON5.parse(config.logConfFpath));
var logger = log4js.getLogger('default');

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
    var fpaths = services.listFpaths(res.body.dpath);
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
    services.removeFpaths(req.body.fpaths);
  } catch (e) {
    logger.error(e.stack);
    res.status(400).json({
      message: e.message
    });
  }
});

module.exports = router;
