const Card = require("../models/card");
const { NotFoundError, InvalidDataError } = require("../utils/errorHandler");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener tarjetas" });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // accedemos al ID del usuario

  try {
    const card = await Card.create({ name, link, owner });
    if (!name || !link) {
      throw new InvalidDataError();
    }
    res.status(201).send(card);
  } catch (err) {
    res.status(err.statusCode).send({ message: err.message });
  }
};

const deleteCard = async (req, res) => {
  const cardId = req.params.cardId;

  try {
    const card = await Card.findByIdAndDelete(cardId).orFail(
      new NotFoundError("tarjeta no encontrada")
    );
    res.send(card);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

const likeCard = async (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } }, // Añade el ID del usuario al array de likes
      { new: true } // Devuelve la tarjeta actualizada
    ).orFail(new NotFoundError("Tarjeta no encontrada"));
    res.send(card);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

const dislikeCard = async (req, res) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // Elimina el ID del usuario del array de likes
      { new: true } // Devuelve la tarjeta actualizada
    ).orFail(new NotFoundError("Tarjeta no encontrada"));
    res.send(card);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
