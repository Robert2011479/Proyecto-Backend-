const express = require('express');
const cors = require('cors');

// Importamos las rutas
const productRoutes = require('./routers/productRouters');
const clienteRoutes = require('./routers/clienteRouters');

// Importamos el manejador de errores
const { errorHandler } = require('./errors');

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling(); // Añadimos el manejo de errores
  }

  config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    // Todas las rutas de productos se alojarán en /productos
    this.app.use('/productos', productRoutes);

    // Todas las rutas de clientes se alojarán en /api
    this.app.use('/api', clienteRoutes);
  }

  // Y en el método errorHandling():
    errorHandling() {
      // Middleware para 404
      this.app.use((req, res, next) => {
        res.status(404).json({
          error: {
            code: 1003, // Usando el código de NotFound de tu lista
            message: 'Ruta no encontrada'
          }
        });
      });

      // Manejador de errores
      this.app.use(errorHandler);
    }

  start() {
    const PORT = process.env.PORT || 3100;
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  }
}

const server = new Server();
server.start();