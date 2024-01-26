const Card = require('../models/card');
const { CREATED, OK } = require('../utils/constants');
const NotFoundError = require('../utils/notfounderror');
const BadRequestError = require('../utils/badrequesterror');
const ForbiddenError = require('../utils/forbiddenerror');

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Публикации не найдены!');
      }
      return res.status(OK).send(cards);
    })
    .catch(next);
};
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED).send({ card }))
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
    .orFail(new Error('Ошибка при выполнении операции'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Публикацию удалить невозможно!');
      } else {
        Card.deleteOne(card)
          .then(() => res.status(OK).send('Публикация удалена!'))
          .catch(next);
      }
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
    .orFail(new Error('Ошибка при выполнении операции'))
    .then((card) => res.status(OK).send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Ошибка! Идентификатор недопустим!'));
      } else if (error.message === 'NotFound') {
        next(new NotFoundError('Публикации не найдены!'));
      } else {
        next(error);
      }
    });
};
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('Ошибка при выполнении операции'))
    .then((card) => res.status(OK).send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Ошибка! Идентификатор недопустим!'));
      } else if (error.message === 'NotFound') {
        next(new NotFoundError('Публикации не найдены!'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
