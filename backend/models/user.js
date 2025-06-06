const mongoose = require("mongoose");
const validator = require("validator");

// Validacion de URL
const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },

  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "URL no válida",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (str) => validator.isEmail(str),
      message: "Email no válido",
    },
  },

  password: {
    type: String,
    required: true,
    select: false, //la contraseña no sera devuelta la respuesta
  },
});

// crecion de modelo
module.exports = mongoose.model("User", userSchema);
