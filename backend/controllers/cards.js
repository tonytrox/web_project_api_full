const Card = require("../models/card");
const { NotFoundError, InvalidDataError } = require("../utils/errorHandler");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
    // res.status(500).send({ message: "Error al obtener tarjetas" });
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id; // accedemos al ID del usuario

  try {
    const card = await Card.create({ name, link, owner });
    if (!name || !link) {
      throw new InvalidDataError();
    }
    res.status(201).send(card);
  } catch (err) {
    // res.status(err.statusCode).send({ message: err.message });
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const cardId = req.params.cardId;

  try {
    // primero buscamos la tarjeta por ID
    const card = await Card.findById(cardId).orFail(
      new NotFoundError("tarjeta no encontrada")
    );

    // luego verficamos si el usuario que hace la petición es el propietario de la tarjeta
    if (!card.owner.equals(req.user._id)) {
      return res
        .status(403)
        .send({ message: "No tienes permiso para eliminar esta tarjeta" });
    }

    // si todo está bien, eliminamos la tarjeta por ID
    await Card.findByIdAndDelete(cardId);

    res.send({ message: "Tarjeta eliminada correctamente" });
  } catch (err) {
    // res.status(err.statusCode || 500).send({ message: err.message });
    next(err);
  }
};

const likeCard = async (req, res, next) => {
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
    // res.status(err.statusCode || 500).send({ message: err.message });
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
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
    // res.status(err.statusCode || 500).send({ message: err.message });
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
