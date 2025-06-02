const bcrypt = require("bcryptjs"); // se importa bcrypt para encriptar contraseñas
const jwt = require("jsonwebtoken"); // se importa jsonwebtoken para manejar tokens JWT
const User = require("../models/user"); // se declara el modelo User
const { NotFoundError, InvalidDataError } = require("../utils/errorHandler"); // se importa el manejador de errores

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

const login = async (req, res) => {
  const { email, password } = req.body; // Extrae 'email' y 'password' del cuerpo de la solicitud

  try {
    const user = await User.findOne({ email }); // Busca el usuario por email y selecciona la contraseña
    if (!user) {
      return res
        .status(401)
        .send({ message: "Usuario o contraseña incorrectos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compara las contraseñas
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ message: "Usuario o contraseña incorrectos" });
    }

    // Si las credenciales son válidas, crea un token JWT
    const token = jwt.sign(
      { _id: user._id }, // Crea un token JWT con el ID del usuario
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.send({ token }); // Envía el token al cliente
  } catch (err) {
    res.status(401).send({ message: "Error al iniciar sesión" });
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
