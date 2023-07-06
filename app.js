const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
// const { checkToken } = require('./utils/jwtAuth');

mongoose.connect('mongodb://127.0.0.1:27017/filmsdb');

const app = express();

app.use(express.json());

// app.use();

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
