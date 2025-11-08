const mongoose = require('mongoose');

// Schema for tracking monthly request counts by IP
const monthlyLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  month: { type: Date, required: true }
});

const MonthlyLimit = mongoose.model('MonthlyLimit', monthlyLimitSchema);

// Middleware function
async function monthlyLimit(req, res, next) {
  try {
    const ip = req.ip;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Find or create IP record
    let record = await MonthlyLimit.findOne({ ip });

    if (!record) {
      record = new MonthlyLimit({ ip, count: 1, month: startOfMonth });
      await record.save();
      return next();
    }

    // If record is from a previous month → reset counter
    if (record.month < startOfMonth) {
      record.month = startOfMonth;
      record.count = 1;
      await record.save();
      return next();
    }

    // Check monthly limit
    if (record.count >= 500) {
      return res.status(429).json({
        error: "Monthly limit exceeded",
        message: "You have exceeded your monthly limit of 500 requests"
      });
    }

    // Otherwise, increment count
    record.count += 1;
    await record.save();
    next();
  } catch (error) {
    console.error("Error in monthlyLimit middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = monthlyLimit;
