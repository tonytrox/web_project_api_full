const router = require("express").Router(); // const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/", getUsers); // Cuando se solicita /, se invoca getUsers
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/me", updateUserProfile);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
