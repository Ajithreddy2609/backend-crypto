// In-memory store
const monthlyStore = {};

// Middleware: 500 requests per month per IP
function monthlyLimit(req, res, next) {
  const ip = req.ip;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  if (!monthlyStore[ip]) {
    monthlyStore[ip] = {
      count: 1,
      monthStart: startOfMonth
    };
    return next();
  }

  const record = monthlyStore[ip];

  // If stored month is older → reset
  if (record.monthStart !== startOfMonth) {
    record.count = 1;
    record.monthStart = startOfMonth;
    return next();
  }

  // Check limit
  if (record.count >= 500) {
    return res.status(429).json({
      error: "Monthly limit exceeded",
      message: "You have exceeded your monthly limit of 500 requests"
    });
  }

  // Increment
  record.count += 1;
  next();
}

module.exports = monthlyLimit;
