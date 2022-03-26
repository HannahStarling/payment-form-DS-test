const Payment = require('../models/payment');
const { ApiError } = require('../errors/ApiError');

const createPayment = (req, res, next) => {
  const {
    CardNumber,
    ExpDate,
    Cvv,
    Amount,
  } = req.body;

  Payment.create({
    CardNumber,
    ExpDate,
    Cvv,
    Amount,
  })
    .then((payment) => {
      res.status(200).send({
        RequestId: payment._id,
        Amount: payment.Amount,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw ApiError.badRequest(
          'Invalid Data',
        );
      }
      throw err;
    })
    .catch(next);
};

module.exports = { createPayment };
