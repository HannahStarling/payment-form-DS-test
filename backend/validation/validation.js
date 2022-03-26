const { celebrate, Joi } = require('celebrate');

const validatePayment = celebrate({
  body: Joi.object().keys({
    CardNumber: Joi.string().length(16).required(),
    ExpDate: Joi.string().required(),
    Cvv: Joi.string().length(3).required(),
    Amount: Joi.string().required(),
  }),
});

module.exports = { validatePayment };
