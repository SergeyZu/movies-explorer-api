const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes');
// const { checkToken } = require('./utils/jwtAuth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('Успешное подключение к базе данных');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Ошибка подключения к базе данных ${err.name}`);
  });

app.use(express.json());

app.use(requestLogger);

// app.use();

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
