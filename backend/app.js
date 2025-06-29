// Cargar el módulo dotenv
const dotenv = require("dotenv");
// Ejecutar la función config() para cargar las variables
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const cors = require("cors"); // CORS para permitir la comunicación entre frontend y backend
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use(cors()); // Configuración de CORS
app.options("*", cors()); // Permitir todas las opciones de CORS
app.use(express.json());

// Middleware de registro de solicitudes
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", login);
app.post("/signup", createUser);

// rutas protegidas
app.use(auth); // Middleware de autenticación
app.use("/users", usersRouter); //users
app.use("/cards", cardsRouter); //cards

// Middleware de registro de errores
app.use(errorLogger);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado",
  });
});

// Middleware de manejo centralizado de errores
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Error interno del servidor" : message,
  });
});
