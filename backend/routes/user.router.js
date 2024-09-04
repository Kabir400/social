const express = require("express");

const {
  userValidator,
  userValidate,
} = require("../middleware/expressValidator.js");

const upload = require("../middleware/multer.js");

const {
  signUp,
  verifyOtp,
} = require("../controller/user/signup.controller.js");

const router = express.Router();

router.post(
  "/signup",
  upload.single("avater"),
  userValidator,
  userValidate,
  signUp
);
router.post("/verify-otp", verifyOtp);

module.exports = router;
