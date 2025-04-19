// services/clienteService.js
const ClienteModel = require("../models/clienteModel");

const ClienteService = {
  addCliente: (data) => ClienteModel.createCliente(data.cliente, data.productos),
  getClientes: () => ClienteModel.getAllClientesConProductos(),
  getClienteByDni: (dni) => ClienteModel.getClienteByDni(dni),
  updateCliente: (dni, data) => ClienteModel.updateClientePorDni(dni, data.cliente, data.productos),
  deleteCliente: (dni) => ClienteModel.deleteClienteByDni(dni),
};
module.exports =ClienteService;

