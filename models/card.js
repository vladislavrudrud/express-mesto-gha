const mongoose = require('mongoose');
const validator = require('validator');

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
        validator: (url) => validator.isURL(url),
        message: 'Некорректный URL-адрес.',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
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
);

module.exports = mongoose.model('card', cardSchema);
