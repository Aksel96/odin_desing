var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Odin' });
});



router.get('/login', function(req, res, next) {
  res.render('login', { title: ' Login | Odin' });
})

router.get('/catalogo', function(req, res, next) {
  res.render('catalogo', { title:' Catálogo | Odin' });
})


router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: ' Contacto | Odin' });
})


module.exports = router;
