const express = require('express');
const mongoose = require('mongoose');
const httpConstants = require('./constants/errors');

const { PORT = 3000 } = process.env;

const app = express();

const router = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => { /* временная авторизация */
  req.user = {
    _id: '64d4be17de9a259e33775bf6',
  };

  next();
});

app.use(router);

app.use('*', (req, res) => {
  res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

// Запуск сервера
app.listen(PORT);
