const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const allowedCors = ['http://localhost:3000', 'https://localhost:3000'];

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const { PORT = 5000 } = process.env;

module.exports = {
  allowedCors,
  corsOptions,
  limiter,
  PORT,
};
