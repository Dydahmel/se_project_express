const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const clothingItems = require("./clothingItems");
const users = require("./users");

router.use("/users", users);
router.use("/items", clothingItems);

module.exports = router;

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found" }),
);
