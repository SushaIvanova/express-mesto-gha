const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => { /* временная авторизация */
  req.user = {
    _id: '64d4be17de9a259e33775bf6',
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

// Запуск сервера
app.listen(PORT);
