const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/unauthorized');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка с авторизацией!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    throw new UnauthorizedError('Ошибка с авторизацией!');
  }
  req.user = payload;
  next();
};

module.exports = authMiddleware;
