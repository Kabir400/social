const jwt = require("jsonwebtoken");

const otpToken = (payload, key, expiry) => {
  return jwt.sign(payload, key, { expiresIn: expiry });
};

module.exports = otpToken;
