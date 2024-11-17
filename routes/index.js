var express = require('express');
var router = express.Router();
var db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Odin' });
});

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



router.get('/favoritos',(req, res, next) => {
  const sql = 'SELECT * FROM favoritos';
  db.query(sql, (error, resultados) => {
    if (error){
      console.log('Error en la consulta', error );
    }
    res.render('favoritos', {favoritos : resultados});
    //res.json(resultados);
  } );

});

// Ruta para mostrar el formulario de registro
// Ruta para mostrar el formulario de registro

router.get('/formRegistrarse', function(req, res, next) {
  res.render('registrarse');
});

// Ruta para registrar usuarios (se hace el INSERT aquí)
router.post('/login', (req, res, next) => {
  console.log(req.body);
  const {name, email, password} = req.body;

  // Insertar los datos del usuario en la base de datos
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
// Ruta para login y verificar credenciales (solo verifica, no inserta)
router.post('/login2', (req, res, next) => {
  console.log(req.body);
  const {email, password} = req.body;

  // Consultar si el usuario existe con el email y password proporcionados
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (error, result) => {
    if(error){
      console.log('Error en la consulta de búsqueda', error);
      return res.status(500).render('error');
    }

    // Si se encuentra el usuario
    if(result.length > 0) {
      res.redirect('/');  // Redirige a la página de inicio (index)
    } else {
      res.render('login', {message: 'Usuario no encontrado, por favor regístrate.'});
    }
  });
});







module.exports = router;
