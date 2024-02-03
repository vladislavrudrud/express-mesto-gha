require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Ошибка!'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (error) {
    return next(new UnauthorizedError('Ошибка!'));
  }
  req.user = payload;
  return next();
};

module.exports = authMiddleware;
