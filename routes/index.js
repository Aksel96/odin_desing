var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Odin' });
});



router.get('/login', function(req, res, next) {

  res.render('login', { title: ' Login | Odin' });
})

router.get('/registrarse', function(req, res, next) {

  res.render('registrarse', { title: ' Registrarse | Odin' });
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

router.get('/favoritos', (req, res) => {
  const favoritos = [
    { id: '1', modelo: 'Producto 1', caracteristicas: 'Descripción del producto 1', precio: 100},
    { id: '2', modelo: 'Producto 2', caracteristicas: 'Descripción del producto 2', precio: 200 },
    { id: '3', modelo: 'Producto 3', caracteristicas: 'Descripción del producto 3', precio: 300 },
    { id: '4', modelo: 'Producto 4', caracteristicas: 'Descripción del producto 4', precio: 400 },
  ];
  res.render('favoritos', { title:'Favoritos | Odín', favoritos });
});


module.exports = router;
