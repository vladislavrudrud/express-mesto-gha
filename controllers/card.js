const Card = require('../models/card');
const { CREATED } = require('../utils/constants');
const NotFoundError = require('../utils/notfounderror');
const BadRequestError = require('../utils/badrequesterror');
const ForbiddenError = require('../utils/forbiddenerror');

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Публикации не найдены!');
      }
      return res.send(cards);
    })
    .catch((error) => next(error));
};
const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Ошибка при создании публикации!'));
      } else {
        next(error);
      }
    });
};
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('NotFound'))
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Публикации не найдены!');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Публикацию удалить невозможно!');
      }
      card.deleteOne()
        .then(() => res.status(200).send({ message: 'Карточка удалена.' }))
        .catch((err) => next(err));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Ошибка! Идентификатор недопустим!'));
      } else {
        next(error);
      }
    });
};
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Публикации не найдены!');
      }
      return res.send(card);
    })
    .catch(next);
};
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Публикации не найдены!');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
