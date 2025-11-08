const rateLimit = require('express-rate-limit');

// Rate limiter: 20 requests per minute
const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // Limit each IP to 20 requests per windowMs
  message: {
    error: "you can't hit more than 20 request within a minute",
    message: "you can't hit more than 20 request within a minute"
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: "you can't hit more than 20 request within a minute",
      message: "you can't hit more than 20 request within a minute"
    });
  }
});

module.exports = apiRateLimiter;

