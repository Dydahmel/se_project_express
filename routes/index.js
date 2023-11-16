const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const clothingItems = require("./clothingItems");
const users = require("./users");
const { getUsers, getUserById, createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");





router.post("/signup", createUser);
router.post("/signin", login);
router.use("/items", clothingItems);
router.use(auth);
router.get("/users/me", auth, getUserById);
router.patch("/users/me", auth,)


module.exports = router;

router.use((req, res) =>
  res.status(NOT_FOUND_ERROR).send({ message: "Router not found" }),
);
