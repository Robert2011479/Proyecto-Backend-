
const db = require('../config/db');

class productModel {

    //funcion para obtener todos los registros de la tabla productos
    async getAllProducts(){
        const result= await db.query('Select * from producto');
        return result.rows;
    }

    //funcion para obtener un registro por su ID
    async getProductById(id) {
        const result = await db.query('SELECT * FROM producto WHERE id = $1', [id]);
        return result.rows[0];
        //retorno el primer producto a la primera fila
    }
    
    //funcion crear un nuevo registro
    async createProduct({ nombre,precio,descripcion }) {
        const result =await db.query(
            //utilizamos los placeholders valores
            'INSERT INTO producto (nombre, precio, descripcion) VALUES ($1, $2, $3) RETURNING *',
        [nombre, precio,descripcion]
        );
        return result.rows[0];
    }
    //funcion para actualizar un registro
    async updateProduct(id, { nombre, precio, descripcion }) {
    const result = await db.query(
        'UPDATE producto SET nombre = $1,precio = $2, descripcion = $3 WHERE id = $4 RETURNING *',
        [nombre, precio, descripcion, id]
    );
    return result.rows[0];
    }
    async deleteProduct(id) {
        await db.query('delete from producto WHERE id = $1',[id]);
    }
}

module.exports =new productModel();