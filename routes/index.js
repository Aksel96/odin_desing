var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Odin' });
});



router.get('/login', function(req, res, next) {

  res.render('login', { title: ' Login | Odin' });
})

router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: ' Contacto | Odin' });
})


router.get('/catalogo', (req, res) => {
  const productos = [
    { nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 100, imagen: '../images/incinerator.png' },
    { nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 200, imagen: '../images/iron_man.png' },
    { nombre: 'Producto 3', descripcion: 'Descripción del producto 3', precio: 300, imagen: '../images/minecraft.jpg' },
    { nombre: 'Producto 4', descripcion: 'Descripción del producto 4', precio: 400, imagen: '../images/thor_pc.png' },
  ];
  res.render('catalogo', { title:'Catálogo | Odín', productos });
});


module.exports = router;
