const db = require('../config/db'); // Importa el pool de conexiones desde config/db.js
const axios = require('axios'); // Axios para realizar el POST request

exports.obtenerYEnviarCliente = async (req, res) => {
    const { id } = req.params; // Obtener el ID del cliente desde los parámetros de la ruta

    try {
        // Consultar los datos del cliente en la base de datos
        const query = 'SELECT * FROM Clientes WHERE ID = ?';
        const [results] = await db.query(query, [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const cliente = results[0]; // Datos del cliente

        // Realizar un POST request al siguiente contenedor (puerto 4001)
        const apiUrl = 'http://localhost:4001/api/notes/create';
        const postData = {
            cliente: cliente.ID,
            razonSocial: cliente.Razon_Social,
            nombreComercial: cliente.Nombre_Comercial,
            correoElectronico: cliente.Correo_Electronico,
        };

        const response = await axios.post(apiUrl, postData);

        // Responder al cliente con los resultados
        res.status(200).json({
            mensaje: 'Datos del cliente obtenidos y enviados exitosamente',
            cliente,
            respuestaAPI: response.data,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
};




// CRUD de Clientes

// Crear cliente
exports.crearCliente = async (req, res) => {
    const { Razon_Social, Nombre_Comercial, Correo_Electronico } = req.body;
    const query = 'INSERT INTO Clientes (Razon_Social, Nombre_Comercial, Correo_Electronico) VALUES (?, ?, ?)';
    try {
        const [results] = await db.query(query, [Razon_Social, Nombre_Comercial, Correo_Electronico]);
        res.status(201).json({ mensaje: 'Cliente creado exitosamente', id: results.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear cliente' });
    }
};

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
    const query = 'SELECT * FROM Clientes';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
};

// Obtener cliente por ID
exports.obtenerCliente = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Clientes WHERE ID = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cliente' });
    }
};

// Actualizar cliente
exports.actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { Razon_Social, Nombre_Comercial, Correo_Electronico } = req.body;
    const query = 'UPDATE Clientes SET Razon_Social = ?, Nombre_Comercial = ?, Correo_Electronico = ? WHERE ID = ?';
    try {
        const [results] = await db.query(query, [Razon_Social, Nombre_Comercial, Correo_Electronico, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Clientes WHERE ID = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
};

// CRUD de Domicilios

// Crear domicilio
exports.crearDomicilio = async (req, res) => {
    const { Domicilio, Colonia, Municipio, Estado, Tipo_Direccion, Cliente_ID } = req.body;
    const query = 'INSERT INTO Domicilios (Domicilio, Colonia, Municipio, Estado, Tipo_Direccion, Cliente_ID) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        const [results] = await db.query(query, [Domicilio, Colonia, Municipio, Estado, Tipo_Direccion, Cliente_ID]);
        res.status(201).json({ mensaje: 'Domicilio creado exitosamente', id: results.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear domicilio' });
    }
};

// Obtener todos los domicilios
exports.obtenerDomicilios = async (req, res) => {
    const query = 'SELECT * FROM Domicilios';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener domicilios' });
    }
};

// Obtener domicilio por ID
exports.obtenerDomicilio = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Domicilios WHERE ID = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Domicilio no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener domicilio' });
    }
};

// Actualizar domicilio
exports.actualizarDomicilio = async (req, res) => {
    const { id } = req.params;
    const { Domicilio, Colonia, Municipio, Estado, Tipo_Direccion, Cliente_ID } = req.body;
    const query = 'UPDATE Domicilios SET Domicilio = ?, Colonia = ?, Municipio = ?, Estado = ?, Tipo_Direccion = ?, Cliente_ID = ? WHERE ID = ?';
    try {
        const [results] = await db.query(query, [Domicilio, Colonia, Municipio, Estado, Tipo_Direccion, Cliente_ID, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Domicilio no encontrado' });
        }
        res.status(200).json({ mensaje: 'Domicilio actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar domicilio' });
    }
};

// Eliminar domicilio
exports.eliminarDomicilio = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Domicilios WHERE ID = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Domicilio no encontrado' });
        }
        res.status(200).json({ mensaje: 'Domicilio eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar domicilio' });
    }
};

// CRUD de Productos

// Crear producto
exports.crearProducto = async (req, res) => {
    const { Nombre, Unidad_Medida, Precio_Base } = req.body;
    const query = 'INSERT INTO Productos (Nombre, Unidad_Medida, Precio_Base) VALUES (?, ?, ?)';
    try {
        const [results] = await db.query(query, [Nombre, Unidad_Medida, Precio_Base]);
        res.status(201).json({ mensaje: 'Producto creado exitosamente', id: results.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    const query = 'SELECT * FROM Productos';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// Obtener producto por ID
exports.obtenerProducto = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Productos WHERE ID = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Unidad_Medida, Precio_Base } = req.body;
    const query = 'UPDATE Productos SET Nombre = ?, Unidad_Medida = ?, Precio_Base = ? WHERE ID = ?';
    try {
        const [results] = await db.query(query, [Nombre, Unidad_Medida, Precio_Base, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Productos WHERE ID = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};
