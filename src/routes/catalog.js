const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

router.get('/clients', catalogController.getClients);

// Rutas CRUD de Clientes
router.post('/clientes', catalogController.crearCliente); // Crear cliente
router.get('/clientes', catalogController.obtenerClientes); // Obtener todos los clientes
router.get('/clientes/:id', catalogController.obtenerCliente); // Obtener cliente por ID
router.put('/clientes/:id', catalogController.actualizarCliente); // Actualizar cliente
router.delete('/clientes/:id', catalogController.eliminarCliente); // Eliminar cliente

router.get('/cliente/:id/enviar', clienteController.obtenerYEnviarCliente);

// Rutas CRUD de Domicilios
router.post('/domicilios', catalogController.crearDomicilio); // Crear domicilio
router.get('/domicilios', catalogController.obtenerDomicilios); // Obtener todos los domicilios
router.get('/domicilios/:id', catalogController.obtenerDomicilio); // Obtener domicilio por ID
router.put('/domicilios/:id', catalogController.actualizarDomicilio); // Actualizar domicilio
router.delete('/domicilios/:id', catalogController.eliminarDomicilio); // Eliminar domicilio

// Rutas CRUD de Productos
router.post('/productos', catalogController.crearProducto); // Crear producto
router.get('/productos', catalogController.obtenerProductos); // Obtener todos los productos
router.get('/productos/:id', catalogController.obtenerProducto); // Obtener producto por ID
router.put('/productos/:id', catalogController.actualizarProducto); // Actualizar producto
router.delete('/productos/:id', catalogController.eliminarProducto); // Eliminar producto



module.exports = router;
