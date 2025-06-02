const router = require("express").Router(); // const router = express.Router();

// funciones de controlador importadas desde controllers/users.js
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");

// Cada ruta específica invocara al controlador correspondiente
router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateUserProfile);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
