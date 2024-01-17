const User = require('../models/user');
const { OK, CREATED } = require('../utils/constants');
const { ServerError, NotFound, BadRequestError } = require('../utils/errors');

const getUser = (req, res) => {
  User
    .find()
    .then((users) => res.status(OK).send(users))
    .catch(() => res.status(ServerError).send({ message: 'Cервер не может обработать запрос к сайту!' }));
};
const getUserById = (req, res) => {
  const { idUser } = req.params;
  User.findById(idUser)
    .then((user) => {
      if (!user) {
        return res.status(NotFound).send({ message: 'Пользователь не найден!' });
      }
      return res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с пользователем!' });
      } return res.status(ServerError).send({ message: 'Cервер не может обработать запрос к сайту!' });
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с пользователем!' });
      }
      return res.status(ServerError).send({ message: 'Cервер не может обработать запрос к сайту!' });
    });
};
const editUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с пользователем!' });
      } return res
        .status(ServerError)
        .send({ message: 'Cервер не может обработать запрос к сайту!' });
    });
};
const editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с пользователем!' });
      } return res
        .status(ServerError)
        .send({ message: 'Cервер не может обработать запрос к сайту!' });
    });
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
};
