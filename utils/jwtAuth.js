const jwt = require('jsonwebtoken');

const SECRET_KEY = '$ecret_key';

const checkToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
  // try {
  //   const payload = jwt.verify(token, SECRET_KEY);
  //   return payload;
  // } catch (err) {}
};

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

module.exports = {
  checkToken,
  signToken,
};
