const express = require("express"); // Importamos express
const router = express.Router(); // Creamos una instancia de Router
// const router = require("express").Router();

const { celebrate, Joi } = require("celebrate");
const { validateUrl } = require("../utils/validators"); // Importamos la función de validación de URL

// funciones de controlador importadas desde controllers/users.js
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");

// Cada ruta específica invocara al controlador correspondiente
router.get("/", getUsers);
router.get("/me", getUserById);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      // body: indica específicamente que quieres validar los datos que llegan
      // en el cuerpo de la solicitud (req.body).
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateUrl), // Validación para la URL del avatar
    }),
  }),
  updateUserAvatar
);

module.exports = router;
