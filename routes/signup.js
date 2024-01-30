const signUpRouter = require('express').Router();
const { Joi } = require('celebrate');
const { celebrate } = require('celebrate');
const { createUser } = require('../controllers/users');
const { REGEX } = require('../utils/constants');

signUpRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

module.exports = signUpRouter;
