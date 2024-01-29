const {BAD_REQUEST_ERROR} = require("../errors");


class BadRequestError extends Error{
  constructor(message){
    super(message);
    this.name = "BadRequestError";
    this.statusCode = BAD_REQUEST_ERROR
  }
}

module.exports = {BadRequestError}