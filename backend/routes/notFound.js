const { ApiError } = require('../errors/ApiError');

const handleNotFound = (req, res, next) => next(ApiError.notFound('Маршрут не найден'));

module.exports = { handleNotFound };
