const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля 2 символа'],
      maxlength: [30, 'Максимальная длина поля 30 символов'],
      required: [true, 'Поле должно быть заполнено'],
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля 2 символа'],
      maxlength: [30, 'Максимальная длина поля 30 символов'],
      required: [true, 'Поле должно быть заполнено'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите адрес ссылки',
      },
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model('user', userSchema);
