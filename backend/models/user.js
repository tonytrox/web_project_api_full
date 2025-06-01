const mongoose = require("mongoose");
const validator = require("validator");

// Validacion de URL
const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "URL no válida",
    },
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
  },
});

// crecion de modelo
module.exports = mongoose.model("User", userSchema);
