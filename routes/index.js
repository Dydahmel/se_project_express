const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const clothingItems = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const users = require("./users");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", clothingItems);
router.use("/users", users);

module.exports = router;

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found" }),
);
