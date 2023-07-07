const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка сервера' : err.message;
  const stack = err.stack;

  res.status(statusCode).send({ message, stack });
  next();
};

module.exports = { errorHandler };
