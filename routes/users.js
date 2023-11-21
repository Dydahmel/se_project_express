const router = require("express").Router();
const { getUserById, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// router.get("/", getUsers);
// router.get("/:userId", getUserById);
// router.post("/", createUser);
router.use(auth);
router.get("/me", auth, getUserById);
router.patch("/me", auth, updateUser);

module.exports = router;
