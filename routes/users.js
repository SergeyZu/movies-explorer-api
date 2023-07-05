const router = require('express').Router();
const usersController = require('../controllers/users');

// router.get('/', usersController.getUsers);

router.get('/me', usersController.getCurrentUser);

router.patch('/me', usersController.updateUser);

router.post('/', usersController.createUser);

module.exports = router;
