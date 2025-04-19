const AppError = require('./AppError');
const errorList = require('./errorList');
function errorHandler(err, req, res, next) {
  // Log del error para desarrollo
  console.error(err.stack);

  // Si el error es uno de nuestros AppError
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      }
    });
  }

  // Para otros tipos de errores no controlados
  const unknownError = errorList.Unknown;
  res.status(unknownError.status).json({
    error: {
      code: unknownError.code,
      message: unknownError.message,
      details: process.env.NODE_ENV === 'development' ? err.message : null
    }
  });
}

module.exports = errorHandler;