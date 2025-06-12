const express = require("express");
const router = express.Router();
// const router = require("express").Router();

const { celebrate, Joi } = require("celebrate");
const { validateUrl } = require("../utils/validators");

// funciones de controlador importadas desde controllers/cards.js
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().custom(validateUrl), // Validación para la URL de la tarjeta
    }),
  }),
  createCard
);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
