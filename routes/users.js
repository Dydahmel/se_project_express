const router = require("express").Router();
const { getUserById, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
// router.post("/", createUser);
router.use(auth);
router.get("/me", auth, getUserById);
router.patch("/me", validateUserUpdate, auth, updateUser);

module.exports = router;
