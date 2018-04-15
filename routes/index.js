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

// router.get('/happy-birthday-ashley', function(req, res) {
//   res.render('hbd-ashley', { title: 'Happy Birthday Ashley' });
// });

// router.get('/happy-birthday-lindsay', function(req, res) {
//   res.render('hbd-lindsay', { title: 'Happy Birthday Lindsay' });
// });

router.get('/happy-bearthday-sophia', function(req, res) {
  res.render('hbd-sophia', { title: 'Happy Birthday Sophia' });
});

router.get('/happy-birthday-chris', function(req, res) {
  res.render('hbd-chris', { title: 'Happy Birthday Chris' });
});

router.get('/happy-birthday-charlotte', function(req, res) {
  res.render('hbd-charlotte', { title: 'Happy Birthday Charlotte' });
});

router.get('/merry-christmas', function(req, res) {
  res.render('xmas', { title: 'Merry Christmas' });
});

router.get('/canvas-play', function(req, res) {
  res.render('canvas-play', { title: 'Playing with Canvas' });
});

router.get('/boggle', function(req, res) {
  res.render('boggle', { title: 'Boggle' });
});

module.exports = router;
