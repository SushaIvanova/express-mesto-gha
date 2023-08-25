const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const httpConstants = require('./constants/errors');

const { PORT = 3000 } = process.env;

const app = express();

const router = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(router);

app.use('*', (req, res) => {
  res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

// Запуск сервера
app.listen(PORT);
