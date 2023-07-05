const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/filmsdb');

const app = express();

// добавляем возможность парсить содержимое body
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('64a4c6d2ab5064c26861f288'),
  };
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
