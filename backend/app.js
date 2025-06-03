const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const auth = require("./Middlewares/auth");

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "67b423a2be796c6f0c6c85cc", // _id del usuario de prueba
//   };
//   // Llama a next() para pasar el control al siguiente middleware
//   next();
// });

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth); // Middleware de autenticación

// Rutas de usuarios y tarjetas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado",
  });
});
