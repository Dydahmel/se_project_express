const router = require("express").Router();
const clothingItems = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const users = require("./users");
const { validateNewUser, validateLogIn } = require("../middlewares/validation");
const NotFoundError = require("../utils/customErrors/NotFoundError");

router.post("/signup", validateNewUser, createUser);
router.post("/signin", validateLogIn, login);
router.use("/items", clothingItems);
router.use("/users", users);

router.use(
  (req, res, next) => {
    const error = new NotFoundError("Router not found");
    next(error);
  },
  // res.status(NOT_FOUND_ERROR).send({ message: "Router not found" }),
);

module.exports = router;
