const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const authMiddleware = require('../middlewares/auth');
const signInRouter = require('./signin');
const signUpRouter = require('./signup');
// const NotFoundError = require('../utils/notfounderror');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use(authMiddleware);
router.use('/signin', signInRouter);
router.use('/signup', signUpRouter);
// router.all('/*', (req, res) => {
//   res
//     .status(NotFoundError)
//     .send({ message: 'Не найдено!' });
// });

module.exports = router;
