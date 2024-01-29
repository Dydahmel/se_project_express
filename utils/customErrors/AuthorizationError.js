/* eslint max-classes-per-file: ["error", 2] */
const { AUTH_REQ, BAD_REQUEST_ERROR } = require("../errors");



class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = AUTH_REQ;
  }
};





module.exports = {AuthorizationError}