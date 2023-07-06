const router = require('express').Router();
const usersController = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const {
  validateCreateUser,
  validateLoginUser,
} = require('../middlewares/validate');

router.post('/signup', validateCreateUser, usersController.createUser);
router.post('/signin', validateLoginUser, usersController.loginUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
