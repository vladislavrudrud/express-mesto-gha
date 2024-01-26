const mongoose = require('mongoose');
const { REGEX } = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля 2 символа'],
      maxlength: [30, 'Максимальная длина поля 30 символов'],
      required: [true, 'Поле должно быть заполнено'],
    },
    link: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator(url) {
          return REGEX.test(url);
        },
        message: 'Неверные данные!',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
