const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
  AuthorizationError,
  BadRequestError,
} = require("../utils/customErrors/AuthorizationError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    // url validator
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // e-mail walidator
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid E-mail",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function authorization(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadRequestError());
      }
      return bcrypt.compare(password, user.password).then((mached) => {
        if (!mached) {
          return Promise.reject(new AuthorizationError());
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
