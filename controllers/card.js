const Card = require('../models/card');
const { OK, CREATED } = require('../utils/constants');
const {
  ServerError,
  BadRequestError,
  NotFound,
} = require('../utils/errors');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.status(OK).send(cards))
    .catch(() => res.status(ServerError).send({ message: 'Cервер не может обработать запрос к сайту!' }));
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send({ _id: card._id }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с публикацией!' });
      }
      return res
        .status(ServerError)
        .send({ message: 'Cервер не может обработать запрос к сайту!' });
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(NotFound)
          .send({ message: 'Публикация не найдена!' });
      }
      return res.status(OK).send({ card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с публикацией!' });
      }
      return res
        .status(ServerError)
        .send({ message: 'Cервер не может обработать запрос к сайту!' });
    });
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NotFound)
          .send({ message: 'Публикация не найдена!' });
      }
      return res.status(OK).send({ card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с публикацией!' });
      } return res
        .status(ServerError)
        .send({ message: 'Cервер не может обработать запрос к сайту!' });
    });
};
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NotFound)
          .send({ message: 'Публикация не найдена!' });
      }
      return res.status(OK).send({ card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestError)
          .send({ message: 'Некорректный запрос серверу при работе с публикацией!' });
      }
      return res
        .status(ServerError)
        .send({ message: 'Не найдено!' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
