const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../utils/notfounderror');

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Такого адреса не существует.'));
});

module.exports = router;
