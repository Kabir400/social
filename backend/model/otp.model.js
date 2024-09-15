const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    expires: "5m", // Expires after 5 minutes
    default: Date.now,
  },
});

const otpModel = mongoose.model("otp", otpSchema);

module.exports = otpModel;
