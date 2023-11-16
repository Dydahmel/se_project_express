const { BAD_REQUEST_ERROR, AUTH_REQ } = require("../utils/errors");



class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = BAD_REQUEST_ERROR;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = AUTH_REQ;
  }
}

module.exports = {AuthorizationError}