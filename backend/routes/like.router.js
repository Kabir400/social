const express = require("express");

const router = express.Router();

//controller
const isLike = require("../controller/likes/isLiked.controller.js");

const toggleLike = require("../controller/likes/toggleLike.controller.js");

//middleware
const checkLogin = require("../middleware/checkLogin.js");

router.get("/islike", checkLogin, isLike);
router.post("/togglelike", checkLogin, toggleLike);

module.exports = router;
