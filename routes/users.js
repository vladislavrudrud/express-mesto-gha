const router = require('express').Router();
const { Joi } = require('celebrate');
const { celebrate } = require('celebrate');
const {
  getUser,
  getUserById,
  // createUser,
  editUserInfo,
  editUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const { REGEX } = require('../utils/constants');

router.get('/', getUser);
router.get('/me', getUserInfo);
router.get('/:idUser', celebrate({
  params: Joi.object().keys({
    idUser: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(REGEX),
  }),
}), editUserAvatar);

module.exports = router;
