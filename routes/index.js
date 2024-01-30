const express = require('express');
const { errors } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../utils/notfounderror');

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.all((req, res, next) => {
  next(new NotFoundError('Такого адреса не существует.'));
});
router.use(errors());

module.exports = router;
