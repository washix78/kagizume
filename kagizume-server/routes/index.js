const config = require('config');
const router = require('express').Router();

const services = require('../services/services');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dir', (req, res, next) => {
  res.send(services.listDpaths(config.topDpath));
});

module.exports = router;
