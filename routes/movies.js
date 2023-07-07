const router = require('express').Router();
const moviesController = require('../controllers/movies');
const {
  validateCreateMovie,
  validateMovieCardId,
} = require('../middlewares/validate');

router.get('/', moviesController.getMovies);

router.post('/', validateCreateMovie, moviesController.createMovie);

router.delete(
  '/:cardId',
  validateMovieCardId,
  moviesController.deleteMovieCard
);

module.exports = router;
