const express = require("express");

//imports
const {
  userValidator,
  Validate,
} = require("../middleware/expressValidator.js");

const upload = require("../middleware/multer.js");

const {
  signUp,
  verifyOtp,
} = require("../controller/user/signup.controller.js");

const login = require("../controller/user/login.controller.js");

const logout = require("../controller/user/logout.controller.js");

const checkLogin = require("../middleware/checkLogin.js");
const getUsers = require("../controller/user/getUsers.controller.js");

//router setup
const router = express.Router();

//routes
router.post(
  "/signup",
  upload.single("avatar"),
  userValidator,
  Validate,
  signUp
);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-users", checkLogin, getUsers);

module.exports = router;
