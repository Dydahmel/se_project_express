const { AUTH_REQ } = require("../utils/errors");



class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = AUTH_REQ;
  }
}

module.exports = {AuthorizationError}