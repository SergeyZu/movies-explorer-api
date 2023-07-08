const mongoose = require('mongoose');
const { checkToken } = require('../utils/jwtAuth');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = checkToken(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
    );
    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
    return next();
  } catch (err) {
    return next(new UnauthorizedError('Пользователь не авторизован'));
  }
};

module.exports = auth;
