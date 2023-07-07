const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { signToken } = require('../utils/jwtAuth');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

// const { NODE_ENV, SECRET_KEY } = process.env;

// const UnauthorizedError = require('../errors/UnauthorizedError');

const MONGO_DUPLICATE_KEY_ERROR = 11000;

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash, name })
      .then((user) => {
        res.status(201).send({
          email: user.email,
          name: user.name,
          _id: user._id,
        });
      })
      .catch((err) => {
        if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
          next(
            new ConflictError('Пользователь с таким email уже зарегистрирован'),
          );
        } else if (err.name === 'ValidationError') {
          next(
            new BadRequestError(
              'Некорректные данные при регистрации пользователя',
            ),
          );
        } else {
          next(err);
        }
      });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new Error('UnauthorizedError');
    })
    .then((user) =>
      Promise.all([user, bcrypt.compare(password, user.password)]),
    )
    .then(([user, isEqual]) => {
      if (!isEqual) {
        res.status(401).send({ message: 'Email или пароль неверный' });
        return;
      }
      const token = signToken({ _id: user._id }, { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === 'UnauthorizedError') {
        res.status(401).send({ message: 'Email или пароль неверный' });
      } else {
        res.status(500).send({
          message: 'Internal server error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  loginUser,
  // getUsers,
};
