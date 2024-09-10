const ApiError = require("../utils/ApiError.js");
const sendCookies = require("../utils/sendCookies.js");

const jwt = require("jsonwebtoken");

const User = require("../model/user.model.js");

const checkLogin = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
      throw new ApiError(400, "Please login first", null, false);
    }

    let token, secret, expiry;

    if (accessToken) {
      token = accessToken;
      secret = process.env.ACCESS_TOKEN_SECRET;
      expiry = process.env.ACCESS_TOKEN_EXPIRY;
    } else if (refreshToken) {
      token = refreshToken;
      secret = process.env.REFRESH_TOKEN_SECRET;
      expiry = process.env.REFRESH_TOKEN_EXPIRY;
    }

    // Decode and verify token
    const decoded = await jwt.verify(token, secret);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(400, "Invalid Token", null, false);
    }

    // If refreshToken is used, generate new tokens
    if (!accessToken && refreshToken) {
      const newaccessToken = user.generateToken(
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRY
      );
      const newrefreshToken = user.generateToken(
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRY
      );

      sendCookies(res, "accessToken", newaccessToken, 5);
      sendCookies(res, "refreshToken", newrefreshToken, 15);
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkLogin;
