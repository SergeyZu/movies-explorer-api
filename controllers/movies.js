const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteMovieCard = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }
      return movie
        .deleteOne()
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieCard,
};
