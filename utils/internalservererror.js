const InternalServerError = ((error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка cервера'
      : message,
  });
  next();
});

module.exports = InternalServerError;
// const InternalServerError = (error, req, res, next) => {
//   const errorCode = error.statusCode || 500;
//   const errorMsg = error.message || 'Internal Server Error';
//   res.status(errorCode).send({ message: errorMsg });
//   next();
// };

// module.exports = InternalServerError;
