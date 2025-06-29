const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Se requiere autorización" });
  }
  // Extrae el token del encabezado de autorización
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    // Verifica el token y decodifica su contenido
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Token inválido" });
  }

  req.user = payload; // Asigna el payload decodificado al objeto de solicitud

  next();
};

module.exports = auth;
