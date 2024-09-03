const TryCatch = require("./utils/TryCatch.js");
const ApiError = require("./utils/ApiError.js");
const ApiResponse = require("./utils/ApiResponse.js");
const cloudinaryUpload = require("./utils/cloudinary.js");
const { generateOtp, sendOtp } = require("./utils/sendMail.js");

const fs = require("fs");

const userModel = require("./models/user.model.js");

//...........................................................
//singup controller
const singUp = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next(new ApiError(400, "Please fill all the fields", null, false));
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
      avater: req.file ? req.file.path : null,
    };

    res.json(new ApiResponse(200, null, "OTP sent to your email"));
  }
});

//...............................................................

const verifyOtp = TryCatch(async (req, res, next) => {
  const { otp } = req.body;
  const tempUser = req.session.tempUser;

  if (!tempUser) {
    next(new ApiError(400, "Session expired or Invalid Otp", null, false));
  }

  if (tempUser.otp !== otp) {
    next(new ApiError(400, "Invalid OTP", null, false));
  }

  const user = new userModel({
    name: tempUser.name,
    email: tempUser.email,
    password: tempUser.password,
    avater: tempUser.avater,
  });

  if (tempUser.avatar) {
    try {
      const cloudinaryResult = await cloudinaryUpload(tempUser.avatar, next);
      user.avatar = cloudinaryResult.secure_url;
      fs.unlinkSync(tempUser.avatar);
    } catch (uploadError) {
      return next(
        new ApiError(500, "Error uploading file", uploadError, false)
      );
    }
  }

  await user.save();

  res.json(new ApiResponse(200, null, "User registered successfully"));
});

module.exports = singUp;
