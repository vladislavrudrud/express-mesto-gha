const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../utils/notfounderror');

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.all('/*', (req, res) => {
  res
    .status(NotFoundError)
    .send({ message: 'Не найдено!' });
});

module.exports = router;
