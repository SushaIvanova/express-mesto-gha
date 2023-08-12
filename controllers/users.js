const UserModel = require('../models/user');
const httpConstants = require('../constants/errors');

// работает
module.exports.getAllUsers = (req, res) => {
  UserModel.find()
    .then((users) => res.status(httpConstants.HTTP_STATUS_OK).send(users))
    .catch(() => res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

// работает
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(httpConstants.HTTP_STATUS_OK).send(user);
    })
    .catch(() => res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

// работает
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // console.log(req.user._id);
  return UserModel.create({ name, about, avatar })
    .then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: 'Некорректный формат данных',
        });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ massage: 'Внутренняя ошибка сервера' });
    });
};

// работает
module.exports.editProfile = (req, res) => {
  const { name, about } = req.body;
  return UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      res.status(httpConstants.HTTP_STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: 'Некорректный формат данных',
        });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ massage: 'Внутренняя ошибка сервера' });
    });
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;
  return UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      res.status(httpConstants.HTTP_STATUS_OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({
          message: 'Некорректный формат данных',
        });
        return;
      }
      res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ massage: 'Внутренняя ошибка сервера' });
    });
};
