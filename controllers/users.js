const User = require("../models/user");
const {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name ===  "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: `${err.message}` });
      }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Error in getUsers" });

    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: `${err.message}` });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `${err.message}` });
      }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Error in getUserById" });

    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `${err.message}` });
      }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "Error in createUser" });

    });
};
