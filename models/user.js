const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина поля 2 символа'],
      maxlength: [30, 'Максимальная длина поля 30 символов'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальная длина поля 2 символа'],
      maxlength: [30, 'Максимальная длина поля 30 символов'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => REGEX.test(url),
        message: 'Неверные данные!',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      select: false,
    },
    email: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      unique: true,
      validate: {
        validator: (url) => isEmail(url),
        message: 'Введите адрес ссылки',
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
