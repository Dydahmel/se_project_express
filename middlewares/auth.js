const jwt = require("jsonwebtoken");
const { AUTH_REQ } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (res) =>{
  res.status(AUTH_REQ).send({ message: 'Authorization Error'})

}

const  extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {

    return handleAuthError(res);
  }


  const token = extractBearerToken(authorization);
  // console.log(token)
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  }
  catch (err) {
    console.log('token error, check auth in express')

    return handleAuthError(res);
  }

  req.user = payload; // adding the payload to the Request object

  next();
  return null
};


