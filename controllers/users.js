const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const MONGO_DUPLICATE_KEY_ERROR = 11000;

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
  res.send({ message: 'OK' });
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  loginUser,
  // getUsers,
};

// const User = require('../models/user');

// const getCurrentUser = (req, res, next) => {
//   User.findById(req.params.user_id).then((user) => {
//     res.send(user);
//   })
//   .catch(next)
// }
