const { NOT_FOUND_ERROR } = require("../errors");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
