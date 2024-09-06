const TryCatch = require("../../utils/TryCatch.js");
const ApiError = require("../../utils/ApiError.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const sendCookies = require("../../utils/sendCookies.js");
const bcrypt = require("bcryptjs");

const userModel = require("../../model/user.model.js");

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill all the fields", null, false);
  }

  //validate the user is already exist or not
  const userExist = await userModel.findOne({ email });

  if (!userExist) {
    throw new ApiError(
      400,
      "You are not registered! please signup",
      null,
      false
    );
  }

  const isValid = await bcrypt.compare(password, userExist.password);

  if (!isValid) {
    throw new ApiError(400, "Invalid credentials", null, false);
  }

  const accessToken = userExist.generateToken(
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRY
  );

  const refreshToken = userExist.generateToken(
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRY
  );

  sendCookies(res, "accessToken", accessToken, 5);
  sendCookies(res, "refreshToken", refreshToken, 15);

  res.json(new ApiResponse(200, null, "You logged in successfully!"));
});

module.exports = login;
