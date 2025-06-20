const winston = require("winston");
const expressWinston = require("express-winston");

// crear logger de solicitudes
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "../log/request.log" })],
  format: winston.format.json(),
});

// crear logger de errores
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "../log/error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
