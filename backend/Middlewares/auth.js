const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }
  // Extrae el token del encabezado de autorización
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // Verifica el token y decodifica su contenido
    payload = jwt.verify(token, "secret-key");
  } catch (err) {
    return res.status(401).send({ message: "Token inválido" });
  }

  req.user = payload; // Asigna el payload decodificado al objeto de solicitud

  next();
};

module.exports = auth;
