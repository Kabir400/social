const TryCatch = require("../../utils/TryCatch.js");
const ApiError = require("../../utils/ApiError.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const uploadCloudinary = require("../../utils/cloudinary.js");
const { generateOtp, sendOtp } = require("../../utils/sendMail.js");
const sendCookies = require("../../utils/sendCookies.js");
const otpToken = require("../../utils/otpToken.js");

const fs = require("fs");
const jwt = require("jsonwebtoken");

const userModel = require("../../model/user.model.js");
const otpModel = require("../../model/otp.model.js");

//...........................................................
//singup controller
const signUp = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Please fill all the fields", null, false);
  }

  //validate the user is already exist or not
  const userExist = await userModel.findOne({ email });

  if (userExist) {
    throw new ApiError(400, "User already exist", null, false);
  }

  //generate otp and send mail
  const otp = generateOtp();
  const response = await sendOtp(email, otp, next);

  const OtpToken = otpToken(
    {
      name,
      email,
      password,
      avatar: req.file ? req.file.path : null,
    },
    process.env.OTP_SECRET,
    "5m"
  );

  //insert/override otp in db
  const tempUser = await otpModel.findOneAndUpdate(
    { email },
    { email, otp },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  if (response && otpToken && tempUser) {
    sendCookies(res, "otpToken", OtpToken, "5m");
    res.json(new ApiResponse(200, null, "OTP sent to your email"));
  } else {
    throw new ApiError(500, "Something went wrong", null, false);
  }
});

//...............................................................

const verifyOtp = TryCatch(async (req, res, next) => {
  const { otp } = req.body;
  const { otpToken } = req.cookies;

  const tempUser = jwt.verify(otpToken, process.env.OTP_SECRET);
  const decoded = await otpModel.findOne({ email: tempUser.email });

  if (!tempUser) {
    throw new ApiError(400, "Session expired or Invalid Otp", null, false);
  }

  if (decoded.otp !== otp) {
    throw new ApiError(400, "Invalid OTP", null, false);
  }

  const user = new userModel({
    name: tempUser.name,
    email: tempUser.email,
    password: tempUser.password,
    avatar: null,
  });

  if (tempUser.avatar) {
    try {
      const cloudinaryResult = await uploadCloudinary(tempUser.avatar, next);
      user.avatar = cloudinaryResult.secure_url;
      fs.unlinkSync(tempUser.avatar);
    } catch (err) {
      throw new ApiError(500, "Error uploading file", null, false);
    }
  }

  const accessToken = user.generateToken(
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRY
  );

  const refreshToken = user.generateToken(
    process.env.REFRESH_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_EXPIRY
  );

  await user.save();
  await otpModel.findOneAndDelete({ email: decoded.email });

  sendCookies(res, "accessToken", accessToken, "5d");
  sendCookies(res, "refreshToken", refreshToken, "15d");

  res.json(new ApiResponse(200, null, "User registered successfully", true));
});

module.exports = { signUp, verifyOtp };
