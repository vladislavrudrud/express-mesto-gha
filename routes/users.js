const { Router } = require('express');
const { Joi } = require('celebrate');
const { celebrate } = require('celebrate');
const {
  getUser,
  getUserById,
  // createUser,
  editUserInfo,
  editUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const { REGEX } = require('../utils/constants');

const userRouter = Router();
userRouter.get('/me', getUserInfo);
userRouter.get('/', getUser);
userRouter.get('/:idUser', celebrate({
  params: Joi.object().keys({
    idUser: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserInfo);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(REGEX),
  }),
}), editUserAvatar);

module.exports = { userRouter };
