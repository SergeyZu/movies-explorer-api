const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes');
// const { checkToken } = require('./utils/jwtAuth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/filmsdb');

const app = express();

app.use(express.json());

app.use(requestLogger);

// app.use();

app.use(router);

app.use(errorLogger);

app.use(errors());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
