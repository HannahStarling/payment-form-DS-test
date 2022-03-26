const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  CardNumber: {
    type: String,
    minlength: 16,
    maxlength: 16,
    required: true,
  },
  ExpDate: {
    type: String,
    required: true,
  },
  Cvv: {
    type: String,
    minlength: 3,
    maxlength: 3,
    required: true,
  },
  Amount: {
    type: String,
    required: true,
  },
});

module.exports = model('payment', paymentSchema);
