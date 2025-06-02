const bcrypt = require("bcryptjs"); // se importa bcrypt para encriptar contraseñas
const User = require("../models/user"); // se declara el modelo User
const { NotFoundError, InvalidDataError } = require("../utils/errorHandler"); // se importa el manejador de errores
// const user = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener usuarios" });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { userId } = req.params; // Extrae 'userId' de req.params

  try {
    const users = await User.findById(userId).orFail(new NotFoundError()); // Busca un usuario por ID
    res.send(users);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    // Extrae los campos necesarios del cuerpo de la solicitud
    const { name, about, avatar, email, password } = req.body; // Desestructuración de req.body

    const hash = await bcrypt.hash(password, 10); // Encripta la contraseña
    // Crea un nuevo usuario con los datos proporcionados
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // Guarda la contraseña encriptada
    });

    if (!user) {
      throw new InvalidDataError();
    }
    res.status(201).send(user);
  } catch (err) {
    res.status(err.statusCode).send({ message: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(new NotFoundError());
    res.send(user);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(new NotFoundError());
    res.send(user);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
