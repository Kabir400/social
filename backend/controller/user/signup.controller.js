const TryCatch = require("../../utils/TryCatch.js");
const ApiError = require("../../utils/ApiError.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const uploadCloudinary = require("../../utils/cloudinary.js");
const { generateOtp, sendOtp } = require("../../utils/sendMail.js");
const sendCookies = require("../../utils/sendCookies.js");

const fs = require("fs");

const userModel = require("../../model/user.model.js");

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

  if (response) {
    req.session.tempUser = {
      name,
      email,
      password,
      otp,
      avatar: req.file ? req.file.path : null,
    };

    res.json(new ApiResponse(200, null, "OTP sent to your email"));
  }
});

//...............................................................

const verifyOtp = TryCatch(async (req, res, next) => {
  const { otp } = req.body;
  const tempUser = req.session.tempUser;

  console.log(req.session);

  if (!tempUser) {
    throw new ApiError(400, "Session expired or Invalid Otp", null, false);
  }

  if (tempUser.otp !== otp) {
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

  req.session.tempUser = null;

  sendCookies(res, "accessToken", accessToken, 5);
  sendCookies(res, "refreshToken", refreshToken, 15);

  res.json(new ApiResponse(200, null, "User registered successfully", true));
});

module.exports = { signUp, verifyOtp };
