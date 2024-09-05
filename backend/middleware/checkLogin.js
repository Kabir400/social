const ApiError = require("../utils/ApiError.js");
const sendCookies = require("../utils/sendCookies.js");

const jwt = require("jsonwebtoken");

const User = require("../model/user.model.js");

const checkLogin = async (req, res, next) => {
  try {
    const { accesstoken, refreshtoken } = req.cookies;
    if (!accesstoken && !refreshtoken) {
      throw new ApiError(400, "Please login first", null, false);
    }

    let token, secret, expiry;

    if (accesstoken) {
      token = accesstoken;
      secret = process.env.ACCESS_TOKEN_SECRET;
      expiry = process.env.ACCESS_TOKEN_EXPIRY;
    } else if (refreshtoken) {
      token = refreshtoken;
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
    if (!accesstoken && refreshtoken) {
      const newAccessToken = user.generateToken(
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRY
      );
      const newRefreshToken = user.generateToken(
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRY
      );

      sendCookies(res, "accessToken", newAccessToken, 5);
      sendCookies(res, "refreshToken", newRefreshToken, 15);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkLogin;
