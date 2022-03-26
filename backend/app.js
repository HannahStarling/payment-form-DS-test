const express = require('express');
const { connect } = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { validatePayment } = require('./validation/validation');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const { errorHandler } = require('./middlewars/errorHandler');
const { handleNotFound } = require('./routes/notFound');
const { createPayment } = require('./controllers/payment');
const { PORT, corsOptions, limiter } = require('./utils/constants');

const app = express();

app.use(cors(corsOptions));
app.options('*', cors());
app.use(helmet()); // Content-Security-Policy
app.use(limiter); // rate limiting middleware to all requests
app.use(express.json());
app.use(requestLogger);
app.use('/payment-info', validatePayment, createPayment);
app.use(handleNotFound);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const start = async () => {
  await connect('mongodb://localhost:27017/datasubDB');
  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
