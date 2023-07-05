const router = require('express').Router();
const usersController = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', usersController.createUser);
router.post('/signin', usersController.loginUser);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
