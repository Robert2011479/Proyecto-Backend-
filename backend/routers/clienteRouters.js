// routes/clienteRouters.js
const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/clienteController");

// Ruta para crear un cliente y sus productos
router.post("/clientes", ClienteController.createCliente);

// Ruta para obtener todos los clientes con productos
router.get("/clientes", ClienteController.obtenerClientes);

// Ruta para obtener un cliente por DNI
router.get("/clientes/:dni", ClienteController.obtenerClientePorDni);

// Ruta para actualizar un cliente (y sus productos) por DNI
router.put("/clientes/:dni", ClienteController.actualizarCliente);

// Ruta para eliminar un cliente (y sus productos) por DNI
router.delete("/clientes/:dni", ClienteController.eliminarCliente);

module.exports = router;

