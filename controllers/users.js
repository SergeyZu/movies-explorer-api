const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
// const UnauthorizedError = require('../errors/UnauthorizedError');

const MONGO_DUPLICATE_KEY_ERROR = 11000;
const SECRET_KEY = '$ecret_key';

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    email: req.body.email,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Internal server error',
//         err: err.message,
//         stack: err.stack,
//       });
//     });
// };

const createUser = (req, res) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    console.log('hash: ', hash);
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
          res.status(409).send({
            message: 'Пользователь с таким email уже зарегистрирован',
          });
          return;
        }
        res.status(500).send({
          message: 'Internal server error',
          err: err.message,
          stack: err.stack,
        });
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
    .then((user) => {
      return Promise.all([user, bcrypt.compare(password, user.password)]);
    })
    .then(([user, isEqual]) => {
      if (!isEqual) {
        res.status(401).send({ message: 'Email или пароль неверный' });
        return;
      }
      const token = jwt.sign({ _id: user._id }, SECRET_KEY);

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
