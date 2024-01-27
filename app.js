const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const { router } = require('./routes');
const NotFoundError = require('./utils/notfounderror');
const InternalServerError = require('./utils/internalservererror');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(MONGO_URL)
  .then(() => console.log('Подключено'))
  .catch(() => console.log('Не подключено'));
app.use('/', require('./routes/index'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Не найдено!'));
});

app.use(errors());

app.use(InternalServerError);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '65a192765a12eaec167fecaf',
//   };
//   next();
// });

// app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
