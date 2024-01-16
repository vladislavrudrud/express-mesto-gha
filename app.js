const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./routes');

const app = express();

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(`${MONGO_URL}`)
  .then(() => console.log('Подключено'))
  .catch(() => console.log('Не подключено'));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '65a192765a12eaec167fecaf',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
