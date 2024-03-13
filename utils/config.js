const DEFAULT_SECRET_KEY = "illGenerateNewKeyLater";

if (process.env.NODE_ENV === 'development') {
  module.exports.JWT_SECRET = DEFAULT_SECRET_KEY;
} else {
  // Load secret key from environment variable
  module.exports.JWT_SECRET = process.env.JWT_SECRET;
}

//module.exports.JWT_SECRET = "illGenerateNewKeyLater";



