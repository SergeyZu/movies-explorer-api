const router = require('express').Router();
const moviesController = require('../controllers/movies');
const {
  validateCreateMovie,
  validateMovieId,
} = require('../middlewares/validate');

router.get('/', moviesController.getMovies);

router.post('/', validateCreateMovie, moviesController.createMovie);

router.delete('/:movieId', validateMovieId, moviesController.deleteMovie);

module.exports = router;
