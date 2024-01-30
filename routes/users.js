const userRouter = require('express').Router();
const { Joi } = require('celebrate');
const { celebrate } = require('celebrate');
const {
  getUser,
  getUserById,
  editUserInfo,
  editUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const { REGEX } = require('../utils/constants');

userRouter.get('/', getUser);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
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
userRouter.get('/me', getUserInfo);

module.exports = userRouter;
