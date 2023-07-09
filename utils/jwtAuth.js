const jwt = require('jsonwebtoken');

const checkToken = (token, SECRET_KEY) => jwt.verify(token, SECRET_KEY);

const signToken = (payload, SECRET_KEY) => jwt.sign(payload, SECRET_KEY);

module.exports = {
  checkToken,
  signToken,
};
