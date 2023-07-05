const Movie = require('../models/movie');

const getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const createMovie = (req, res) => {
  Movie.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Internal server error',
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getMovies,
  createMovie,
};
