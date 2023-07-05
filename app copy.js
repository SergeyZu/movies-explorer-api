const express = require('express');

const app = express();

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/filmsdb')
  .then(() => {
    console.log('Успешное подключение к базе данных');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Ошибка подключения к базе данных ${err.name}`);
  });

const users = [];
let id = 0;

app.use(express.json());

//  возвращает информацию о пользователе (email и имя)
// app.get('/users/me', getCurrentUser);
app.get('/users/me', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.user_id));
  res.send(user);
});

app.post('/users', (req, res) => {
  id += 1;

  const newUser = {
    ...req.body,
    id,
  };
  users.push(newUser);
});

// обновляет информацию о пользователе (email и имя)
// app.patch('/users/me', updateUser);

// возвращает все сохранённые текущим  пользователем фильмы
// app.get('/movies', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// app.post('/movies', createMovie);

// удаляет сохранённый фильм по id
// app.delete('/movies/_id');

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
