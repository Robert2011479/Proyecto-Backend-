const ClienteService = require("../services/clienteService");
const { AppError } = require("../errors");

const ClienteController = {
  async createCliente(req, res, next) {
    try {
      const { cliente, productos } = req.body;
      if (!cliente || !productos) {
        throw new AppError('Validation', { 
          fields: {
            cliente: !cliente ? 'Datos del cliente requeridos' : null,
            productos: !productos ? 'Lista de productos requerida' : null
          }
        });
      }
      
      const nuevoCliente = await ClienteService.addCliente({ cliente, productos });
      res.status(201).json(nuevoCliente);
    } catch (err) {
      if (err.name.includes('Sequelize')) {
        next(new AppError('DatabaseError', { sqlMessage: err.message }));
      } else {
        next(err);
      }
    }
  },

  async obtenerClientes(req, res, next) {
    try {
      const data = await ClienteService.getClientes();
      res.json(data);
    } catch (err) {
      next(new AppError('DatabaseError'));
    }
  },

  async obtenerClientePorDni(req, res, next) {
    try {
      const { dni } = req.params;
      if (!dni) throw new AppError('Validation', { dni: 'DNI requerido' });
      
      const data = await ClienteService.getClienteByDni(dni);
      if (data.length === 0) {
        throw new AppError('NotFound', { dni });
      }
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async actualizarCliente(req, res, next) {
    try {
      const { dni } = req.params;
      const { cliente, productos } = req.body;
      
      if (!dni) throw new AppError('Validation', { dni: 'DNI requerido' });
      if (!cliente && !productos) {
        throw new AppError('Validation', { 
          message: 'Se requiere al menos cliente o productos para actualizar'
        });
      }
      
      await ClienteService.updateCliente(dni, { cliente, productos });
      res.json({ message: "Cliente actualizado" });
    } catch (err) {
      if (err.name.includes('Sequelize')) {
        next(new AppError('DatabaseError', { sqlMessage: err.message }));
      } else {
        next(err);
      }
    }
  },

  async eliminarCliente(req, res, next) {
    try {
      const { dni } = req.params;
      if (!dni) throw new AppError('Validation', { dni: 'DNI requerido' });
      
      const result = await ClienteService.deleteCliente(dni);
      
      if (!result || result === 0) {
        throw new AppError('NotFound', { dni:`No se encontró el cliente con DNI ${dni}`});
      }
      res.json({ message: "Cliente eliminado" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ClienteController;