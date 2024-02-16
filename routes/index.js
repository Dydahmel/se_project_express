const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const clothingItems = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const users = require("./users");
const { validateNewUser, validateLogIn } = require("../middlewares/validation");

router.post("/signup", validateNewUser ,createUser);
router.post("/signin", validateLogIn, login);
router.use("/items", clothingItems);
router.use("/users", users);

module.exports = router;

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found" }),
);
