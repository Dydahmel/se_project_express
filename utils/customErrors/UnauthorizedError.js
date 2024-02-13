
const { AUTH_REQ } = require("../errors");



class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = AUTH_REQ;
  }
};

// BadRequestError — status code 400
// UnauthorizedError — status code 401
// ForbiddenError — status code 403
// NotFoundError — status code 404
// ConflictError — status code 409





module.exports = {UnauthorizedError}