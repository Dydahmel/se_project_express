/* eslint max-classes-per-file: ["error", 2] */
const { AUTH_REQ, BAD_REQUEST_ERROR } = require("../utils/errors");



class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = AUTH_REQ;
  }
};

class BadRequestError extends Error{
  constructor(message){
    super(message);
    this.name = "BadRequestError";
    this.statusCode = BAD_REQUEST_ERROR
  }
}



module.exports = {AuthorizationError, BadRequestError}