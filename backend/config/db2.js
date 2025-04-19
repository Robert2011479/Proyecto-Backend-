const mysql = require('mysql2/promise'); // Importamos la versión con Promesas

class Database {
    constructor() {
        this.pool = mysql.createPool({
            user: 'root',          
            host: 'localhost',      
            database: 'inventario',    
            password: 'admin',      
            port: 3306,             
        });
    }

    query(text, params) {
        return this.pool.query(text, params);
    }
}
module.exports = new Database();