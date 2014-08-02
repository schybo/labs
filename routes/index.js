var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
