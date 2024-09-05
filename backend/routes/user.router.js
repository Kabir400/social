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

const login = require("../controller/user/login.controller.js");

const router = express.Router();

router.post(
  "/signup",
  upload.single("avatar"),
  userValidator,
  userValidate,
  signUp
);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

module.exports = router;
