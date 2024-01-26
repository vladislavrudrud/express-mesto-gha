const { Router } = require('express');
const { Joi } = require('celebrate');
const { celebrate } = require('celebrate');
const { login } = require('../controllers/users');

const signInRouter = Router();
signInRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = { signInRouter };
