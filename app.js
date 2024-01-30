const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const InternalServerError = require('./utils/internalservererror');
const NotFoundError = require('./utils/notfounderror');

const app = express();

app.use(express.json());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Такого адреса не существует.'));
});

app.use(InternalServerError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000, () => {
  console.log('This server is start on 3000');
});
