const express = require("express");

const router = express.Router();

//middlewares
const checkLogin = require("../middleware/checkLogin.js");

//controller
const followUser = require("../controller/follow/followUser.controller.js");
const getMyFollowedUsers = require("../controller/follow/getMyFollowedUsers.controller.js");

//routes
router.post("/followUser/:followedUserId", checkLogin, followUser);

router.get("/getMyFollowedUsers", checkLogin, getMyFollowedUsers);

module.exports = router;
