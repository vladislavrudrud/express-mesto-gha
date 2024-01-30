const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../utils/conflicterror');
const BadRequestError = require('../utils/badrequesterror');
const NotFoundError = require('../utils/notfounderror');
const UnauthorizedError = require('../utils/unauthorized');
const { CREATED, OK } = require('../utils/constants');

const getUser = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(CREATED).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
      .catch((error) => {
        if (error.code === 11000) {
          next(new ConflictError('Ошибка! Данные уже используются!'));
        } else if (error.name === 'ValidationError') {
          next(new BadRequestError(error.message));
        } else {
          next(error);
        }
      });
  })
    .catch(next);
};
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден!');
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};
const editUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден!');
      }
      return res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные!'));
      } else {
        next(error);
      }
    });
};
const editUserAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден!');
      }
      return res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные!'));
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
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь не найден!');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неверные данные!'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          return res.status(OK).send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
  login,
  getUserInfo,
};
