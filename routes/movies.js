const router = require('express').Router();
const moviesController = require('../controllers/movies');

router.get('/', moviesController.getMovies);

router.post('/', moviesController.createMovie);

module.exports = router;
