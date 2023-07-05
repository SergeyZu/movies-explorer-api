const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

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

// const createUser = (req, res) => {
//   User.create(req.body)
//     .then((user) => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Internal server error',
//         err: err.message,
//         stack: err.stack,
//       });
//     });
// };

module.exports = {
  getCurrentUser,
  updateUser,
  // createUser,
  // getUsers,
};

// const User = require('../models/user');

// const getCurrentUser = (req, res, next) => {
//   User.findById(req.params.user_id).then((user) => {
//     res.send(user);
//   })
//   .catch(next)
// }
