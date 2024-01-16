const { Router } = require('express');
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const { NotFound } = require('../utils/errors');

const router = Router();
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.all('/*', (req, res) => {
  res
    .status(NotFound.status)
    .send({ message: NotFound.message });
});

module.exports = { router };
