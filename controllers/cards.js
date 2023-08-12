const Card = require('../models/card');
const httpConstants = require('../constants/errors');

// работает
module.exports.getAllCards = (req, res) => {
  Card.find()
    .then((cards) => res.status(httpConstants.HTTP_STATUS_OK).send(cards))
    .catch(() => res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

// работает
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(httpConstants.HTTP_STATUS_CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: 'Некорректный формат данных',
        });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

// работает
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_OK).send(card);
    })
    .catch((error) => {
      if (error === 'ValidationError') {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректный ID' });
      }
    });
};

// работает
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_OK).send(card);
    })
    .catch(() => res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

// работает
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_OK).send(card);
    })
    .catch(() => res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};
