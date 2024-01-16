const { Router } = require('express');
const {
  getUser,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

const userRouter = Router();
userRouter.get('/', getUser);
userRouter.get('/:idUser', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', editUserInfo);
userRouter.patch('/me/avatar', editUserAvatar);

module.exports = { userRouter };
