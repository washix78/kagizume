var config = require('config');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

try {
  if (!fs.statSync(config.rootDpath).isDirectory()) {
    throw new Error('Please specify direcotry path.');
  }

  var app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(config.rootDpath)));
  console.log(path.resolve(config.rootDpath));

  app.use('/', indexRouter);

  module.exports = app;
} catch (e) {
  console.log(e.stack);
  throw e;
}

