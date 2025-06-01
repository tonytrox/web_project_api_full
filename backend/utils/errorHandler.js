class InvalidDataError extends Error {
  constructor(message = "Datos inválidos") {
    super(message);
    this.name = "InvalidDataError";
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message = "Usuario no encontrado") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

module.exports = {
  NotFoundError,
  InvalidDataError,
};
