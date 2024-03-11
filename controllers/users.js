const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const ConflictError = require("../utils/customErrors/ConflictError");
const { BadRequestError } = require("../utils/customErrors/BadRequestError");
const NotFoundError = require("../utils/customErrors/NotFoundError");
const {
  UnauthorizedError,
} = require("../utils/customErrors/UnauthorizedError");

module.exports.getUserById = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  User.findById(userId)
    .orFail()
    .then((user) =>
      // if(!user){}
      res.send({ data: user }),
    )
    // .then notFound
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User was not found"));
        // return res.status(NOT_FOUND_ERROR).send({ message: `${err.message}` });
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Please check your data input"));
        // return res
        //   .status(BAD_REQUEST_ERROR)
        //   .send({ message: `${err.message}` });
      } else {
        next(err);
      }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "Error in getUserById" });
    });
};

module.exports.createUser = (req, res, next) => {
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
      // thank you!
      if (err.code === 11000) {
        next(new ConflictError("Email already in use"));
        // return res
        //   .status(CONFLICT_ERROR)
        //   .send({ message: "Email already in use" });
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Please check your data input"));
        // return res
        //   .status(BAD_REQUEST_ERROR)
        //   .send({ message: `${err.message}` });
      } else {
        next(err);
      }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "Error in createUser" });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      if (err.name === "UnauthorizedError") {
        next(new UnauthorizedError("Wrong email or password"));
        // return res
        //   .status(AUTH_REQ)
        //   .send({ message: "Wrong email or password" });
      }
      if (
        err.name === "BadRequestError" ||
        err.message === "data and hash arguments required"
      ) {
        next(new BadRequestError("Please check your data input"));
        // return res
        //   .status(BAD_REQUEST_ERROR)
        //   .send({ message: "Wrong email or password" });
      } else {
        next(err);
      }

      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "Error in login" });
    });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  if (avatar && !validator.isURL(avatar)) {
    throw new BadRequestError("Invalid avatar URL");
    // return res
    //   .status(BAD_REQUEST_ERROR)
    //   .send({ message: "Invalid avatar URL" });
  }
  return User.findByIdAndUpdate(
    userId,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Please check your data input there is problem with Validation",
          ),
        );
        // return res
        //   .status(BAD_REQUEST_ERROR)
        //   .send({ message: `${err.message}` });
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User was not found"));
        // return res.status(NOT_FOUND_ERROR).send({ message: `${err.message}` });
      }
      if (err.name === "CastError") {
        next(
          new BadRequestError(
            "Please check your data input there is problem with Cast",
          ),
        );
        // return res
        //   .status(BAD_REQUEST_ERROR)
        //   .send({ message: `${err.message}` });
      } else {
        next(err);
      }
      // return res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: "Error in updateUser" });
    });
};
