const Card = require('../models/card');
const { OK, CREATED } = require('../utils/constants');
const {
  ServerError,
  BadRequestErrorCard,
  NotFoundCard,
} = require('../utils/errors');

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.status(OK).send(cards))
    .catch(() => res.status(ServerError.status).send({ message: ServerError.message }));
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send({ _id: card._id }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BadRequestErrorCard.status)
          .send({ message: BadRequestErrorCard.message });
      }
      return res
        .status(ServerError.status)
        .send({ message: ServerError.message });
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(NotFoundCard.status)
          .send({ message: NotFoundCard.message });
      }
      return res.status(OK).send({ card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestErrorCard.status)
          .send({ message: BadRequestErrorCard.message });
      }
      return res
        .status(ServerError.status)
        .send({ message: ServerError.message });
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
          .status(NotFoundCard.status)
          .send({ message: NotFoundCard.message });
      }
      return res.status(OK).send({ card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BadRequestErrorCard.status)
          .send({ message: BadRequestErrorCard.message });
      }
      if (error.message === 'notValidId') {
        res
          .status(NotFoundCard.status)
          .send({ message: NotFoundCard.message });
      }
      return res
        .status(ServerError.status)
        .send({ message: ServerError.message });
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
          .status(NotFoundCard.status)
          .send({ message: NotFoundCard.message });
      }
      return res.status(OK).send({ card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BadRequestErrorCard.status)
          .send({ message: BadRequestErrorCard.message });
      }
      return res
        .status(BadRequestErrorCard.status)
        .send({ message: BadRequestErrorCard.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
