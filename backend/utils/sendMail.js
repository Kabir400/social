const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_Id,
    pass: process.env.Email_App_Pass,
  },
});

// function for sendion otp
const sendOtp = async (email, otp, next) => {
  try {
    const mailOptions = {
      from: process.env.Email_Id,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp} , do not share it with anyone!`,
    };
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    next(err);
  }
};

//function for generate otp
const generateOtp = () => {
  return crypto.randomBytes(3).toString("hex");
};
module.exports = { sendOtp, generateOtp };
