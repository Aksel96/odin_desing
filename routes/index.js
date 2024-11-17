var express = require('express');
var router = express.Router();
var db = require('../config/db');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Odin' });
});

router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: ' Contacto | Odin' });
});

router.get('/catalogo', (req, res) => {
  const productos = [
    { id : 1 ,nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 100, imagen: '../images/incinerator.png' },
    { id : 2,nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 200, imagen: '../images/iron_man.png' },
    { id : 3,nombre: 'Producto 3', descripcion: 'Descripción del producto 3', precio: 300, imagen: '../images/minecraft.jpg' },
    { id : 4,nombre: 'Producto 4', descripcion: 'Descripción del producto 4', precio: 400, imagen: '../images/thor_pc.png' },
  ];
  res.render('catalogo', { title:'Catálogo | Odín', productos });
});

router.get('/favoritos',(req, res, next) => {
  const sql = 'SELECT * FROM favoritos';
  db.query(sql, (error, resultados) => {
    if (error){
      console.log('Error en la consulta', error );
    }
    res.render('favoritos', {favoritos : resultados});
  });
});


router.get('/formRegistrarse', function(req, res, next) {
  res.render('registrarse');
});


router.post('/login', (req, res, next) => {
  console.log(req.body);
  const {name, email, password} = req.body;


  const sql = "INSERT INTO login(name, email, password) VALUES (?,?,?)";
  db.query(sql, [name, email, password], (error, result) => {
    if(error){
      console.log('Error en la consulta de inserción', error);
      return res.status(500).render('error');
    } else {
      res.render('login', {message: 'Registro exitoso. Ahora puedes iniciar sesión.'});
    }
  });
});


router.get('/formLogin2', function(req, res, next) {
  res.render('login');
});


router.post('/login2', (req, res, next) => {
  console.log(req.body);
  const {email, password} = req.body;


  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (error, result) => {
    if(error){
      console.log('Error en la consulta de búsqueda', error);
      return res.status(500).render('error');
    }


    if(result.length > 0) {
      const name = result[0].name;
      res.render('login', {
        message: `Bienvenido, ${name}`,
        name: name
      });
    } else {
      res.render('login', { message: 'Usuario no encontrado, por favor regístrate.' });
    }
  });
});

router.post('/favoritos', (req, res) => {
  const { modelo, caracteristicas, precio } = req.body;

  if (!modelo || !caracteristicas || !precio) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const sql = 'INSERT INTO favoritos (modelo, caracteristicas, precio) VALUES (?, ?, ?)';
  db.query(sql, [modelo, caracteristicas, precio], (error, result) => {
    if (error) {
      console.error('Error en la consulta de inserción', error);
      return res.status(500).json({ error: 'Error al insertar en la base de datos' });
    }
    res.status(200).json({ message: 'Producto añadido a favoritos' });
  });
});

router.post('/eliminar-favorito/:id', (req, res) => {
  const favoritoId = req.params.id;

  const sql = "DELETE FROM favoritos WHERE id = ?";
  db.query(sql, [favoritoId], (error, result) => {
    if (error) {
      console.log('Error al eliminar el favorito:', error);
      return res.status(500).send('Error al eliminar');
    }
    res.redirect('/favoritos');
  });
});

module.exports = router;
