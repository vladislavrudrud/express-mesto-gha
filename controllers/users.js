const User = require('../models/user');
const { ServerError, NotFoundUser, BadRequestErrorUser } = require('../utils/errors');

const OK = 200;
const CREATED = 201;
const getUser = (req, res) => {
  User
    .find()
    .then((users) => res.status(OK).send(users))
    .catch(() => res.status(ServerError.status).send({ message: ServerError.message }));
};
const getUserById = (req, res) => {
  const { idUser } = req.params;
  User.findById(idUser)
    .then((user) => {
      if (!user) {
        return res.status(NotFoundUser.status).send({ message: NotFoundUser.message });
      }
      return res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestErrorUser.status)
          .send({ message: BadRequestErrorUser.message });
      } if (error.message === 'notVadidId') {
        res.status(NotFoundUser.status).send({ message: NotFoundUser.message });
      } return res.status(ServerError.status).send({ message: ServerError.message });
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BadRequestErrorUser.status)
          .send({ message: BadRequestErrorUser.message });
      }
      return res.status(ServerError.status).send({ message: ServerError.message });
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
          .status(BadRequestErrorUser.status)
          .send({ message: BadRequestErrorUser.message });
      } if (error.message === 'notValidId') {
        return res
          .status(NotFoundUser.status)
          .send({ message: NotFoundUser.message });
      }
      return res
        .status(ServerError.status)
        .send({ message: ServerError.message });
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
          .status(BadRequestErrorUser.status)
          .send({ message: BadRequestErrorUser.message });
      } if (error.message === 'notValidId') {
        return res
          .status(NotFoundUser.status)
          .send({ message: NotFoundUser.message });
      }
      return res
        .status(ServerError.status)
        .send({ message: ServerError.message });
    });
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
};
