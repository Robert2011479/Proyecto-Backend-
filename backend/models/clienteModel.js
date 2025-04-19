// models/clienteModel.js
const db = require("../config/db");

const ClienteModel = {
  // Crear cliente y sus productos asociados
  async createCliente(cliente, productos) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // Insertar cliente
      const clienteRes = await client.query(
        `INSERT INTO Clientes (dni, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          cliente.dni,
          cliente.nombre,
          cliente.apellidoPaterno,
          cliente.apellidoMaterno,
          cliente.fechaNacimiento,
        ]
      );
      const clienteId = clienteRes.rows[0].id;

      // Insertar cada producto asociado al cliente
      for (const prod of productos) {
        await client.query(
          `INSERT INTO producto (nombre, precio, descripcion, cliente_id)
           VALUES ($1, $2, $3, $4)`,
          [prod.nombre, prod.precio, prod.descripcion, clienteId]
        );
      }

      await client.query("COMMIT");
      return clienteRes.rows[0];
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  // Obtener todos los clientes junto a sus productos
  async getAllClientesConProductos() {
    //consulta JOIN para  Clientes y productos.
    // Cada fila representará un cliente y uno de sus productos (o null si no tiene productos)
    const res = await db.query(`
      SELECT c.*, 
             p.id AS producto_id, 
             p.nombre AS producto_nombre, 
             p.precio, 
             p.descripcion
      FROM Clientes c
      LEFT JOIN producto p ON c.id = p.cliente_id
      ORDER BY c.id
    `);
    return res.rows;
  },

  // Obtener un cliente (y sus productos) mediante DNI
  async getClienteByDni(dni) {
    const res = await db.query(`
      SELECT c.*, 
             p.id AS producto_id, 
             p.nombre AS producto_nombre, 
             p.precio, 
             p.descripcion
      FROM Clientes c
      LEFT JOIN producto p ON c.id = p.cliente_id
      WHERE c.dni = $1
    `, [dni]);
    return res.rows;
  },

  // Actualizar un cliente y sus productos (borrando los productos anteriores e insertando nuevos)
  async updateClientePorDni(dni, cliente, productos) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // Actualizar datos del cliente
      await client.query(
        `UPDATE Clientes 
         SET dni = $1, nombre = $2, apellidoPaterno = $3, apellidoMaterno = $4, fechaNacimiento = $5
         WHERE dni = $6`,
        [
          cliente.dni,
          cliente.nombre,
          cliente.apellidoPaterno,
          cliente.apellidoMaterno,
          cliente.fechaNacimiento,
          dni
        ]
      );

      // Primero obtener el id del cliente actualizado
      const resCliente = await client.query(`SELECT id FROM Clientes WHERE dni = $1`, [cliente.dni]);
      const clienteId = resCliente.rows[0].id;

      // Eliminar productos asociados previamente
      await client.query(`DELETE FROM producto WHERE cliente_id = $1`, [clienteId]);

      // Insertar los nuevos productos
      for (const prod of productos) {
        await client.query(
          `INSERT INTO producto (nombre, precio, descripcion, cliente_id)
           VALUES ($1, $2, $3, $4)`,
          [prod.nombre, prod.precio, prod.descripcion, clienteId]
        );
      }

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  // Eliminar un cliente y sus productos con  ON DELETE CASCADE
  async deleteClienteByDni(dni) {
    const result = await db.query(`DELETE FROM Clientes WHERE dni = $1`, [dni]);
    return result.rowCount; // esto devolverá 0 si no se eliminó nada
  }
};
module.exports =ClienteModel;
