var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Schybo Labs' });
});

router.get('/roygbiv', function(req, res) {
  res.render('roygbiv', { title: 'Roygbiv' });
});

router.get('/blur', function(req, res) {
  res.render('blur', { title: 'Blur' });
});

router.get('/trevor-bday', function(req, res) {
  res.render('trevor-bday', { title: 'Happy Birthday Trevor' });
});

router.get('/happy-birthday-chris', function(req, res) {
  res.render('hbd-chris', { title: 'Happy Birthday Chris' });
});

router.get('/canvas-play', function(req, res) {
  res.render('canvas-play', { title: 'Playing with Canvas' });
});

module.exports = router;
