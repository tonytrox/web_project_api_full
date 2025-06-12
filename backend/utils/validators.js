const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value; // Si la URL es válida, la devuelve
  }
  return helpers.error("string.uri"); // Si no es válida, devuelve un error
};

module.exports = { validateUrl };
