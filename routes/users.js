const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);

router.get('/:user_id', usersController.getCurrentUser);

router.post('/', usersController.createUser);

module.exports = router;
