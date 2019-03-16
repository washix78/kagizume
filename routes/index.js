'use strict';

var config = require('config');
var express = require('express');
var router = express.Router();

var services = require('../services');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/dir', (req, res, next) => {
  try {
    var dpaths = services.listDpaths(config.rootDpath);
    res.json(dpaths);
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
});

router.get('/file', (req, res, next) => {
  try {
    var fpaths = services.listFpaths();
    res.json(fpaths);
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
});

router.put('/file', (req, res, next) => {
  try {

  } catch (e) {

  }
});

router.delete('/file', (req, res, next) => {
  try {

  } catch (e) {

  }
});


/*
 * /dir GET
 * /file GET
 * /file PUT
 * /file DELETE
 */

module.exports = router;
