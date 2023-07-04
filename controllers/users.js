const users = [];
let id = 0;

const getCurrentUser = (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.user_id));
  if (!user) {
    res.status(404).send({ message: 'User not found' });
  } else {
    res.send(user);
  }
};

const getUsers = (req, res) => {
  res.send(users);
};

const createUser = (req, res) => {
  id = id + 1;

  console.log(req.body);

  const newUser = {
    ...req.body,
    id,
  };
  users.push(newUser);

  res.send(newUser);
};

module.exports = {
  getCurrentUser,
  createUser,
  getUsers,
};

// const User = require('../models/user');

// const getCurrentUser = (req, res, next) => {
//   User.findById(req.params.user_id).then((user) => {
//     res.send(user);
//   })
//   .catch(next)
// }
