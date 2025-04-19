const errorList = require('./errorList');

class AppError extends Error {
  constructor(errorType, details = null) {
    const errorInfo = errorList[errorType] || errorList.Unknown;
    super(errorInfo.message);
    this.name = this.constructor.name;
    this.code = errorInfo.code;
    this.status = errorInfo.status;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;