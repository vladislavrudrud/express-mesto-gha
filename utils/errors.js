const ServerError = {
  status: 500,
  message: 'Cервер не может обработать запрос к сайту!',
};
const BadRequestErrorUser = {
  status: 400,
  message: 'Некорректный запрос серверу при работе с пользователем!',
};
const NotFoundUser = {
  status: 404,
  message: 'Пользователь не найден!',
};
const BadRequestErrorCard = {
  status: 400,
  message: 'Некорректный запрос серверу при работе с публикацией!',
};
const NotFoundCard = {
  status: '404',
  message: 'Публикация не найдена!',
};
const NotFound = {
  status: '404',
  message: 'Не найдено!',
};

module.exports = {
  ServerError,
  BadRequestErrorUser,
  NotFoundUser,
  NotFoundCard,
  BadRequestErrorCard,
  NotFound,
};
