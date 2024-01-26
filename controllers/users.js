const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { CREATED, OK } = require('../utils/constants');
const ConflictError = require('../utils/conflicterror');
const BadRequestError = require('../utils/badrequesterror');
const NotFoundError = require('../utils/notfounderror');

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователи не найдены.');
      }
      return res.send(users);
    })
    .catch(next);
};
const getUserById = (req, res, next) => {
  User.findById(req.params.idUser)
    .orFail(new Error('Ошибка при выполнении операции'))
    .then((user) => res.status(OK).send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Ошибка! Идентификатор недопустим!'));
      } else if (error.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден!'));
      } else {
        next(error);
      }
    });
};
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email, _id: user._id,
    }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError('Ошибка! Данные уже используются!'));
      } else if (error.name === 'ValidationError') {
        next(new BadRequestError('Ошибка! Некорректные данные!'));
      } else {
        next(error);
      }
    });
};
const editUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail(new Error('Ошибка при выполнении операции'))
    .then((user) => res.status(OK).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Ошибка при изменении данных!'));
      } else if (error.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден!'));
      } else {
        next(error);
      }
    });
};
const editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail(new Error('Ошибка при выполнении операции'))
    .then((user) => res.status(OK).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Ошибка при изменении данных!'));
      } else if (error.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден!'));
      } else {
        next(error);
      }
    });
};
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  login,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
  getUserInfo,
};
