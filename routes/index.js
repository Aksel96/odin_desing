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
    { id : 1 ,nombre: 'Hatake', descripcion: 'Procesador: Intel Core i9-13900K, GPU: NVIDIA GeForce RTX 4090 24GB, RAM: ' +
          '64GB DDR5 6000MHz, Almacenamiento: 2TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido AIO 360mm', precio: '$ 74,000.00', imagen: '../images/naruto.jpg' },
    { id : 2,nombre: 'Iron Man', descripcion: 'Procesador: AMD Ryzen 9 7950X, GPU: NVIDIA GeForce RTX 4080 16GB, ' +
          'RAM: 64GB DDR5 5200MHz, Almacenamiento: 2TB NVMe PCIe 4.0 SSD + 4TB HDD, ' +
          'Enfriamiento: Enfriamiento líquido AIO 240mm', precio: '$ 85,000.00', imagen: '../images/ironman.jpeg' },
    { id : 3,nombre: 'Minecraft', descripcion: 'Procesador: Intel Xeon W-2400, GPU: NVIDIA RTX A6000 48GB, ' +
          'RAM: 128GB DDR5 4800MHz, Almacenamiento: 4TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento por aire avanzado', precio: '$ 79,900.00', imagen: '../images/minecraft.jpg' },
    { id : 4,nombre: 'Mjölnir', descripcion: 'Procesador: Intel Core i7-13700K, GPU: NVIDIA GeForce RTX 4070 Ti 12GB, ' +
          'RAM: 32GB DDR5 5200MHz, Almacenamiento: 1TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido AIO 240mm', precio: '$ 69,000.00', imagen: '../images/thor_pc.png' },
    { id : 5,nombre: 'Producto 4', descripcion: 'Procesador: AMD Ryzen 9 7900X, GPU: AMD Radeon RX 7900 XTX 24GB, RAM: ' +
          '64GB DDR5 5600MHz, Almacenamiento: 2TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento por aire avanzado', precio: '$ 45,900.00', imagen: '../images/thor_pc.png' },
    { id : 6,nombre: 'Producto 4', descripcion: 'Procesador: AMD Ryzen 7 7800X3D, GPU: NVIDIA GeForce RTX 4090 24GB, ' +
          'RAM: 32GB DDR5 6000MHz, Almacenamiento: 1TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido AIO 360mm', precio: '35,900.00', imagen: '../images/thor_pc.png' },
    { id : 7,nombre: 'Producto 4', descripcion: 'Procesador: Intel Xeon W9-3495X, GPU: NVIDIA RTX 6000 Ada, ' +
          'RAM: 256GB DDR5 4800MHz, Almacenamiento: 8TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido custom', precio: '$ 72,900.00', imagen: '../images/thor_pc.png' },
    { id : 8,nombre: 'Producto 4', descripcion: 'Procesador: Intel Core i5-13600K, GPU: NVIDIA GeForce RTX 4060 Ti 8GB, ' +
          'RAM: 16GB DDR5 4800MHz, Almacenamiento: 512GB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento por aire avanzado', precio: '$ 69,000.00', imagen: '../images/thor_pc.png' },
    { id : 9,nombre: 'Producto 4', descripcion: 'Procesador: AMD Ryzen Threadripper PRO 5995WX, ' +
          'GPU: NVIDIA RTX A5500 24GB, RAM: 512GB DDR4 ECC, Almacenamiento: 16TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido custom', precio: '$ 59,900.00', imagen: '../images/thor_pc.png' },
    { id : 10,nombre: 'Producto 4', descripcion: 'Procesador: Intel Core i9-13900KF, GPU: AMD Radeon RX 7900 XT 20GB,' +
          ' RAM: 32GB DDR5 5200MHz, Almacenamiento: 1TB NVMe PCIe 4.0 SSD + 2TB HDD, Enfriamiento: Enfriamiento líquido AIO 280mm', precio: '$ 65,900.00', imagen: '../images/thor_pc.png' },
    { id : 11,nombre: 'Producto 4', descripcion: 'Procesador: Intel Core i7-13700K, GPU: NVIDIA GeForce RTX 4070 Ti 12GB, ' +
          'RAM: 32GB DDR5 5200MHz, Almacenamiento: 1TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido AIO 240mm', precio: '$ 87,900.00', imagen: '../images/thor_pc.png' },
    { id : 12,nombre: 'Producto 4', descripcion: 'Procesador: AMD Ryzen 7 7800X3D, GPU: NVIDIA GeForce RTX 4090 24GB,' +
          ' RAM: 32GB DDR5 6000MHz, Almacenamiento: 1TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido AIO 360mm', precio: '$ 89,900.00', imagen: '../images/thor_pc.png' },
    { id : 13,nombre: 'Producto 4', descripcion: 'Procesador: Intel Core i9-13900K, GPU: NVIDIA GeForce RTX 4090 24GB, ' +
          'RAM: 64GB DDR5 6000MHz, Almacenamiento: 2TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento líquido AIO 360mm', precio: '$ 79,000.00', imagen: '../images/thor_pc.png' },
    { id : 14,nombre: 'Producto 4', descripcion: 'Procesador: AMD Ryzen 9 7950X, GPU: NVIDIA GeForce RTX 4080 16GB, ' +
          'RAM: 64GB DDR5 5200MHz, Almacenamiento: 2TB NVMe PCIe 4.0 SSD + 4TB HDD, Enfriamiento: Enfriamiento líquido AIO 240mm', precio: '$ 84,900.00', imagen: '../images/thor_pc.png' },
    { id : 15,nombre: 'Producto 4', descripcion: 'Procesador: Intel Xeon W-2400, GPU: NVIDIA RTX A6000 48GB,' +
          ' RAM: 128GB DDR5 4800MHz, Almacenamiento: 4TB NVMe PCIe 4.0 SSD, Enfriamiento: Enfriamiento por aire avanzado', precio: '$ 76,900.00', imagen: '../images/thor_pc.png' },
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
