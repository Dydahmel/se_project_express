const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const clothingItems = require("./clothingItems");
const {
  getUserById,
  createUser,
  login,
  updateUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", clothingItems);
router.use(auth);
router.get("/users/me", auth, getUserById);
router.patch("/users/me", auth, updateUser);

module.exports = router;

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found" }),
);
