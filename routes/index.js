const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');
const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const auth = require('../middlewares/auth');

const router = express.Router();
router.use('/signup', signUpRouter);
router.use('/signin', signInRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = { router };
