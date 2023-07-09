const router = require('express').Router();
const usersController = require('../controllers/users');
const {
  validateUpdateUser,
  validateUserId,
} = require('../middlewares/validate');

router.get('/me', validateUserId, usersController.getCurrentUser);

router.patch('/me', validateUpdateUser, usersController.updateUser);

module.exports = router;
