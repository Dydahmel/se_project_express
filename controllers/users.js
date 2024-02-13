const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  AUTH_REQ,
  CONFLICT_ERROR,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports.getUserById = (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  User.findById(userId)
    .orFail()
    .then((user) =>
      //if(!user){}
      res.send({ data: user }))
    //.then notFound
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
  const { name, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) =>
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }),
    )
    .catch((err) => {
      console.error(err);
      // thank you!
      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR)
          .send({ message: "Email already in use" });
      }
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "AuthorizationError") {
        return res
          .status(AUTH_REQ)
          .send({ message: "Wrong email or password" });
      }
      if (
        err.name === "BadRequestError" ||
        err.message === "data and hash arguments required"
      ) {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: "Wrong email or password" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error in login" });
    });
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  if (avatar && !validator.isURL(avatar)) {
    return res
      .status(BAD_REQUEST_ERROR)
      .send({ message: "Invalid avatar URL" });
  }
  return User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .send({ message: `${err.message}` });
      }
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
        .send({ message: "Error in updateUser" });
    });
};
