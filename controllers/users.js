const User = require("../models/user");
const {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  AUTH_REQ,
} = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../utils/config")

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Error in getUsers" }),
    );
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
  const { name, avatar, email} = req.body;
  bcrypt.hash(req.body.password, 10)
  .then((hash) => User.create({
    name,
    avatar,
    email,
    password:hash }))
    .then((user) => res.send({
      _id : user._id,
      name : user.name,
      email: user.email }))
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

module.exports.login = (req, res) =>{
  const {email, password} = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) =>{
      res.send({
        token: jwt.sign({ _id: user._id}, JWT_SECRET, { expiresIn: "7d"})
      })
    })
    .catch((err) => {
      if (err.name === "Authorithation required"){
        return res.status(AUTH_REQ).send({message: "Wrong email or password"})
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error in login" });
    })
}